# Outpatient Navigator – Santa Monica (Prototype)

A simple, click-through prototype that helps users pick a body area and find outpatient specialists/clinics fast.

## Run locally (optional)
1) Install Node.js (18+ recommended).
2) In a terminal:
```bash
npm install
npm run dev
```
3) Open http://localhost:5173

## Deploy to GitHub Pages
This repo is pre-configured to deploy with GitHub Actions.

1. Create a new **public** repo on GitHub named **`outpatient-navigator`** (keep this exact name).
2. Upload all files from this folder into the repo (drag-and-drop via the web UI).
3. Commit the changes to the `main` branch.
4. Go to **Settings → Pages** and set **Source: GitHub Actions** (it will pick up the workflow).
5. After the workflow finishes, your site will be live at:
```
https://<your-username>.github.io/outpatient-navigator/
```

> If you use a different repo name, edit `vite.config.js` to change `base` to `/<your-repo-name>/` and commit again.
