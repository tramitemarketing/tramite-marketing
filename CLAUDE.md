# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tramite Marketing** - Landing page for a web marketing agency targeting small businesses in Italy.

- **Slogan:** "Pursuing Visibility"
- **Services:** Web development, SEO, Social Media, Branding
- **Brand colors:** Red (#E63946), White, Dark (#1A1A2E)
- **Language:** Italian

## Architecture

Single-page static website (`index.html`) with:
- Embedded CSS (no external stylesheets)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Plus Jakarta Sans)
- SVG icons (Heroicons)
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

To deploy: Upload `index.html` to any static hosting (Netlify, Vercel, GitHub Pages).

## Design Guidelines

- Professional, serious tone (not playful)
- No emojis in content
- Modern minimal aesthetic
- Mobile responsive (breakpoints at 768px, 900px, 1000px)

## Placeholders to Replace

- Hero image
- Team photos and bios
- Portfolio screenshots and real project data
- Client logos
- Testimonials with real quotes
- Phone number in contacts
