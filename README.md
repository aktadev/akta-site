# AKTA Website

This is the official website for the AKTA project, a secure trust framework for AI agents.

## About

The AKTA website is a static site built with HTML, CSS, and JavaScript, designed to be hosted on GitHub Pages. It provides information about the AKTA project, its core concepts, use cases, and how to get involved.

## Features

- Responsive design for desktop and mobile
- Smooth scroll navigation
- Dark mode toggle
- Section animations on scroll
- Mobile-friendly navigation

## Local Development

To run the site locally, simply clone the repository and open the `index.html` file in your browser:

```bash
git clone https://github.com/akta-site.git
cd akta-site
```

You can also use a local development server like Python's built-in HTTP server:

```bash
python -m http.server
```

Then visit `http://localhost:8000` in your browser.

## Deployment to GitHub Pages

To deploy this site to GitHub Pages:

1. Push the code to your GitHub repository:

```bash
git add .
git commit -m "Initial website commit"
git push origin main
```

2. Go to your repository on GitHub
3. Navigate to Settings > Pages
4. Under "Source", select the branch you want to deploy (usually `main`)
5. Select the root folder as the source directory
6. Click "Save"

GitHub will provide you with a URL where your site is published (usually `https://username.github.io/akta-site/`).

## Customization

- **GitHub Links**: Update all GitHub repository links in the HTML files to point to your actual repository.
- **Content**: Modify the content in `index.html` to reflect any changes or updates to the project.
- **Styling**: Adjust the styles in `styles.css` to match your preferred color scheme or design.
- **Documentation**: Update the quick start guide and other documentation in the `docs` folder.

## Structure

- `index.html` - Main website HTML
- `styles.css` - CSS styles
- `main.js` - JavaScript functionality
- `docs/` - Documentation files
  - `quick_start.md` - Quick start guide

## License

This website is released under the MIT License. See the LICENSE file for details. 