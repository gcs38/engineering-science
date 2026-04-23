# Engineering Science Scotland — Website

A free educational resource for SQA Engineering Science at National 5, Higher and Advanced Higher.

---

## Getting the site live — step by step

### Step 1: Create a GitHub account
1. Go to https://github.com
2. Click **Sign up**
3. Choose a username — something like `engsciscotland` works well
4. Use your email, set a password, complete the verification
5. Choose the **Free** plan

### Step 2: Create a new repository
1. Once logged in, click the **+** icon (top right) → **New repository**
2. Name it: `engineering-science`
3. Set it to **Public** (required for free GitHub Pages)
4. Leave everything else as default
5. Click **Create repository**

### Step 3: Upload the site files
1. On your new repository page, click **uploading an existing file**
2. Drag and drop the entire contents of the `engsciscotland` folder
   (all the HTML files, the `css/`, `js/`, `teacher/`, `n5/`, `higher/`, `ah/` folders)
3. Scroll down, add a commit message like "Initial site upload"
4. Click **Commit changes**

### Step 4: Enable GitHub Pages
1. In your repository, click **Settings** (top menu)
2. In the left sidebar, click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select `main` and `/ (root)`
5. Click **Save**
6. After a minute, your site will be live at:
   `https://[your-username].github.io/engineering-science`

### Step 5: Connect your custom domain
(Do this AFTER buying your domain — see domain buying instructions below)

1. In GitHub Pages settings (Settings → Pages)
2. Under **Custom domain**, type: `engineeringsciencescotland.co.uk`
3. Click **Save**
4. Tick **Enforce HTTPS** once it appears

---

## Buying the domain — engineeringsciencescotland.co.uk

### Recommended registrar: 123-reg.co.uk
We recommend 123-reg as they're a reputable UK registrar with good support.

1. Go to https://www.123-reg.co.uk
2. Search for: `engineeringsciencescotland.co.uk`
3. Add to basket and purchase (typically £8–12/year for a .co.uk)
4. Create an account / log in to complete purchase

### After buying — point the domain to GitHub Pages
Log into 123-reg, go to **Domain Manager → Manage → DNS**, and add these records:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | [your-github-username].github.io |

DNS changes take up to 24 hours to propagate. After that, your site will be live at:
**https://www.engineeringsciencescotland.co.uk**

---

## Adding content — day to day

### Adding a PDF (e.g. new course notes)
1. Upload your PDF to **Google Drive**
2. Right-click the file → **Share** → change to "Anyone with the link can view"
3. Copy the **file ID** from the URL (the long string between `/d/` and `/view`)
4. Open the relevant HTML page (e.g. `n5/mechanisms/drive-systems.html`)
5. Replace `YOUR_GOOGLE_DRIVE_FILE_ID` with your actual file ID in two places
6. Upload the updated HTML file to GitHub (drag and drop to replace the old one)

### Adding a new resource card
Open the relevant HTML page and copy an existing `.rc` card block, then edit the text.

### Changing the teacher password
Open `js/site.js` and change the value of `TEACHER_PASSWORD` on line 3.
Then re-upload `js/site.js` to GitHub.

---

## Site structure

```
engsciscotland/
├── index.html              ← Homepage
├── CNAME                   ← Custom domain config
├── css/
│   └── style.css           ← All site styles
├── js/
│   ├── site.js             ← Auth + helper functions
│   └── nav.js              ← Sidebar navigation
├── teacher/
│   ├── login.html          ← Password login page
│   └── dashboard.html      ← Teacher resources
├── n5/
│   ├── mechanisms/         ← N5 Mechanisms pages
│   ├── electronics/        ← N5 Electronics pages
│   └── contexts/           ← N5 Contexts pages
├── higher/
│   ├── mechanisms/
│   ├── electronics/
│   └── contexts/
└── ah/
    ├── mechanisms/
    ├── electronics/
    └── project-management/
```

---

## Colleagues — how to contribute

Any colleague can update the site:
1. They need a GitHub account
2. You add them as a **collaborator**: Settings → Collaborators → Add people
3. They can then upload/replace files directly through the GitHub website — no coding needed

---

## Support

Built with plain HTML, CSS and JavaScript — no frameworks, no build tools.
Every page can be edited in any text editor (Notepad, TextEdit, VS Code).
