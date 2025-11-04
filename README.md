# HTTP-Server Starter (Static HTML/CSS/JS)

This repo is a minimal Codespaces-ready template for **static sites** that run via the **npm http-server** package.

## Quick Start (in Codespaces)
1. Click **Code → Codespaces → Create codespace on main**.
2. Terminal:
   ```bash
   npm start
   ```
3. Click **Open in Browser** when port 3000 appears (serves files from `public/`).

## Folder structure
| Path | Purpose |
|------|----------|
| `public/` | All static site files go here |
| `index.html` | Home page |
| `style.css` | Styles |
| `script.js` | JavaScript logic |

## Local run (without Codespaces)
```bash
npm install
npm start
# then open http://localhost:3000
```

## Notes
- Not configured for server-side JS `http-server` just serves static files a la Python’s `python3 -m http.server`.
- Don’t enable GitHub Pages for submitted work (Pages sites are public even if the repo is private).
