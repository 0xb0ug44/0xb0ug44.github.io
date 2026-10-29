# 0xb0ug44 — Cybersecurity Portfolio

A professional cybersecurity portfolio featuring projects, certifications, and technical write-ups. Dark hacker aesthetic with matrix-rain particles, glitch effects, and code snippets throughout.

## 🔥 Features

- **Dark hacker theme** — Matrix rain particles, scanline overlay, glitch animations
- **Responsive design** — Mobile-first, works on all devices
- **Terminal UI** — Typewriter effects, JSON profile block, code snippets with copy buttons
- **Project showcase** — Filterable cards with syntax-highlighted code previews
- **Certifications** — Cert cards + HackTheBox/TryHackMe rank bars
- **Blog/Write-ups** — Full article layout with code blocks
- **Contact form** — With subject selection and PGP fingerprint display
- **Easter egg** — Konami code (`↑↑↓↓←→←→BA`)
- **No dependencies** — Pure HTML/CSS/JS, no frameworks, no tracking

## 📁 File Structure

```
portfolio/
├── index.html              ← Main portfolio page
├── css/
│   ├── style.css           ← Main styles (dark theme, components)
│   └── terminal.css        ← Terminal & code highlight styles
├── js/
│   ├── particles.js        ← Matrix rain + particle network
│   └── main.js             ← Interactions, animations, filters
├── blog/
│   ├── index.html          ← Blog listing page
│   ├── bgp-hijacking.html  ← Sample write-up (BGP hijack)
│   ├── ssrf-cicd.html      ← Add your own write-ups
│   ├── ad-attack-chain.html
│   └── fileless-malware.html
└── README.md
```

## 🚀 Deploy to GitHub Pages

### Option 1: GitHub Pages (recommended)

1. Fork or clone this repo
2. Go to your repo → **Settings** → **Pages**
3. Under **Source**, select `Deploy from a branch`
4. Choose `main` branch, `/ (root)` folder
5. Click **Save** — your site will be live at:
   `https://yourusername.github.io/repository-name`

### Option 2: Custom Domain

1. Add a `CNAME` file to the root with your domain:
   ```
   yourdomain.com
   ```
2. Point your domain's DNS to GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

## ✏️ Customization

### Personal Info
Edit `index.html` and replace:
- `Mohamed Yassine Bougamra` → your name/handle
- `alex@0xb0ug44.io` → your email
- Stats (`47 CVEs`, `120 CTF Solves`, etc.) → your real stats
- GitHub/LinkedIn/Twitter links

### Projects
Each project card in `index.html` follows this structure:
```html
<article class="project-card" data-category="network|webapp|tool|research">
  <h3 class="project-title">Your Project</h3>
  <p class="project-desc">Description...</p>
  <div class="project-code">
    <pre><code>your code snippet</code></pre>
  </div>
  <div class="project-tags">
    <span class="ptag">Python</span>
  </div>
</article>
```

### Blog Posts
Copy `blog/bgp-hijacking.html` as a template for new write-ups.
Update the blog listing in both `index.html` and `blog/index.html`.

### Colors (CSS Variables)
Edit `css/style.css` `:root` block:
```css
--green: #ff3d57;      /* primary accent */
--cyan: #00e5ff;       /* secondary accent */
--red: #ff3d57;        /* danger/alert */
```

## 🛡️ Security Notes

- No server-side code — static site only
- Contact form is frontend-only (add Formspree/Netlify Forms for real submissions)
- No cookies, no tracking, no analytics by default

## 📝 License

MIT — use freely for your personal portfolio.
