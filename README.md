# HTTP-Server Starter (Static HTML/CSS/JS)

This repo is a minimal template for **static sites** that run via the **npm http-server** package.

It’s Codespaces-ready and great for pre-Express assignments.

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
- No server-side JS yet—`http-server` just serves static files.
- This mimics Python’s `python3 -m http.server` but stays in the Node ecosystem.
- Don’t enable GitHub Pages for graded work (Pages sites are public even if the repo is private).
