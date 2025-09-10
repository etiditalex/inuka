# 🚀 cPanel Deployment Guide - Inuka Properties Website

## 📋 Pre-Upload Checklist

### Files Ready for Upload ✅
- [x] index.html (Homepage)
- [x] google-my-business-landing.html (GMB landing page)
- [x] land-for-sale.html (Properties listing)
- [x] contact.html (Contact page)
- [x] book-visit.html (Site visit booking)
- [x] styles.css (Main stylesheet)
- [x] script.js (Main JavaScript)
- [x] .htaccess (Apache configuration - IMPORTANT!)
- [x] robots.txt (Search engine instructions)
- [x] sitemap.xml (Site structure)
- [x] about/ (About pages directory)
- [x] insider/ (Content pages directory)
- [x] properties/ (Property listings directory)
- [x] testimonials/ (Client testimonials directory)

## 🎯 cPanel Upload Instructions

### Step 1: Access cPanel File Manager
1. Log into your cPanel account
2. Find and click **"File Manager"**
3. Navigate to **"public_html"** folder
4. **IMPORTANT:** If you have an existing website, backup first!

### Step 2: Upload Files
**Method A: Upload Individual Files**
1. Select all files from your local INUKA folder
2. Upload them to public_html folder
3. **CRITICAL:** Make sure .htaccess file is uploaded (it's hidden by default)

**Method B: Upload as ZIP (Recommended)**
1. Download the updated ZIP file: `inuka-properties-website-complete.zip`
2. Upload the ZIP to public_html
3. Extract the ZIP file in cPanel
4. Delete the ZIP file after extraction
5. **IMPORTANT:** This ZIP now includes all the new individual blog post pages

### Step 3: Set File Permissions
After upload, set these permissions:
- **Folders:** 755 (rwxr-xr-x)
- **Files:** 644 (rw-r--r--)
- **.htaccess:** 644 (rw-r--r--)

### Step 4: Verify Upload
Check that these files are in public_html:
```
public_html/
├── index.html
├── google-my-business-landing.html
├── land-for-sale.html
├── contact.html
├── book-visit.html
├── styles.css
├── script.js
├── .htaccess ← CRITICAL FILE
├── robots.txt
├── sitemap.xml
├── about/
├── insider/
│   ├── blogs.html
│   ├── news.html
│   ├── market-research.html
│   └── posts/
│       ├── blogs/
│       │   ├── 2024-real-estate-market-outlook-coastal-kenya.html
│       │   ├── 5-essential-questions-buying-land.html
│       │   ├── kilifi-county-next-investment-frontier.html ← NEW
│       │   ├── nyali-mombasa-smart-investment.html ← NEW
│       │   ├── understanding-title-deeds-complete-guide.html ← NEW
│       │   ├── flexible-payment-plans-making-real-estate-accessible.html ← NEW
│       │   └── new-highway-project-boost-coastal-real-estate.html ← NEW
│       ├── news/
│       └── research/
├── properties/
└── testimonials/
```

## 🔧 cPanel Configuration

### Step 5: Domain Configuration
1. Go to **"Subdomains"** or **"Addon Domains"**
2. Add your domain: **inukaproperties.co.ke**
3. Point it to public_html folder
4. Enable **"Wildcard Subdomains"** if available

### Step 6: SSL Certificate Setup
1. Go to **"SSL/TLS"** in cPanel
2. Click **"Let's Encrypt"** (Free SSL)
3. Add your domain: **inukaproperties.co.ke**
4. Enable **"Force HTTPS Redirect"**
5. Wait for certificate activation (5-10 minutes)

### Step 7: Email Configuration (Optional)
1. Go to **"Email Accounts"**
2. Create: **info@inukaproperties.co.ke**
3. Set up email forwarding if needed

## 🚀 Post-Upload Testing

### Step 8: Test Your Website
1. **Visit:** https://inukaproperties.co.ke
2. **Check:** All pages load correctly
3. **Test:** Mobile responsiveness
4. **Verify:** Contact forms work
5. **Confirm:** Search functionality works

### Step 9: Test Blog Post Links (CRITICAL)
Test these specific blog post URLs to ensure they work:
1. **Visit:** https://inukaproperties.co.ke/insider/blogs.html
2. **Click each "Read More" button** and verify they lead to complete articles:
   - Kilifi County: The Next Investment Frontier
   - Nyali: Why This Mombasa Neighborhood is a Smart Investment
   - Understanding Title Deeds: A Complete Guide for Investors
   - Flexible Payment Plans: Making Real Estate Investment Accessible
   - New Highway Project to Boost Coastal Real Estate Values
3. **Verify:** No 404 errors on any blog post pages
4. **Check:** All blog posts have complete content and proper navigation

### Step 9: SEO Verification
1. **Google Search Console:** Submit sitemap
2. **Mobile-Friendly Test:** Use Google's tool
3. **Page Speed Test:** Check loading times
4. **SSL Check:** Verify HTTPS is working

## 📁 File Structure for cPanel

### Root Directory (public_html/)
```
index.html                    ← Homepage
google-my-business-landing.html ← GMB landing page
land-for-sale.html           ← Properties listing
contact.html                 ← Contact page
book-visit.html              ← Site visit booking
styles.css                   ← Main stylesheet
script.js                    ← Main JavaScript
.htaccess                    ← Apache configuration (CRITICAL!)
robots.txt                   ← Search engine instructions
sitemap.xml                  ← Site structure
```

### Subdirectories
```
about/                       ← About pages
├── who-we-are.html
├── why-us.html
├── our-team.html
├── csr.html
└── our-partners.html

insider/                     ← Content pages
├── blogs.html
├── news.html
├── market-research.html
└── posts/                   ← Individual articles
    ├── blogs/
    ├── news/
    └── research/

properties/                  ← Property listings
├── bofa-phase-9-extension.html
├── bofa-platinum-estate.html
├── chumani-phase-3.html
├── chumani-phase-6.html
├── kikambala-gardens-phase-2.html
├── malindi-airport-view-gardens.html
├── mida-park-view-phase-2.html
├── msabaha-phase-6.html
├── mtondia-highway-gardens.html
└── ocean-view-gardens.html

testimonials/                ← Client testimonials
└── client-testimonials.html
```

## ⚠️ Important Notes

### Critical Files
- **.htaccess** - Must be uploaded for clean URLs and performance
- **index.html** - Your homepage
- **sitemap.xml** - For search engines

### Performance Features Included
- Gzip compression
- Browser caching
- Security headers
- Clean URLs (removes .html extension)
- HTTPS redirect
- Mobile optimization

### SEO Features Ready
- Optimized meta tags
- Structured data (Schema.org)
- Local SEO optimization
- Google My Business integration
- Mobile-responsive design

## 🔍 Troubleshooting

### Common Issues
1. **404 Errors:** Check .htaccess file is uploaded
2. **CSS Not Loading:** Check file permissions (644)
3. **Images Not Showing:** Check file paths and permissions
4. **SSL Issues:** Wait 10-15 minutes after enabling

### Support
- **Phone:** +254 711 082 084
- **Email:** info@inukaproperties.co.ke
- **Domain:** inukaproperties.co.ke

## ✅ Success Checklist

After deployment, verify:
- [ ] Website loads at https://inukaproperties.co.ke
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Contact forms work
- [ ] Search functionality works
- [ ] SSL certificate active
- [ ] Google My Business landing page accessible
- [ ] All images load correctly
- [ ] Clean URLs work (no .html in address bar)

Your website is now live and optimized for search engines! 🎉
