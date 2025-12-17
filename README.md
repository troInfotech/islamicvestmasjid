# Islamisk Center Vest Albertslund Website

A beautiful, modern static website for an Islamic Center, featuring prayer times, services, events, and community information.

## 🕌 Features

- **Prayer Times** - Main landing page with daily prayer times and Jummah schedule
- **Home Page** - Community announcements, services overview, and upcoming events
- **About Us** - History, mission, values, and leadership information
- **Services** - Detailed information about all center services
- **Contact** - Contact form, location, office hours, and FAQ

## 📁 Project Structure

```
masjidapp/
├── index.html        # Prayer Times (Landing Page)
├── home.html         # Home Page
├── about.html        # About Us Page
├── services.html     # Services Page
├── contact.html      # Contact Page
├── css/
│   └── styles.css    # Main Stylesheet
├── js/
│   └── main.js       # JavaScript Functions
└── README.md         # This file
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** button and select **New repository**
3. Name your repository (e.g., `islamic-center-website`)
4. Make it **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Step 2: Upload Your Files

**Option A: Using GitHub Web Interface**
1. In your new repository, click **Add file** > **Upload files**
2. Drag and drop all the website files
3. Click **Commit changes**

**Option B: Using Git Command Line**
```bash
cd masjidapp
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**
6. Wait a few minutes for deployment

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## 🌐 Connecting a Custom Domain

### Step 1: Configure GitHub Pages

1. Go to your repository **Settings** > **Pages**
2. Under **Custom domain**, enter your domain (e.g., `www.yourdomain.com`)
3. Click **Save**
4. Optionally check **Enforce HTTPS**

### Step 2: Configure Your Domain Provider

Add these DNS records at your domain provider:

**For apex domain (yourdomain.com):**
| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**For www subdomain:**
| Type | Name | Value |
|------|------|-------|
| CNAME | www | YOUR_USERNAME.github.io |

### Step 3: Create CNAME File

Create a file named `CNAME` (no extension) in your repository root with your domain:
```
www.yourdomain.com
```

## ✏️ Customization

### Prayer Times
Edit the prayer times in `js/main.js`:
```javascript
const prayerTimesData = {
  fajr: { start: "6:15 AM", iqamah: "6:45 AM" },
  // ... update other times
};
```

Also update the times displayed in `index.html` and `home.html`.

### Contact Information
Update the address, phone, and email in:
- Footer sections of all HTML files
- Contact page (`contact.html`)

### Colors & Theme
Edit the CSS variables in `css/styles.css`:
```css
:root {
  --primary-gold: #d4a853;
  --primary-green: #1a5d3a;
  --deep-blue: #1a2744;
  /* ... */
}
```

### Content
Simply edit the HTML files to update:
- Mosque name and tagline
- Event dates and descriptions
- Scholar names and photos
- Service details

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Technologies Used

- HTML5
- CSS3 (with CSS Variables and Flexbox/Grid)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Playfair Display, Cormorant Garamond)

## 📝 License

This project is open source and available for use by any Islamic center or mosque.

## 🤝 Support

For questions or assistance, please open an issue on GitHub.

---

**May Allah bless your efforts in serving the community. 🤲**
