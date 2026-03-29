# Run once (double-click or: powershell -ExecutionPolicy Bypass -File .\Register-WatchlistBraveProtocol.ps1)
# Registers watchlist-brave: for your Windows user so "Watch Now" for Ertugrul opens Brave.

$openScript = Join-Path $PSScriptRoot 'Open-InBrave.ps1'
if (-not (Test-Path -LiteralPath $openScript)) {
  Write-Error "Missing Open-InBrave.ps1 next to this script."
  exit 1
}

$command = "powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File `"$openScript`" `"%1`""

$base = 'HKCU:\Software\Classes\watchlist-brave'
New-Item -Path $base -Force | Out-Null
New-ItemProperty -Path $base -Name '(default)' -Value 'URL:Watchlist open in Brave' -PropertyType String -Force | Out-Null
New-ItemProperty -Path $base -Name 'URL Protocol' -Value '' -PropertyType String -Force | Out-Null

$cmdKey = "$base\shell\open\command"
New-Item -Path $cmdKey -Force | Out-Null
Set-ItemProperty -Path $cmdKey -Name '(default)' -Value $command

Write-Host "Done. Registered watchlist-brave: -> Brave"
Write-Host "If you move this project folder, run this script again."
