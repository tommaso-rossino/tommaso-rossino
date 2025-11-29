// Simple script to generate favicon.png from SVG
// Run with: node scripts/generate-favicon.js
// Or use an online SVG to PNG converter

const fs = require('fs');
const path = require('path');

console.log(`
To generate favicon.png, you can:

1. Use an online converter:
   - Go to https://convertio.co/svg-png/ or https://cloudconvert.com/svg-to-png
   - Upload public/favicon.svg
   - Download as PNG (512x512)
   - Save as public/favicon.png

2. Or use ImageMagick (if installed):
   convert -background none -size 512x512 public/favicon.svg public/favicon.png

3. Or use Inkscape (if installed):
   inkscape public/favicon.svg --export-filename=public/favicon.png --export-width=512 --export-height=512

The SVG favicon will work in modern browsers, but PNG is needed for older browsers and Apple touch icons.
`);

