param(
  [Parameter(Mandatory=$true)][string]$Urls,
  [Parameter(Mandatory=$true)][string]$OutFile,
  [int]$DelayMs = 2500,
  [int]$StartAt = 0,
  [int]$MaxItems = 100000
)
$ErrorActionPreference = "Continue"
$list = Get-Content -Path $Urls -Encoding UTF8
$sb = New-Object System.Text.StringBuilder
if ($StartAt -eq 0) {
  [void]$sb.AppendLine("# Archived X/Twitter snapshots of @xiaolai and @xiaolai001")
  [void]$sb.AppendLine("# retrieved via web.archive.org / web/2id_/ (raw JSON) and HTML meta fallback")
  [void]$sb.AppendLine("# fetched: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss"))
  [void]$sb.AppendLine("")
}

function Clean-Text([string]$s) {
  if ($null -eq $s) { return "" }
  $x = [System.Net.WebUtility]::HtmlDecode($s)
  $x = $x -replace '<[^>]+>', ' '
  $x = $x -replace '[\u00a0\u3000]', ' '
  $x = $x -replace '\s+', ' '
  return $x.Trim()
}

$idx = -1
$ok = 0; $fail = 0
foreach ($line in $list) {
  $line = $line.Trim()
  if ($line -eq "" -or $line.StartsWith("#")) { continue }
  $idx++
  if ($idx -lt $StartAt) { continue }
  if ($ok + $fail -ge $MaxItems) { break }
  $parts = $line -split '\|'
  $orig = $parts[0].Trim()
  $ymd = ""
  if ($parts.Length -gt 1) { $ymd = $parts[1].Trim() }
  $handle = "xiaolai"
  if ($parts.Length -gt 2) { $handle = $parts[2].Trim() }

  $text = ""
  $author = ""
  $created = ""
  $method = ""
  $okFlag = $false

  foreach ($attempt in 1..3) {
    $arch = "http://web.archive.org/web/2id_/" + $orig
    try {
      $r = Invoke-WebRequest -Uri $arch -UseBasicParsing -TimeoutSec 60 -Headers @{
        "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        "Accept" = "text/html,application/json,*/*"
      }
      $bytes = $r.RawContentStream.ToArray()
      $html = [System.Text.Encoding]::UTF8.GetString($bytes)
      $t = $html.TrimStart([char]0xFEFF, [char]0x20, [char]0x0A, [char]0x0D, [char]0x09)

      # JSON form (api.twitter or syndication)
      if ($t.StartsWith("{")) {
        $jm = [regex]::Match($t, '"full_text"\s*:\s*"((?:[^"\\]|\\.)*)"')
        if ($jm.Success) {
          $raw = $jm.Groups[1].Value
          $raw = $raw -replace '\\n', ' ' -replace '\\/', '/' -replace '\\"', '"' -replace '\\\\', '\'
          $text = Clean-Text $raw
          $method = "json.full_text"
        } else {
          $jm2 = [regex]::Match($t, '"text"\s*:\s*"((?:[^"\\]|\\.)*)"')
          if ($jm2.Success) {
            $raw = $jm2.Groups[1].Value -replace '\\n', ' ' -replace '\\/', '/' -replace '\\"', '"' -replace '\\\\', '\'
            $text = Clean-Text $raw
            $method = "json.text"
          }
        }
        $cm = [regex]::Match($t, '"created_at"\s*:\s*"([^"]+)"')
        if ($cm.Success) { $created = $cm.Groups[1].Value }
        $am = [regex]::Match($t, '"screen_name"\s*:\s*"([^"]+)"')
        if ($am.Success) { $author = $am.Groups[1].Value }
        if ($text -ne "") { $okFlag = $true }
      }

      # HTML form
      if (-not $okFlag) {
        $m1 = [regex]::Match($html, 'property="og:description"\s+content="([^"]*)"')
        if (-not $m1.Success) { $m1 = [regex]::Match($html, 'content="([^"]*)"\s+property="og:description"') }
        if ($m1.Success) { $text = Clean-Text $m1.Groups[1].Value; $method = "html.og:description" }
        if ($text -eq "") {
          $m2 = [regex]::Match($html, '<p[^>]*class="[^"]*js-tweet-text[^"]*"[^>]*>(.*?)</p>')
          if ($m2.Success) { $text = Clean-Text $m2.Groups[1].Value; $method = "html.js-tweet-text" }
        }
        if ($text -eq "") {
          $m3 = [regex]::Match($html, '<meta[^>]*name="description"[^>]*content="([^"]*)"')
          if ($m3.Success) { $text = Clean-Text $m3.Groups[1].Value; $method = "html.meta-description" }
        }
        if ($text -ne "") { $okFlag = $true }
      }
      if ($okFlag) { break }
      Start-Sleep -Milliseconds ($DelayMs * $attempt)
    } catch {
      $msg = $_.Exception.Message
      if ($msg -match "429") {
        Start-Sleep -Seconds (10 * $attempt)
      } else {
        Start-Sleep -Milliseconds ($DelayMs * $attempt)
      }
    }
  }

  [void]$sb.AppendLine("### " + $orig)
  if ($created -ne "") { [void]$sb.AppendLine("- tweeted_at: " + $created) } elseif ($ymd -ne "") { [void]$sb.AppendLine("- tweeted_at(derived): " + $ymd) }
  if ($author -ne "") { [void]$sb.AppendLine("- author: @" + $author) }
  if ($okFlag) {
    [void]$sb.AppendLine("- method: " + $method)
    [void]$sb.AppendLine("- TEXT: " + $text)
    $ok++
    Write-Output ("OK   " + $idx + " [" + $ymd + "] " + $text.Substring(0, [Math]::Min(70, $text.Length)))
  } else {
    [void]$sb.AppendLine("- STATUS: extraction failed")
    $fail++
    Write-Output ("FAIL " + $idx + " " + $orig)
  }
  [void]$sb.AppendLine("")
  Start-Sleep -Milliseconds $DelayMs
}

$dir = Split-Path -Parent $OutFile
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
[System.IO.File]::WriteAllText($OutFile, $sb.ToString(), (New-Object System.Text.UTF8Encoding($false)))
Write-Output ("DONE ok=" + $ok + " fail=" + $fail + " out=" + $OutFile)
