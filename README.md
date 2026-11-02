# Closetly — Digital Wardrobe

Closetly is a simple, responsive digital wardrobe built with HTML, CSS, and vanilla JavaScript. Browse and organize clothing, save favorites, add your own items, and get outfit suggestions for different occasions.

## Features

- Browse the wardrobe and filter items by category.
- Save and view favorite items.
- Add clothing with a name, category, color, and direct image URL.
- Preview and validate an image before adding it.
- Delete items you added.
- Generate outfit suggestions for Casual, College, Party, and Formal occasions.
- Keep wardrobe items and favorites in your browser's local storage.
- Use the responsive interface on desktop and mobile screens.

## Getting started

No dependencies, build tools, or installation are required.

1. Download or clone this project.
2. Open `indx.html` in a modern web browser.

For more consistent local storage behavior, you can serve the project with any static web server and open the local address it provides.

## Project files

- `indx.html` — Page structure and wardrobe, outfit selector, and add-item form.
- `style.css` — Layout, visual styling, and responsive design.
- `script.js` — Sample wardrobe data, rendering, filtering, favorites, storage, and outfit suggestions.

## Using the app

The wardrobe starts with sample clothing items. Use the category buttons to filter the collection, or select **Favorites** to show saved items. To add clothing, fill in the form and provide a direct URL to an image that can be loaded by your browser; product or sharing page links are not image URLs. Items you add can be deleted from their wardrobe cards.

Choose an occasion in **Outfit Selector** and select **Generate My Outfit** for a suggestion based on items marked suitable for that occasion. Party suggestions require a dress and shoes; other occasions can use a dress or a combination of separates and shoes. Add suitable items if the app reports that it cannot make a complete party outfit.

## Data and images

Wardrobe items and favorites are saved in the browser's `localStorage` for this app. They are not synced between browsers or devices. Clearing the browser's stored site data may remove them.

Clothing photos and the hero image use remote image URLs, so an internet connection is needed to load them. Images you add must also be reachable by your browser.
