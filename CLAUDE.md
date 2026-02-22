# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tramite Marketing** - Landing page for a web marketing agency targeting small businesses in Italy.

- **Slogan:** "Pursuing Visibility"
- **Services:** Web development, SEO, Social Media, Branding
- **Brand colors:** Red (#E63946), White, Dark (#1A1A2E)
- **Language:** Italian

## Architecture

Single-page static website with:
- `index.html` - Main HTML structure
- `styles.css` - All styles with CSS variables
- `main.js` - Vanilla JavaScript (menu, animations, form validation, cookies)
- `privacy-policy.html` - Privacy policy page
- `robots.txt` - Search engine directives
- `sitemap.xml` - Sitemap for SEO

External dependencies:
- Google Fonts (Plus Jakarta Sans)
- SVG icons (Heroicons inline)
- Formspree integration for contact form (`mdagdopv`)

## Sections

1. Hero with stats
2. Services (4 cards)
3. Portfolio (case studies with results)
4. Testimonials
5. Team ("Chi Siamo")
6. Clients (logo grid)
7. Why Us ("Perché Noi")
8. Quote form (connected to Formspree)
9. Contact info

## Development

No build process required. Open `index.html` directly in browser.

To deploy: Upload all files to any static hosting (Netlify, Vercel, GitHub Pages).

## Design Guidelines

- Professional, serious tone (not playful)
- No emojis in content
- Modern minimal aesthetic
- Mobile responsive (breakpoints at 768px, 900px, 1000px)

## TODO - Content to Add

### Images (required)
- [ ] `og-image.jpg` (1200x630px) - Social sharing image
- [ ] Hero image or mockup
- [ ] Team photos (3 members)
- [ ] Portfolio screenshots (3 projects)
- [ ] Client logos (5 logos)
- [ ] Testimonial avatars (3 clients)

### Content (required)
- [ ] Real team names and bios
- [ ] Real portfolio projects with actual results
- [ ] Real client testimonials
- [ ] Real client company names/logos

### Legal (required)
- [ ] P.IVA in footer (currently placeholder)
- [ ] Phone number in contacts

### Social (update URLs when available)
- [ ] Instagram URL (currently placeholder: instagram.com/tramitemarketing)
- [ ] LinkedIn URL (currently placeholder: linkedin.com/company/tramitemarketing)
- [ ] Facebook URL (currently placeholder: facebook.com/tramitemarketing)

## SEO Checklist

- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Schema.org JSON-LD
- [x] Canonical URL
- [x] Hreflang tags
- [x] robots.txt
- [x] sitemap.xml
- [ ] og-image.jpg (to create)
- [ ] Google Analytics (code ready, needs ID)
