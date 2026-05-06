import fs from 'fs';
import path from 'path';

const SRC = 'c:/Users/Akila Gunaseelan/Arjun Projects/HillaHolidayHome/src';

const mappings = {
    // Pages
    'LoginPage.jsx': 'pages/LoginPage.jsx',
    'LoginPage.css': 'pages/LoginPage.module.css',
    'HomePage.jsx': 'pages/HomePage.jsx',
    'HomePage.css': 'pages/HomePage.module.css',
    'BookingPage.jsx': 'pages/BookingPage.jsx',
    'BookingPage.css': 'pages/BookingPage.module.css',
    'ActivityPage.jsx': 'pages/ActivityPage.jsx',
    'ActivityPage.css': 'pages/ActivityPage.module.css',
    'AdminDashboard.jsx': 'pages/AdminDashboard.jsx',
    'AdminDashboard.css': 'pages/AdminDashboard.module.css',
    'ProfilePage.jsx': 'pages/ProfilePage.jsx',
    'ProfilePage.css': 'pages/ProfilePage.module.css',

    // Layouts
    'Layout.jsx': 'layouts/Layout.jsx',
    'Layout.css': 'layouts/Layout.module.css',
    'SideBar.jsx': 'layouts/SideBar.jsx',
    'SideBar.css': 'layouts/SideBar.module.css',
    'TopBanner.jsx': 'layouts/TopBanner.jsx',
    'TopBanner.css': 'layouts/TopBanner.module.css',

    // Components
    'BookingForm.jsx': 'components/BookingForm.jsx',
    'BookingForm.css': 'components/BookingForm.module.css',
    'BookingDetails.jsx': 'components/BookingDetails.jsx',
    'BookingDetails.css': 'components/BookingDetails.module.css',
    'AddressForm.jsx': 'components/AddressForm.jsx',
    'AddressForm.css': 'components/AddressForm.module.css',
    'ActivityForm.jsx': 'components/ActivityForm.jsx',
    'ActivityForm.css': 'components/ActivityForm.module.css',
    'ActivityCard.jsx': 'components/ActivityCard.jsx',
    'CalendarComponent.jsx': 'components/CalendarComponent.jsx',
    'Calendar.css': 'components/Calendar.module.css',
    'StatsCard.jsx': 'components/StatsCard.jsx',
    'LineChartComponent.jsx': 'components/LineChartComponent.jsx',
    'BarChartComponent.jsx': 'components/BarChartComponent.jsx',
    'BookingSummary.jsx': 'components/BookingSummary.jsx',
    
    // Core remains in src/
    // index.css stays
    // App.jsx stays
    // main.jsx stays
};

for (const [srcFile, destPath] of Object.entries(mappings)) {
    const src = path.join(SRC, srcFile);
    const dest = path.join(SRC, destPath);
    
    // Ensure dir exists
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    
    if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
        console.log(`Moved ${srcFile} to ${destPath}`);
    } else {
        console.log(`Warning: ${srcFile} not found.`);
    }
}
