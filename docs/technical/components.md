# Component Library

This document provides detailed information about the Svelte components used in the Tailspin Toys application.

## Overview

Our component library follows modern web development patterns with:
- **Reactive Svelte components** for interactive functionality
- **TypeScript interfaces** for type safety
- **Tailwind CSS** for consistent styling
- **Dark mode theme** throughout the application
- **Storybook documentation** for component exploration

## Components

### GameList.svelte

**Purpose**: Displays a grid of games with loading, error, and empty states.

**Location**: `src/components/GameList.svelte`

#### Props
```typescript
interface Props {
  games?: Game[];
}

interface Game {
  id: number;
  title: string;
  description: string;
  publisher_name?: string;
  category_name?: string;
}
```

#### Features
- **Loading Animation**: Skeleton cards while fetching data
- **Error Handling**: User-friendly error messages
- **Empty State**: Message when no games are available
- **Responsive Grid**: Adapts from 1 to 3 columns based on screen size
- **Hover Effects**: Interactive card animations
- **Accessibility**: Proper ARIA labels and semantic HTML

#### Usage
```svelte
<script>
  import GameList from './components/GameList.svelte';
  
  let games = []; // Will be populated by API call
</script>

<GameList {games} />
```

#### Storybook Stories
- Default (with mock games)
- Empty State
- Loading State
- Single Game
- Many Games

### GameDetails.svelte

**Purpose**: Shows detailed information for a single game.

**Location**: `src/components/GameDetails.svelte`

#### Props
```typescript
interface Props {
  game?: Game;      // Direct game object
  gameId?: number;  // Game ID to fetch
}

interface Game {
  id: number;
  title: string;
  description: string;
  publisher: {
    id: number;
    name: string;
  } | null;
  category: {
    id: number;
    name: string;
  } | null;
  starRating: number | null;
}
```

#### Features
- **Flexible Loading**: Accepts game object or fetches by ID
- **Star Rating Display**: Visual star representation
- **Category/Publisher Tags**: Color-coded badges
- **Loading/Error States**: Skeleton and error UI
- **Action Button**: Support/funding call-to-action

#### Usage
```svelte
<!-- With game object -->
<GameDetails {game} />

<!-- With game ID (will fetch from API) -->
<GameDetails gameId={1} />
```

#### Star Rating Function
```javascript
function renderStarRating(rating: number | null): string {
  if (rating === null) return "Not yet rated";
  
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}
```

#### Storybook Stories
- Full Details (with rating and all fields)
- Without Rating
- Minimal Details (no publisher/category)
- Loading State
- Error State
- High Rating (5 stars)
- Low Rating (1.5 stars)

### HeaderSvelte.svelte

**Purpose**: Application header with navigation menu.

**Location**: `src/components/HeaderSvelte.svelte`

#### Props
```typescript
interface Props {
  title?: string;      // Site title (default: "Tailspin Toys")
  homeUrl?: string;    // Home link URL (default: "/")
  showAbout?: boolean; // Show about menu item (default: true)
}
```

#### Features
- **Hamburger Menu**: Mobile-friendly navigation
- **Click Outside**: Closes menu when clicking elsewhere
- **Customizable Links**: Configurable title and URLs
- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode**: Consistent with application theme

#### Usage
```svelte
<HeaderSvelte 
  title="My Custom Site"
  homeUrl="/dashboard"
  showAbout={false}
/>
```

#### Storybook Stories
- Default (standard configuration)
- Custom Title
- Without About Link
- Custom Home URL
- Long Title (responsive test)

## Design System

### Color Palette

Our components use a consistent color system based on Tailwind CSS:

```css
/* Primary Colors (Blue theme) */
bg-blue-500, bg-blue-600, bg-blue-700
text-blue-300, text-blue-400

/* Background (Dark theme) */
bg-slate-800, bg-slate-900
text-slate-100, text-slate-300, text-slate-400

/* Accent Colors */
bg-purple-600 (secondary actions)
text-purple-300 (publisher tags)

/* Interactive States */
hover:bg-blue-500 (buttons)
hover:border-blue-500 (cards)
hover:translate-y-[-6px] (card lift effect)
```

### Typography

```css
/* Headings */
text-3xl font-bold    /* Page titles */
text-2xl font-medium  /* Section headers */
text-xl font-semibold /* Card titles */

/* Body Text */
text-sm, text-base    /* Regular content */
text-xs font-medium   /* Tags and labels */
```

### Spacing & Layout

```css
/* Container */
container mx-auto     /* Centered content */
px-4, px-6, px-8     /* Horizontal padding */

/* Grid Systems */
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
gap-6                /* Grid spacing */

/* Card Padding */
p-6                  /* Standard card padding */
```

## Component Patterns

### Error Handling Pattern
```svelte
{#if loading}
  <!-- Skeleton UI -->
{:else if error}
  <!-- Error message -->
{:else if data.length === 0}
  <!-- Empty state -->
{:else}
  <!-- Content -->
{/if}
```

### API Integration Pattern
```svelte
<script>
  let data = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/endpoint');
      if (response.ok) {
        data = await response.json();
      } else {
        error = `Failed: ${response.status}`;
      }
    } catch (err) {
      error = `Error: ${err.message}`;
    } finally {
      loading = false;
    }
  });
</script>
```

### Responsive Design Pattern
```css
/* Mobile first approach */
class="block sm:hidden"          /* Show on mobile only */
class="hidden sm:block"          /* Hide on mobile */
class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" /* Responsive grid */
```

## Testing Components

### Unit Testing
Components are tested through E2E tests using Playwright. Key test patterns:

```javascript
// Test component rendering
await expect(page.getByTestId('game-card')).toBeVisible();

// Test interactive elements
await page.getByTestId('menu-toggle').click();
await expect(page.getByTestId('menu')).toBeVisible();

// Test data attributes
const gameCard = page.getByTestId('game-card').first();
await expect(gameCard).toHaveAttribute('data-game-id', '1');
```

### Storybook Testing
Use Storybook to:
1. **Visual Testing**: Verify component appearance
2. **Prop Testing**: Test different prop combinations
3. **State Testing**: Verify loading, error, and success states
4. **Responsive Testing**: Check mobile and desktop layouts

## Best Practices

### Component Design
1. **Single Responsibility**: Each component has one clear purpose
2. **Props Interface**: Always define TypeScript interfaces
3. **Default Values**: Provide sensible defaults for optional props
4. **Error Boundaries**: Handle loading and error states gracefully

### Styling Guidelines
1. **Tailwind First**: Use utility classes over custom CSS
2. **Dark Mode**: All components support dark theme
3. **Responsive**: Mobile-first responsive design
4. **Accessibility**: Include proper ARIA labels and semantic HTML

### Performance
1. **Lazy Loading**: Use dynamic imports for large components
2. **Minimal Dependencies**: Avoid unnecessary external libraries
3. **Event Cleanup**: Remove event listeners in component cleanup
4. **Efficient Updates**: Use Svelte's reactive statements appropriately

## Future Enhancements

Planned component improvements:
- **Form Components**: Input, Select, Button components
- **Modal System**: Reusable modal/dialog components  
- **Loading System**: Global loading state management
- **Toast Notifications**: User feedback system
- **Data Tables**: Sortable, filterable data display