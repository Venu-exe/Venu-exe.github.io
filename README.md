# Venu-exe | Cybersecurity Portfolio Website

A high-fidelity, interactive cybersecurity portfolio designed specifically for **Venu-exe**. The application features an interactive terminal shell simulation, Matrix digital rain animation, live stats counters, project inspection modes, and a PGP-encrypted message terminal simulator.

## ✨ Features
1. **Interactive Cyber Terminal**:
   - Supports typing real commands: `help`, `about`, `skills`, `projects`, `scan`, `exploit`, `hackerone`, `bugcrowd`.
   - Simulates terminal inspection of codebases (try: `inspect Portscanner` or `inspect ssh-bruteforce`).
2. **Matrix Digital Rain Background**: High-performance canvas-based binary rain.
3. **CRT HUD Theme**: A glowing retro-modern scanner theme responsive to all devices.
4. **Platform Badging**: Showcase HackerOne, Bugcrowd, and GitHub.
5. **Simulated Secure transmission channel**: Integrates contact forms with terminal outputs.

## 🛠️ Tech Stack
- HTML5 (Semantic Structure)
- Vanilla CSS3 (Custom animations, CRT scanline effects, glow keyframes)
- Vanilla JavaScript (Terminal command parser, Matrix animation canvas)
- FontAwesome & Google Fonts (`Fira Code`, `Share Tech Mono`)

## 🚀 How to Run Locally
Open the `index.html` file directly in any modern browser, or spin up a local development server from this directory:

### Python 3
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080`

### Node.js / npm
```bash
npx http-server -p 8080
```
Then visit: `http://localhost:8080`

---

## 🌐 Suitable Domain Recommendations for Venu-exe
To deploy your personal portfolio, here are recommended, highly professional domain options:

1. **`venuexe.dev`** (Highly Recommended)
   - *Why:* Combines your Github name `Venu-exe` with the developer extension `.dev`. Since `.exe` is an executable extension and `.dev` stands for developer, this is highly tech-centric and memorable.
2. **`venush.dev` / `venush.com`**
   - *Why:* Aligns directly with your HackerOne & Bugcrowd handle (`venu-sh`), creating a cohesive personal security brand.
3. **`venuexe.com`**
   - *Why:* The classic `.com` is globally trusted, highly recognizable, and excellent for SEO.
4. **`venusec.com` / `venusec.dev`**
   - *Why:* Combines your name with the standard suffix for cybersecurity professionals ("sec").

---

## ☁️ How to Deploy for Free

### Option 1: GitHub Pages (Easiest)
1. Initialize a Git repository here:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   ```
2. Create a new repository on GitHub named `Venu-exe.github.io` (or a custom repository name).
3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/Venu-exe/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub, go to **Settings** > **Pages** > Select `main` branch > **Save**.
5. Your portfolio will live at: `https://Venu-exe.github.io/` or your repository's pages URL.

### Option 2: Vercel / Netlify
- Drag-and-drop the `/home/venu/Projects/portfolio` folder directly into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant SSL-secured global deployment.
- You can easily link your custom domain (e.g., `venuexe.dev` or `venush.com`) through their UI.
