# 3-Stage Popup Modal System

## Overview
A session-based, sequential popup flow system designed for mobile-first casino websites. The system displays three distinct popup stages in strict order, appearing only once per browser session.

## Popup Flow

```
Site Opens
    ↓
Popup #1: First Carousel (popups.first)
    ↓ [User closes]
Popup #2: Big Single Image (popups.bigSingle)
    ↓ [User closes]
Popup #3: Second Carousel (popups.second)
    ↓ [User closes]
Normal Site Content
```

## Features

### Session Management
- **Single Session Display**: Popups appear only once per browser session
- **Session Storage**: Uses `sessionStorage` to track completion
- **Refresh Safe**: Reloading the page doesn't retrigger popups

### Popup Types

#### 1. Carousel Popup (First & Third)
- Displays up to 4 images
- Swipeable on touch devices
- Navigation buttons (left/right)
- Dot indicators
- **Image Ordering**:
  - `isPinned: true` images appear first
  - Remaining images are randomized

#### 2. Big Single Popup (Second)
- Displays ONE randomly selected image
- Larger aspect ratio (0.7 vs 1.5)
- Designed for prominent promotional content
- Multiple images can be configured, one is randomly chosen

### User Interactions
- **Close Button**: Top-right X button
- **Tap Outside**: Click/tap overlay to close
- **Swipe**: Touch gestures for carousel navigation
- **Image Click**: Opens `href` in new tab

### Design Features
- **Uniform Design**: All popups share consistent styling
- **Mobile-First**: Touch-optimized, responsive
- **Smooth Animations**: Fade-in, slide-up, scale effects
- **Background Blur**: Semi-transparent backdrop
- **Scroll Lock**: Body scroll disabled when popup is active

## Technical Implementation

### Files Structure
```
src/
├── components/ui/
│   └── PopupModal.tsx          # Reusable modal component
├── composables/
│   └── usePopupFlow.ts         # Flow management logic
└── App.tsx                     # Integration point
```

### Data Structure (site.json)

```json
{
  "success": true,
  "data": {
    "popups": {
      "first": [
        {
          "id": 1,
          "imageUrl": "https://example.com/image1.jpg",
          "href": "/promo1",
          "orderNum": 1,
          "isPinned": true
        }
      ],
      "bigSingle": [
        {
          "id": 3,
          "imageUrl": "https://example.com/big.jpg",
          "href": "/bigpromo",
          "orderNum": 1,
          "isPinned": false
        }
      ],
      "second": [
        {
          "id": 4,
          "imageUrl": "https://example.com/image4.jpg",
          "href": "/promo4",
          "orderNum": 1,
          "isPinned": false
        }
      ]
    }
  }
}
```

### Component Usage

```tsx
import PopupModal from './components/ui/PopupModal'
import { usePopupFlow } from './composables/usePopupFlow'

const {
  isPopupOpen,
  getCurrentPopupImages,
  getCurrentPopupType,
  handlePopupClose,
  initializePopupFlow
} = usePopupFlow()

// Initialize with data from API
onMounted(async () => {
  const data = await fetchSiteData()
  initializePopupFlow(data.popups)
})

// In template
<PopupModal
  images={getCurrentPopupImages()}
  type={getCurrentPopupType()}
  isOpen={isPopupOpen.value}
  onClose={handlePopupClose}
/>
```

## API Reference

### usePopupFlow Composable

#### Methods

**`initializePopupFlow(popupData)`**
- Initializes the popup flow with data
- Checks session storage
- Starts first popup if not completed

**`handlePopupClose()`**
- Closes current popup
- Advances to next stage
- Updates session storage

**`getCurrentPopupImages()`**
- Returns array of images for current stage
- Handles sorting (pinned first, then randomized)

**`getCurrentPopupType()`**
- Returns `'carousel'` or `'single'`
- Based on current stage

**`hasShownPopups()`**
- Checks if popups were shown this session
- Returns boolean

#### Properties

- `isPopupOpen`: Boolean ref for modal visibility
- `currentStage`: Current stage ('first', 'bigSingle', 'second', 'completed')

### PopupModal Component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `PopupImage[]` | required | Array of popup images |
| `type` | `'carousel' \| 'single'` | `'carousel'` | Display mode |
| `isOpen` | `Boolean` | `false` | Controls visibility |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | none | Emitted when user closes popup |

#### PopupImage Interface

```typescript
interface PopupImage {
  id: number
  imageUrl: string
  href: string
  orderNum: number
  isPinned: boolean
}
```

## Animations

### CSS Animations Added

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up-scale {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### Animation Timing
- **Fade-in**: 0.3s ease-out
- **Slide-up-scale**: 0.4s cubic-bezier
- **Between Popups**: 300ms delay for smooth transition

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch events for swipe gestures
- SessionStorage API required

## Customization

### Modify Order Logic

Edit `usePopupFlow.ts`:

```typescript
const stages: PopupStage[] = ['first', 'bigSingle', 'second', 'completed']
```

### Change Session Key

```typescript
const STORAGE_KEY = 'popup_flow_session'
```

### Adjust Carousel Limit

In `PopupModal.tsx`:

```typescript
return sortedImages.value.slice(0, 4) // Change from 4 to your limit
```

### Styling

All styles use CSS variables from the theme:
- `--color-bg-primary`
- `--color-bg-secondary`
- `--color-primary` (red)
- `--color-secondary` (blue)
- `--color-text-primary`

## Testing

### Manual Testing Checklist

- [ ] Popup #1 appears on first load
- [ ] Closing Popup #1 shows Popup #2
- [ ] Closing Popup #2 shows Popup #3
- [ ] Closing Popup #3 allows site access
- [ ] Refreshing page doesn't retrigger popups
- [ ] Swipe gestures work on mobile
- [ ] Image clicks open correct links
- [ ] Close button works
- [ ] Overlay click closes popup
- [ ] Body scroll is locked when popup is open

### Reset Session for Testing

```javascript
sessionStorage.removeItem('popup_flow_session')
location.reload()
```

## Performance Considerations

- Images are lazy-loaded by browser
- Smooth CSS transitions (GPU-accelerated)
- Minimal JavaScript overhead
- Session storage is lightweight
- Touch event handlers use passive listeners where appropriate

## Accessibility

- Close button has clear visual indicator
- Keyboard-friendly (ESC key support can be added)
- Touch targets are 44x44px minimum
- High contrast borders and text

## Future Enhancements

Potential improvements:
- ESC key to close
- Analytics tracking for each stage
- A/B testing support
- Video popup support
- Countdown timers
- Skip all option
- Analytics integration
