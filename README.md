# 📦 BoxGen V2 - Professional Box Pattern Generator

Professional box dieline generator for paper and cardboard packaging. Create custom patterns with multiple styles, advanced parameters, 3D preview, and export to SVG/PDF.

![BoxGen V2](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### Box Styles
- **Tuck Top** - Classic tuck closure with dust flaps
- **Snap Lock Bottom** - 1-2-3 interlocking mechanism (stronger)
- **Pillow Box** - Curved ends, ideal for gifts

### Advanced Customization
- **Custom Parameters** - Flap height, tab width, corner radius, tolerances
- **Units Toggle** - Switch between mm and inches
- **Print Marks** - Professional crop marks and registration marks
- **Template System** - Save, load, export, and import favorite designs

### Export & Preview
- **SVG Export** - Vector format perfect for laser cutting
- **PDF Export** - Professional print-ready files
- **3D Preview** - Interactive Three.js visualization
- **Live Preview** - See changes in real-time

## 🚀 Quick Start

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/FlowloCreative/BoxGen-V2.git
cd BoxGen-V2

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Visit `http://localhost:5173` to see the app.

### Build & Deploy

\`\`\`bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
\`\`\`

## 📝 Usage Guide

1. **Select Box Style** - Choose from tuck top, snap lock, or pillow box
2. **Choose Units** - Toggle between mm and inches
3. **Enter Dimensions** - Length, width, height, material thickness
4. **Adjust Parameters** - Fine-tune flaps, tabs, corners, and tolerances using sliders
5. **Toggle Options** - Enable print marks or 3D preview
6. **Generate** - Click "Generate Dieline" to create your pattern
7. **Export** - Download as SVG or PDF for production

## 🛠️ Tech Stack

- **React 18.3** - Modern UI framework
- **Vite 6.0** - Lightning-fast build tool
- **Three.js** - 3D visualization via @react-three/fiber
- **jsPDF** - PDF export functionality
- **svg2pdf.js** - SVG to PDF conversion

## 📦 Project Structure

\`\`\`
BoxGen-V2/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions for auto-deploy
├── src/
│   ├── components/
│   │   ├── AdvancedParams.jsx  # Custom parameters UI
│   │   ├── Box3DPreview.jsx    # Three.js 3D preview
│   │   ├── BoxForm.jsx         # Dimension input form
│   │   ├── DownloadButtons.jsx # SVG/PDF export
│   │   ├── StyleSelector.jsx   # Box style picker
│   │   ├── SVGPreview.jsx      # 2D dieline preview
│   │   ├── TemplateManager.jsx # Save/load templates
│   │   └── UnitsToggle.jsx     # mm/inch switcher
│   ├── hooks/
│   │   └── useLocalStorage.js  # localStorage hook
│   ├── utils/
│   │   ├── boxGenerators/
│   │   │   ├── index.js        # Main generator
│   │   │   ├── pillowBox.js    # Pillow box logic
│   │   │   ├── snapLock.js     # Snap lock logic
│   │   │   └── tuckTop.js      # Tuck top logic
│   │   ├── pdfExport.js        # PDF generation
│   │   ├── printMarks.js       # Crop/registration marks
│   │   ├── svgGenerator.js     # SVG creation
│   │   ├── templateStorage.js  # Template management
│   │   └── unitConverter.js    # mm/inch conversion
│   ├── App.css                 # Main styles
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.jsx                # App entry point
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML template
├── package.json                # Dependencies
├── README.md                   # This file
└── vite.config.js              # Vite configuration
\`\`\`

## 🎨 Customization

### Adding New Box Styles

Create a new generator in `src/utils/boxGenerators/`:

\`\`\`javascript
export function generateMyCustomBox(length, width, height, thickness, unit, params) {
  // Your box generation logic here
  return {
    path: 'SVG path data',
    foldLines: [...],
    dimensions: { width, height },
    style: 'My Custom Box'
  }
}
\`\`\`

Then register it in `src/utils/boxGenerators/index.js`.

### Modifying Parameters

Edit `src/components/AdvancedParams.jsx` to add new sliders and controls:

\`\`\`jsx
<Slider
  label="My Parameter"
  value={params.myParam || 10}
  onChange={(v) => onChange('myParam', v)}
  min={5}
  max={50}
  unit="mm"
  help="Description of parameter"
/>
\`\`\`

## 🌐 Live Demo

Visit the live app: [https://flowlocreative.github.io/BoxGen-V2/](https://flowlocreative.github.io/BoxGen-V2/)

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a Pull Request

## 🐛 Bug Reports

Found a bug? Please open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 🙏 Credits

Built with inspiration from:
- [Boxes.py](https://github.com/florianfesti/boxes) - Comprehensive box generator
- [Templatemaker.nl](https://www.templatemaker.nl/) - Packaging templates
- Packaging design community

## 📧 Contact

**Flowlo Creative Solution**
- GitHub: [@FlowloCreative](https://github.com/FlowloCreative)
- Project: [BoxGen-V2](https://github.com/FlowloCreative/BoxGen-V2)

---

⭐ **Star this repo if you find it useful!**

Built with ❤️ for the packaging design community by Flowlo Creative Solution
