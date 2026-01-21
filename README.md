# BreakfastTheHaven

Static bilingual menu for The Haven with time-based service availability.

## Structure
- `index.html` - landing page with language selector and time-based menus.
- `menu.html` - menu detail page (driven by query params).
- `admin.html` - local editor with login (client-side).
- `assets/css/site.css` - shared styles.
- `assets/js/menu-data.js` - menu data and copy.
- `assets/js/site.js` - rendering logic and language handling.
- `assets/js/admin.js` - admin login and editor logic.
- `assets/images/` - logos and banner images.

## Usage
Open `index.html` in a browser. If you prefer a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing menus
Update the menu items and pricing in `assets/js/menu-data.js`.

## Admin access
Open `admin.html` to edit menus and hours in the browser. Default credentials:

- user: `admin`
- password: `theHaven2024`

Notes:
- Changes are saved in your browser only.
- Use the export button to download `menu-data.js`, then replace `assets/js/menu-data.js` in the repo.
- Open `admin.html` via `http://localhost` or HTTPS so the login works.
- Client-side login is not secure against inspection; use server-side auth for real protection.
