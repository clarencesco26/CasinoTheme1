# 🎰 Casino Mobile - Neon Style Vue 3 Project

## ✅ Project Setup Complete!

This is a fully converted Vue 3 + TypeScript + TSX project with a neon/retro arcade casino theme.

### 🚀 Running the Project

The dev server is running at: **http://localhost:5173/**

To restart the server:
```bash
cd casino-mobile
npm run dev
```

### 📁 Project Structure

```
casino-mobile/
├── src/
│   ├── components/
│   │   ├── casino/
│   │   │   ├── CasinoCard.tsx       - Individual casino game card with neon effects
│   │   │   ├── RetroGrid.tsx        - Animated retro grid background
│   │   │   └── PixelSparkles.tsx    - Floating pixel sparkle effects
│   │   │
│   │   └── ui/
│   │       ├── NeonHeader.tsx       - Header with navigation and logo
│   │       ├── NeonSearchBar.tsx    - Search bar with neon glow effects
│   │       ├── PixelButton.tsx      - Reusable button with 8-bit style
│   │       └── UserProfile.tsx      - RPG-style user profile component
│   │
│   ├── styles/
│   │   └── base.css                 - Tailwind + custom neon animations
│   │
│   ├── App.tsx                      - Main app component (combines all sections)
│   └── main.ts                      - Entry point
│
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

### 🎨 Features Included

- **Retro Grid Background** - Animated 80s-style grid floor
- **Neon Text Effects** - Glowing neon text with chromatic aberration
- **Pixel Sparkles** - Floating animated sparkles
- **Casino Cards** - 6 casino cards with ratings and features
- **Search Functionality** - Filter casinos in real-time
- **User Profile** - RPG-style profile with XP bar and credits
- **Responsive Design** - Mobile-first approach
- **Scanline Effects** - CRT monitor simulation
- **Custom Animations** - Flicker, pulse, float effects

### 🎮 Casino Cards Data

The app includes 6 pre-configured casino cards:
1. NEON VEGAS (Pink)
2. CYBER SLOTS (Cyan)
3. RETRO BET (Purple)
4. PIXEL PALACE (Cyan)
5. SYNTH SPIN (Pink)
6. VAPOR WIN (Purple)

### 🛠️ Technologies Used

- **Vue 3** - Composition API with TSX
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Lucide Vue Next** - Icon library
- **Custom CSS Animations** - Neon, scanline, and retro effects

### 📝 Component Breakdown

#### Background Components
- `RetroGrid.tsx` - Creates the retro grid floor with sun
- `PixelSparkles.tsx` - Generates floating sparkle particles

#### UI Components
- `NeonHeader.tsx` - Logo, navigation tabs, and user profile
- `UserProfile.tsx` - User avatar, level, XP bar, and credits
- `NeonSearchBar.tsx` - Glowing search input with corner accents
- `PixelButton.tsx` - Reusable button with 3 color variants (pink, cyan, purple)

#### Casino Components
- `CasinoCard.tsx` - Individual casino with bonus info, features, rating, and CTA

### 🎨 Custom Fonts

The project uses Google Fonts:
- **Press Start 2P** - For pixel/retro headings
- **VT323** - For terminal-style body text

### 🔧 Customization

To modify casino data, edit the `casinos` array in [src/App.tsx](src/App.tsx#L28-L59)

To add new color variants, update the `colorMap` in [src/components/casino/CasinoCard.tsx](src/components/casino/CasinoCard.tsx#L37-L41)

### 🎯 Key Differences from React Version

1. ✅ Replaced `React.useState` with `ref()` and `computed()`
2. ✅ Replaced `interface Props` with Vue `props` definition
3. ✅ Replaced `lucide-react` with `lucide-vue-next`
4. ✅ Used Vue 3 TSX syntax with `defineComponent()`
5. ✅ Replaced `onClick` with `onFocus`, `onBlur`, `onInput` Vue events
6. ✅ Used `v-model` pattern for form handling
7. ✅ Replaced `className` with `class`

### 📦 Dependencies Installed

```json
{
  "dependencies": {
    "vue": "^3.x",
    "lucide-vue-next": "latest"
  },
  "devDependencies": {
    "tailwindcss": "3.4.17",
    "autoprefixer": "latest",
    "postcss": "latest",
    "typescript": "^5.x",
    "vite": "^5.x"
  }
}
```

## 🎉 Ready to Develop!

Your neon-style casino mobile website is ready! Open http://localhost:5173/ to see it in action! 🚀
