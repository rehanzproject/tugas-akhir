async function loadApp() {
    await import('./index.js');
}

loadApp().catch(err => {
    console.error('Failed to load app:', err);
});