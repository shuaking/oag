param([Parameter(Mandatory=$true)][string]$CdxUrl, [string]$Dest)
$ErrorActionPreference = "Stop"
try {
  $r = Invoke-WebRequest -Uri $CdxUrl -UseBasicParsing -TimeoutSec 60 -Headers @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0 Safari/537.36" }
  $bytes = $r.RawContentStream.ToArray()
  $txt = [System.Text.Encoding]::UTF8.GetString($bytes)
  if ($Dest) {
    $dir = Split-Path -Parent $Dest
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    [System.IO.File]::WriteAllText($Dest, $txt, (New-Object System.Text.UTF8Encoding($false)))
    Write-Output ("OK saved chars=" + $txt.Length + " dest=" + $Dest + " status=" + $r.StatusCode)
  } else {
    Write-Output ("OK chars=" + $txt.Length + " status=" + $r.StatusCode)
  }
} catch {
  Write-Output ("FAIL " + $CdxUrl + " :: " + $_.Exception.Message)
}
