# 🎰 Casino Mobile View - Vite Project

A modern, mobile-first casino gaming interface built with React and Vite. This project provides a sleek, responsive casino experience optimized for mobile devices.

## ✨ Features

- 🎰 **Mobile-First Design**: Optimized for mobile devices with touch-friendly interfaces
- 🎨 **Casino Theme**: Beautiful gradient backgrounds with gold accents and casino-themed styling
- 🎮 **Interactive Game Cards**: Showcase popular casino games including Slots, Blackjack, Roulette, and more
- 💰 **Balance Display**: Real-time balance tracking with add chips functionality
- 📱 **Bottom Navigation**: Sticky bottom navigation for easy access to Casino, Live, Promos, and Profile sections
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and optimized production builds
- 🎯 **Touch Optimized**: Smooth animations and touch-friendly interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clarencesco26/CasinoTheme1.git
cd CasinoTheme1
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

## 🎨 Customization

### Color Scheme

The casino theme uses CSS custom properties defined in `src/index.css`:

- `--casino-dark`: #1a0a2e (Dark purple background)
- `--casino-purple`: #3d0f5c (Accent purple)
- `--casino-gold`: #ffd700 (Gold accents)
- `--casino-red`: #dc143c (Red accents)
- `--casino-accent`: #ff6b6b (Light accent)

### Adding Games

Edit `src/App.jsx` and modify the `games` array to add or remove games:

```javascript
const games = [
  { icon: '🎰', name: 'Slots', category: 'Slot Games' },
  // Add more games here
]
```

## 📱 Mobile Optimization

- Viewport configured for mobile devices (no zooming, fixed scale)
- Touch-action optimized for smooth interactions
- Responsive grid layout adapts to different screen sizes
- Bottom navigation for thumb-friendly access
- Backdrop blur effects for modern mobile UI

## 🛠️ Tech Stack

- **React 19.2** - UI library
- **Vite 7.2** - Build tool and development server
- **CSS3** - Modern styling with CSS custom properties
- **ESLint** - Code linting

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
