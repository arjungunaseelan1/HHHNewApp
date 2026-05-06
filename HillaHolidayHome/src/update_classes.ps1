$files = Get-ChildItem -Path "c:\Users\Akila Gunaseelan\Arjun Projects\HillaHolidayHome\src" -Filter *.jsx -Recurse

foreach ($f in $files) {
    if ($f.Name -eq "App.jsx" -or $f.Name -eq "main.jsx" -or $f.Name -eq "LoginPage.jsx") { continue }
    
    $content = Get-Content $f.FullName -Raw
    $original = $content
    
    # Update pure .css imports to use styles and module.css
    $content = [regex]::Replace($content, 'import\s+"(.*?)\.css"', 'import styles from "$1.module.css"')
    
    # We must match standard classNames, but avoid breaking template literals `...`
    # Replace single class name: className="example"
    $content = [regex]::Replace($content, 'className="([a-zA-Z0-9_-]+)"', "className={`$styles['`$1']`} ")
    
    # Replace two string classes: className="example test"
    $content = [regex]::Replace($content, 'className="([a-zA-Z0-9_-]+)\s+([a-zA-Z0-9_-]+)"', "className={[styles['`$1'], styles['`$2']].join(' ')}")

    # Replace three string classes: className="example test box"
    $content = [regex]::Replace($content, 'className="([a-zA-Z0-9_-]+)\s+([a-zA-Z0-9_-]+)\s+([a-zA-Z0-9_-]+)"', "className={[styles['`$1'], styles['`$2'], styles['`$3']].join(' ')}")

    if ($content -cne $original) {
        Set-Content -Path $f.FullName -Value $content -NoNewline
        Write-Host "Updated JSX syntax for $($f.Name)"
    }
}
