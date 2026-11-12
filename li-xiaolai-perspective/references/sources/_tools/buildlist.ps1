param(
  [Parameter(Mandatory=$true)][string]$CdxFile,
  [Parameter(Mandatory=$true)][string]$OutList,
  [int]$Limit = 400
)
$seen = @{}
$rows = @()
foreach ($line in (Get-Content -Path $CdxFile -Encoding UTF8)) {
  $line = $line.Trim()
  if ($line -eq "") { continue }
  $f = $line -split '\s+'
  if ($f.Length -lt 2) { continue }
  $orig = $f[1]
  $m = [regex]::Match($orig, 'twitter\.com/(xiaolai\d*)/status/(\d+)')
  if (-not $m.Success) { continue }
  $handle = $m.Groups[1].Value
  $sid = $m.Groups[2].Value
  $key = $handle + "/" + $sid
  if ($seen.ContainsKey($key)) { continue }
  $seen[$key] = $true
  $idNum = [int64]$sid
  $ms = ($idNum -shr 22) + 1288834974657
  if ($ms -lt 1262304000000 -or $ms -gt 1900000000000) { continue }
  $dt = [datetimeoffset]::FromUnixTimeMilliseconds($ms).UtcDateTime
  $rows += [pscustomobject]@{
    Handle = $handle
    Sid    = $sid
    Date   = $dt
    Ymd    = $dt.ToString("yyyy-MM-dd")
    Url    = "https://twitter.com/" + $handle + "/status/" + $sid
  }
}
$rows = $rows | Sort-Object Date -Unique
Write-Output ("unique tweets parsed: " + $rows.Count)
$sel = $rows | Select-Object -First $Limit
$sb = New-Object System.Text.StringBuilder
foreach ($r in $sel) {
  [void]$sb.AppendLine($r.Url + "|" + $r.Ymd + "|" + $r.Handle)
}
[System.IO.File]::WriteAllText($OutList, $sb.ToString(), (New-Object System.Text.UTF8Encoding($false)))
Write-Output ("written: " + $sel.Count + " -> " + $OutList)
$sel | Group-Object { $_.Date.Year } | Sort-Object Name | ForEach-Object { Write-Output ("  " + $_.Name + ": " + $_.Count) }
