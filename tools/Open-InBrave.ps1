# Opens a target URL in Brave. Called with full URI, e.g. watchlist-brave:<base64url-of-https-...>
# Payload is base64url (not percent-encoding) because Windows runs the handler via cmd.exe, which
# mangles %XX sequences inside the argument.
param(
  [Parameter(Position = 0)]
  [string] $ProtocolArg
)

function Show-Err([string]$msg) {
  Add-Type -AssemblyName System.Windows.Forms
  [System.Windows.Forms.MessageBox]::Show($msg, 'Watchlist - Open in Brave') | Out-Null
}

function Decode-Base64Url([string]$s) {
  $b64 = $s.Replace('-', '+').Replace('_', '/')
  $pad = $b64.Length % 4
  if ($pad -eq 2) { $b64 += '==' }
  elseif ($pad -eq 3) { $b64 += '=' }
  elseif ($pad -eq 1) { throw 'Invalid base64 length' }
  $bytes = [Convert]::FromBase64String($b64)
  return [Text.Encoding]::UTF8.GetString($bytes)
}

try {
  if (-not $ProtocolArg) {
    Show-Err 'No URL was passed from the browser (empty argument).'
    exit 1
  }

  $payload = ($ProtocolArg -replace '^watchlist-brave:', '').TrimStart('/')

  $targetUri = $null
  try {
    $decoded = Decode-Base64Url $payload
    if ($decoded -match '^https?://') {
      $targetUri = $decoded
    }
  } catch { /* try legacy percent-encoding below */ }

  if (-not $targetUri) {
    $targetUri = [Uri]::UnescapeDataString($payload)
  }

  if ($targetUri -notmatch '^https?://') {
    $preview = if ($targetUri) { $targetUri.Substring(0, [Math]::Min(120, $targetUri.Length)) } else { '(empty)' }
    Show-Err "Could not decode URL.`nGot: $preview..."
    exit 1
  }

  $braveCandidates = @(
    "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe",
    "${env:ProgramFiles(x86)}\BraveSoftware\Brave-Browser\Application\brave.exe",
    "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\Application\brave.exe"
  )

  $exe = $braveCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
  if (-not $exe) {
    Show-Err "Brave was not found in the usual install paths.`n`nInstall Brave or edit tools\Open-InBrave.ps1."
    exit 1
  }

  Start-Process -FilePath $exe -ArgumentList $targetUri
} catch {
  Show-Err $_.Exception.Message
  exit 1
}
