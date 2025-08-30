# 🗺️ Google MyMaps KML Extractor

A beautiful, responsive Vue.js application for extracting KML and GPX files from Google MyMaps with internationalization support for English and Russian.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## ✨ Features

- 🎨 **Beautiful UI** - Modern, responsive design built with Tailwind CSS
- 🌍 **Multi-language** - Support for English and Russian (i18n)
- 📱 **Mobile-friendly** - Fully responsive design for all devices
- 🔗 **Smart URL parsing** - Automatically extracts map IDs from various Google MyMaps URL formats
- 📥 **Multiple formats** - Download both KMZ (compressed) and KML (uncompressed) formats
- ⚡ **Fast & lightweight** - Built with Vue 3 and Vite
- 🐳 **Docker ready** - Easy deployment with Docker Compose

## 🚀 Quick Start

### Development

```bash
# Clone the repository
git clone <repository-url>
cd gmaps-kml-extractor

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Production (Docker)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

The application will be available at `http://localhost:3000`

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Styling**: Tailwind CSS
- **Internationalization**: Vue I18n
- **Build Tool**: Vite
- **Production Server**: Nginx
- **Containerization**: Docker & Docker Compose

## 📖 Usage

1. **Paste a Google MyMaps URL** into the input field
2. **Validate the URL** - The app will automatically detect if it's a valid Google MyMaps link
3. **Extract KML files** - Click the extract button to generate download links
4. **Download your files** - Choose between KMZ (recommended) or KML format

### Supported URL Formats

The application supports various Google MyMaps URL formats:

- **Edit URLs**: `https://www.google.com/maps/d/u/0/edit?hl=en&mid=1tWCq...`
- **Viewer URLs**: `https://www.google.com/maps/d/u/0/viewer?mid=1-g8E...`
- **Embed URLs**: `https://www.google.com/maps/d/u/0/embed?mid=1-g8E...`

## 🌐 Internationalization

The app supports two languages:
- **English** (default)
- **Russian** (Русский)

Switch between languages using the language toggle in the header.

## 📁 Project Structure

```
├── src/
│   ├── components/           # Vue components
│   ├── locales/             # i18n translation files
│   │   ├── en.json          # English translations
│   │   └── ru.json          # Russian translations
│   ├── App.vue              # Main application component
│   ├── main.js              # Application entry point
│   └── style.css            # Global styles with Tailwind
├── public/                  # Static assets
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile              # Production Docker image
├── nginx.conf              # Nginx configuration for production
├── package.json            # Node.js dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

## 🐳 Docker Deployment

### Development
```bash
# Run development server with hot reload
docker-compose up dev
```

### Production
```bash
# Build and serve production version
docker-compose up app
```

The production build:
- Optimizes and minifies all assets
- Serves files through Nginx with compression
- Includes proper caching headers
- Supports SPA routing

## 🎨 Customization

### Styling
The app uses Tailwind CSS with custom components defined in `src/style.css`. Key classes:
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary buttons  
- `.input-field` - Form input styling
- `.card` - Card container styling

### Adding Languages
1. Create a new JSON file in `src/locales/` (e.g., `fr.json`)
2. Add translations following the existing structure
3. Import and register the locale in `src/main.js`

### Color Scheme
Customize the color palette in `tailwind.config.js` under the `colors.primary` section.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you encounter any issues or have questions, please [open an issue](https://github.com/your-username/gmaps-kml-extractor/issues) on GitHub.

---

Made with ❤️ using Vue.js and Tailwind CSS