import fs from 'fs';
import path from 'path';

const SRC = 'c:/Users/Akila Gunaseelan/Arjun Projects/HillaHolidayHome/src';

const allFilesMap = {
    // Pages
    'LoginPage': 'pages',
    'HomePage': 'pages',
    'BookingPage': 'pages',
    'ActivityPage': 'pages',
    'AdminDashboard': 'pages',
    'ProfilePage': 'pages',
    
    // Layouts
    'Layout': 'layouts',
    'SideBar': 'layouts',
    'TopBanner': 'layouts',
    
    // Components
    'BookingForm': 'components',
    'BookingDetails': 'components',
    'AddressForm': 'components',
    'ActivityForm': 'components',
    'ActivityCard': 'components',
    'CalendarComponent': 'components',
    'StatsCard': 'components',
    'LineChartComponent': 'components',
    'BarChartComponent': 'components',
    'BookingSummary': 'components',
    
    // Context
    'BookingContext': 'context'
};

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
    
    for (const [compName, folder] of Object.entries(allFilesMap)) {
        const fileDir = path.dirname(file); 
        const targetDir = path.join(SRC, folder); 
        
        let relPath = path.relative(fileDir, targetDir).replace(/\\/g, '/');
        if (relPath === '') relPath = '.';
        if (!relPath.startsWith('.')) relPath = './' + relPath;
        
        // E.g. ../layouts/SideBar
        const finalImportTarget = `${relPath}/${compName}`;
        
        // 1. Named/Default imports: import Something from "./SideBar.jsx"
        const regex = new RegExp(`import\\s+([a-zA-Z0-9_{\\}\\s,]+)\\s+from\\s+["'][^"']*?${compName}(?:\\.jsx)?["']`, 'g');
        content = content.replace(regex, `import $1 from "${finalImportTarget}"`);
        
        // 2. Side-effect bare imports: import "./SideBar.jsx"
        const regexSideEffects = new RegExp(`import\\s+["'][^"']*?${compName}(?:\\.jsx)?["']`, 'g');
        content = content.replace(regexSideEffects, `import "${finalImportTarget}"`);
    }

    if (original !== content) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed imports in " + file);
    }
});
