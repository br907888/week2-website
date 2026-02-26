# Dark Mode Toggle — Implementation Plan

## Step 1: Define dark mode CSS variables

Add a [data-theme="dark"] block in styles.css that overrides the existing :root variables (--cream, --dark-text, etc.) and handles the handful of hardcoded white backgrounds (.featured, .contact-content, etc.).

Test: Manually add data-theme="dark" to the <html> tag in index.html and verify the color palette flips correctly.

## Step 2: Add the toggle button HTML to index.html

Place a <button id="theme-toggle"> inside the <nav>, next to the existing .nav-toggle hamburger. Just a placeholder label for now — no styling yet.

Test: The button appears in the nav on index.html. Clicking it does nothing yet.

## Step 3: Write the JS logic in scripts.js

Add an initDarkMode() function that:
Reads localStorage.getItem('theme') on load and applies data-theme to <html>
Adds a click handler to the button that toggles the attribute and saves to localStorage

Test: Toggle works on index.html. Refresh the page — the preference is remembered.

## Step 4: Style the toggle button in styles.css

Give the button a sun/moon icon (using Unicode or a simple CSS shape) that swaps based on [data-theme="dark"]. Match the existing nav aesthetic (cream color, smooth transition).

Test: The button looks intentional and polished in both light and dark modes.

## Step 5: Copy the toggle button to the remaining 4 HTML pages

Add the same <button id="theme-toggle"> to about.html, menu.html, locations.html, and contact.html. The shared scripts.js already runs on all pages, so no extra JS is needed.

Test: Switch theme on any page, navigate to another — the theme persists everywhere.

## Step 6: Honor the OS/system preference as the initial default

In initDarkMode(), add a fallback: if localStorage has no saved value, check window.matchMedia('(prefers-color-scheme: dark)') and use that as the starting state.

Test: Clear localStorage in DevTools, then toggle your OS between light/dark mode — the site should follow it automatically on first visit.
