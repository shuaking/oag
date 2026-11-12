param(
  [Parameter(Mandatory=$true)][string]$Url,
  [Parameter(Mandatory=$true)][string]$Dest,
  [string]$Enc = "65001"
)
$ErrorActionPreference = "Stop"
try {
  $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 40 -Headers @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    "Accept-Language" = "zh-CN,zh;q=0.9,en;q=0.8"
  }
  $bytes = $r.RawContentStream.ToArray()
  $encObj = [System.Text.Encoding]::GetEncoding([int]$Enc)
  $html = $encObj.GetString($bytes)
  $t = $html -replace '(?s)<script.*?</script>', ' '
  $t = $t -replace '(?s)<style.*?</style>', ' '
  $t = $t -replace '(?s)<!--.*?-->', ' '
  $t = $t -replace '(?s)<head.*?</head>', ' '
  $t = $t -replace '<br\s*/?>', "`n"
  $t = $t -replace '</(p|div|li|h1|h2|h3|tr)>', "`n"
  $t = $t -replace '<[^>]+>', ' '
  $t = [System.Net.WebUtility]::HtmlDecode($t)
  $lines = $t -split "`n" | ForEach-Object {
    $s = $_ -replace '[\u00a0\u3000]', ' '
    $s = $s -replace '[ \t]+', ' '
    $s.Trim()
  } | Where-Object { $_ -ne '' }
  $t = "SOURCE_URL: $Url`n`n" + ($lines -join "`n")
  $dir = Split-Path -Parent $Dest
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  [System.IO.File]::WriteAllText($Dest, $t, (New-Object System.Text.UTF8Encoding($false)))
  # ASCII-only status line
  Write-Output ("OK chars=" + $t.Length + " dest=" + $Dest)
} catch {
  Write-Output ("FAIL " + $Url + " :: " + $_.Exception.Message)
}
