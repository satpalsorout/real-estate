# Faridabad Property

A modern, professional React-based website for Jaideep Real Estate, specializing in property sales, purchases, rentals, and investments in Faridabad, Haryana.

## Features

### 🏠 Property Management
- Display featured properties with images, details, and pricing
- Admin panel for adding/viewing properties (secured with login)
- Properties stored locally with localStorage for persistence

### 🔐 Admin Features
- Secure login system (username: admin, password: faridabad123)
- Add new properties with comprehensive details
- View and manage existing properties
- Admin menu hidden for public users

### 🌙 User Experience
- Light/Dark mode toggle
- Responsive design for all devices
- Smooth scrolling navigation
- Professional UI with Font Awesome icons

### 🤖 Chatbot
- Free chatbot widget with basic property inquiries
- Automated responses for common questions

### 📱 SEO Optimized
- Meta tags for search engines
- Semantic HTML structure
- Fast loading with optimized images

### 📍 Location Integration
- Google Maps integration for property locations
- Contact information with clickable WhatsApp link
- Office address and location details

## Tech Stack

- **Frontend**: React 19
- **Styling**: CSS3 with custom variables for theming
- **Icons**: Font Awesome (free version)
- **Routing**: Single-page application with state management
- **Deployment**: GitHub Actions with FTP deployment
- **Build Tool**: Create React App

## Project Structure

```
real-estate/
├── public/
│   ├── index.html
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Home.js
│   │   ├── Footer.js
│   │   ├── Admin.js
│   │   ├── Login.js
│   │   └── Chatbot.js
│   ├── context/
│   │   └── ThemeContext.js
│   ├── data/
│   │   ├── dealerConfig.json
│   │   ├── properties.json
│   │   └── seoText.json
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/faridabad-property.git
cd faridabad-property
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Configuration

### Dealer Information
Edit `src/data/dealerConfig.json` to customize:
- Company details
- Contact information
- Theme settings
- Admin credentials
- Social media links

### Properties
Edit `src/data/properties.json` to add or modify property listings.

### SEO Settings
Update `src/data/seoText.json` for page-specific meta tags and descriptions.

## Deployment

### Automatic Deployment (GitHub Actions)
1. Push code to the `main` branch
2. GitHub Actions will automatically:
   - Install dependencies
   - Build the project
   - Deploy to FTP server

### Manual Deployment
```bash
npm run build
# Upload the build/ directory contents to your web server
```

## Admin Access

- **Username**: admin
- **Password**: faridabad123

To change admin credentials, edit `src/data/dealerConfig.json`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to Jaideep Real Estate.

## Contact

**Jaideep Real Estate**
- Address: Jaideep Real Estate sector 65 Faridabad 121004, HR, India
- Phone: 99990 68444
- Email: Jaideeppanwar2046@gmail.com
- WhatsApp: [Click to chat](https://wa.me/9999068444)

---

Built with ❤️ for the Faridabad real estate community
