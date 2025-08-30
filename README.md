# 🗺️ Google My Maps KML/KMZ Extractor

A beautiful, lightweight and responsive Vue.js application for downloading KML and KMZ files from Google My Maps.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## ✨ Features

- 🎨 **Beautiful UI** - Modern, responsive design built with Tailwind CSS
- 🌍 **Multi-language** - Support for English and Russian (i18n)
- 📱 **Mobile-friendly** - Fully responsive design for all devices
- 🔗 **Smart URL parsing** - Automatically extracts map IDs either from various Google My Maps or from a custom page
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
docker-compose up -d --build
```

The application will be available at `http://localhost:8001`


## 📖 Usage

1. **Paste an URL** into the input field
2. **Validate the URL** - The app will automatically detect whether it's a valid Google My Maps link or a custom URL
3. **Extract KML/KMZ files** - Click the extract button to generate download links
3. (optional) - **Extract maps from the page** - in case of custom URL, the page will be downloaded and parsed directly on device
4. **Download your files** - Choose between KML or KMZ formats

### Supported URL Formats

The application supports various Google My Maps URL formats:

- **Edit URLs**: `https://www.google.com/maps/d/u/0/edit?hl=en&mid=1tWCq...`
- **Viewer URLs**: `https://www.google.com/maps/d/u/0/viewer?mid=1-g8E...`
- **Embed URLs**: `https://www.google.com/maps/d/u/0/embed?mid=1-g8E...`

## 🌐 Internationalization

The app supports two languages:
- **English** (default)
- **Russian** (Русский)

Switch between languages using the language toggle in the header.



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you encounter any issues or have questions, please [open an issue](https://github.com/okainov/gmaps-kml-extractor/issues) on GitHub.

---

Made with ❤️ using Vue.js and Tailwind CSS