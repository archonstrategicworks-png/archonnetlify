# Archon Strategic Works — Master Deployment Manual

**Architecture:** Hybrid
1.  **Public Site (Root):** WordPress (Marketing, SEO, Content)
2.  **Internal System (/estimate):** React + Vite (The Application)

---

## Phase 1: cPanel Preparation

1.  **Login to cPanel.**
2.  **SSL Certificate (Crucial):**
    *   Go to **SSL/TLS Status** (or "Let's Encrypt").
    *   Select your domain (`archonstrategicworks.com`) and click **Run AutoSSL**.
    *   Ensure the lock icon appears next to the domain.
3.  **Create Email Account (SMTP):**
    *   Go to **Email Accounts** -> **Create**.
    *   Username: `info` (results in `info@archonstrategicworks.com`).
    *   Password: Generate a strong password and **SAVE IT**.
    *   After creation, click **Connect Devices** to see your SMTP details (Host, Port, SSL/TLS). You will need these later.

---

## Phase 2: Public Site Setup (WordPress)

1.  **Install WordPress:**
    *   In cPanel, find **Softaculous Apps Installer** or **WordPress Manager**.
    *   Click **Install**.
    *   **Protocol:** `https://`
    *   **Domain:** `archonstrategicworks.com`
    *   **In Directory:** Leave this **BLANK** (empty). We want WP at the root.
    *   Complete the admin username/password setup and install.
2.  **Verify:** Visit your domain. You should see the default WordPress site.

---

## Phase 3: EstiMate™ System Deployment (The React App)

We will deploy the React application to a subdirectory named `/estimate`.

### Method A: Manual Deployment (Beginner Friendly)

**1. Prepare the Build Locally:**
   *   Open your project in VS Code.
   *   *Important:* Ensure your `vite.config.ts` has the base path set correctly (if you haven't, add `base: '/estimate/',` to the config object).
   *   Run the build command:
     ```bash
     npm run build
     ```
   *   This creates a `dist` folder.

**2. Upload to cPanel:**
   *   Go to **cPanel** -> **File Manager**.
   *   Navigate to `public_html`.
   *   **Create Folder:** Name it `estimate`.
   *   Open the `estimate` folder.
   *   Click **Upload**.
   *   Drag and drop all files **inside** your local `dist` folder (index.html, assets, etc.) into this upload window.
   *   **Extract/Move:** If you uploaded a zip, extract it here. Ensure `index.html` is directly inside `public_html/estimate`.

**3. Configure Routing (.htaccess):**
   *   In File Manager (inside `public_html/estimate`), ensure "Show Hidden Files" is enabled in Settings (top right).
   *   Create a **New File** named `.htaccess`.
   *   Paste the following code (This prevents 404 errors when refreshing pages like `/estimate/projects`):

     ```apache
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /estimate/
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /estimate/index.html [L]
     </IfModule>
     ```

---

## Phase 4: Automated Deployment (GitHub Actions)

This method automatically updates the `/estimate` app when you push code to GitHub.

1.  **Get FTP Credentials:**
    *   Host: `ftp.archonstrategicworks.com` (or your Server IP).
    *   User: Your cPanel username.
    *   Pass: Your cPanel password.

2.  **Set GitHub Secrets:**
    *   Go to your GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions**.
    *   Add: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

3.  **Create Workflow File:**
    *   Create `.github/workflows/deploy.yml` in your project.

     ```yaml
     name: Deploy EstiMate System

     on:
       push:
         branches: [ main ]

     jobs:
       deploy:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - uses: actions/setup-node@v3
             with:
               node-version: 18

           - name: Install & Build
             run: |
               npm install
               npm run build

           - name: Deploy to cPanel (Estimate Folder)
             uses: SamKirkland/FTP-Deploy-Action@v4.3.4
             with:
               server: ${{ secrets.FTP_SERVER }}
               username: ${{ secrets.FTP_USERNAME }}
               password: ${{ secrets.FTP_PASSWORD }}
               local-dir: ./dist/
               server-dir: /public_html/estimate/
     ```

---

## Phase 5: Verification Checklist

1.  **Main Site:** `https://archonstrategicworks.com` loads WordPress.
2.  **App Login:** `https://archonstrategicworks.com/estimate` loads the Archon login screen.
3.  **Routing:** Log in, go to "Projects", then **refresh the page**. It should stay on the Projects page (thanks to the .htaccess).
4.  **Security:** Both URLs show the Lock icon (HTTPS).

## Troubleshooting

*   **White Screen on /estimate:**
    *   Check `index.html` source. Do script tags look like `/assets/index.js`? They should look like `/estimate/assets/index.js`.
    *   **Fix:** Add `base: '/estimate/',` to `vite.config.ts` and rebuild.
*   **404 on Refresh:**
    *   The `.htaccess` file is missing or incorrect in the `estimate` folder.
*   **Permissions Error:**
    *   Ensure the `estimate` folder permissions are `755` and files are `644`.
