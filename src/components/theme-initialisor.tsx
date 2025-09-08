"use client";

// This component is a hack to get around the fact that Zustand's persist middleware
// can only run on the client, which causes a flicker on page load.
// This script runs before the page is hydrated, so the theme is set correctly.

function ThemeInitializer() {
  const script = `
(function() {
  try {
    // 1. Find the theme from localStorage
    const themeStore = localStorage.getItem('theme-preference');
    if (!themeStore) return; // No theme stored, do nothing

    const themeState = JSON.parse(themeStore);
    const isDark = themeState.state.isDark;

    // 2. Add 'dark' class to <html> if needed
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    // If something fails, we default to the browser's preference
    console.error('Could not apply persisted theme', e);
  }
})();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default ThemeInitializer;