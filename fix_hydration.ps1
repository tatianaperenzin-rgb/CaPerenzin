Get-ChildItem -Path "src" -Recurse -Filter "*.jsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # We want to replace newlines inside className="..."
    # We can use a regex evaluation callback
    $evaluator = [System.Text.RegularExpressions.MatchEvaluator] {
        param($match)
        return 'className="' + ($match.Groups[1].Value -replace '\s*?
\s*', ' ') + '"'
    }
    
    $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, 'className="([^"]*?
[^"]*)"', $evaluator)
    
    # Keep doing it just in case there are multiple lines (the regex above captures the whole inside of quotes, so one replace is enough)
    
    if ($content -cne $newContent) {
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Host "Fixed: " $_.FullName
    }
}
