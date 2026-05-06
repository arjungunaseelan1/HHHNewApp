import fs from 'fs';

const insertImport = (file, importLine) => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('import styles from')) {
        const lines = content.split('\n');
        lines.splice(1, 0, importLine); 
        fs.writeFileSync(file, lines.join('\n'));
        console.log("Added to " + file);
    }
}

const prefix = 'c:/Users/Akila Gunaseelan/Arjun Projects/HillaHolidayHome/src';

insertImport(`${prefix}/components/ActivityCard.jsx`, `import styles from "../pages/ActivityPage.module.css";`);
insertImport(`${prefix}/components/BookingSummary.jsx`, `import styles from "../pages/ActivityPage.module.css";`);
insertImport(`${prefix}/components/BarChartComponent.jsx`, `import styles from "../pages/AdminDashboard.module.css";`);
insertImport(`${prefix}/components/LineChartComponent.jsx`, `import styles from "../pages/AdminDashboard.module.css";`);
insertImport(`${prefix}/components/StatsCard.jsx`, `import styles from "../pages/AdminDashboard.module.css";`);
