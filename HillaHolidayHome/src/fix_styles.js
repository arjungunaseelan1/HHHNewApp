import fs from 'fs';
import path from 'path';

const SRC = 'c:/Users/Akila Gunaseelan/Arjun Projects/HillaHolidayHome/src';

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
};

const jsxFiles = walk(SRC);

jsxFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix the literal $styles bug from the powershell string interpolation
    content = content.replace(/\{\$styles\['/g, "{styles['");
    content = content.replace(/className=\{`\$styles/g, "className={`styles");
    content = content.replace(/\[\$styles\['/g, "[styles['");

    // Also fix the calendar-day explicit template bug in HomePage
    content = content.replace(/className={`calendar-day \$\{([^}]+)\}`}/g, 'className={`${styles[\'calendar-day\']} ${$1 ? styles[\'selected\'] : \'\'}`}');

    // And make sure BookingContext is correctly imported everywhere needing state
    if (original !== content) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed syntax in " + file);
    }
});
