import fs from 'fs';
import path from 'path';

const SRC = 'c:/Users/Akila Gunaseelan/Arjun Projects/HillaHolidayHome/src';

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        if (fs.statSync(file).isDirectory() && !file.includes('assets')) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.module.css') && !file.includes('SideBar') && !file.includes('TopBanner') && !file.includes('Layout')) {
            results.push(file);
        }
    });
    return results;
};

const cssFiles = walk(SRC);

cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Overhaul generic container backgrounds to full glass elements
    content = content.replace(/background:\s*(?:#ffffff|#f5f7fa|#e0e0e0|#f9fafb|rgba\(\s*255,\s*255,\s*255,\s*0\.\d+\s*\))(?:!important)?;/gi, 'background: var(--glass-bg);\n    backdrop-filter: var(--glass-blur);\n    border: var(--glass-border);\n    box-shadow: var(--glass-shadow);');

    // Overhaul neutral/flat accent backgrounds (like calendar inner day cells or buttons) to glassy soft whites or jacaranda
    content = content.replace(/background:\s*#d6d6d6;/gi, 'background: rgba(255,255,255,0.4);');
    content = content.replace(/background:\s*(?:#cfcfcf|#bdbdbd);/gi, 'background: var(--jacaranda-gradient);\n    color: white;\n    box-shadow: 0 4px 15px rgba(156,137,184,0.4);');

    // Overhaul generic button logic
    content = content.replace(/background:\s*#446152;/gi, 'background: var(--jacaranda-gradient);');

    // Force text colors to match the premium theme
    content = content.replace(/color:\s*(?:#333|#000|#1e293b|#334155);/gi, 'color: var(--text-dark);');
    content = content.replace(/color:\s*(?:#666|#777|#64748b|#4a5c68);/gi, 'color: var(--text-light);');

    if (original !== content) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Upgraded to glassmorphism: " + path.basename(file));
    }
});
