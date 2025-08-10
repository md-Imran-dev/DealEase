# DealEase Theme System

This comprehensive theme system provides a consistent color palette and styling approach for the DealEase application using Material-UI (MUI) with support for both light and dark modes.

## Color Palette

### Primary Colors

- **Primary Dark (Royal Blue):** `#0A2463` - Used for headers and important elements
- **Primary (Celestial Blue):** `#3E92CC` - Main brand color for buttons and links
- **Primary Light:** `#7DC6E6` - Tint of Celestial Blue for hover states

### Background Colors

- **Background (Ghost White):** `#FFFAFF` - Main page background
- **Surface/Card Background:** `#FFFFFF` - Pure white for cards and surfaces

### Accent Colors

- **Accent (Cerise):** `#D8315B` - Bold accent for CTAs and important highlights
- **Accent Light:** `#F57A95` - Tint of Cerise for hover states

### Text Colors

- **Neutral Dark (Eerie Black):** `#1E1B18` - Main text color
- **Secondary Text:** `#6B7280` - Muted text for secondary information

### Utility Colors

- **Card Shadow/Divider:** `#E5E7EB` - Subtle borders and dividers
- **Success:** `#5CB85C` - Green for positive actions
- **Warning:** `#FFD166` - Yellow for warnings
- **Error:** `#D8315B` - Same as accent for consistency
- **Info:** `#3E92CC` - Same as primary for consistency

## Setup and Usage

### 1. Material-UI Theme Provider

The theme is already set up in your `App.tsx`. To use light/dark mode:

```tsx
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme, createAppTheme } from "./theme/theme";

// Use predefined themes
<ThemeProvider theme={lightTheme}>
  <CssBaseline />
  {/* Your app content */}
</ThemeProvider>;

// Or create dynamic theme
const [isDarkMode, setIsDarkMode] = useState(false);
const currentTheme = createAppTheme(isDarkMode ? "dark" : "light");

<ThemeProvider theme={currentTheme}>
  <CssBaseline />
  {/* Your app content */}
</ThemeProvider>;
```

### 2. Using Theme Colors in Components

#### With MUI Components

```tsx
import { Button, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MyComponent = () => {
  const theme = useTheme();

  return (
    <>
      {/* Primary button - automatically uses Celestial Blue */}
      <Button variant="contained" color="primary">
        Primary Action
      </Button>

      {/* Secondary button - automatically uses Cerise */}
      <Button variant="contained" color="secondary">
        Secondary Action
      </Button>

      {/* Custom styling with theme colors */}
      <Typography variant="h4" sx={{ color: theme.palette.primary.dark }}>
        Royal Blue Heading
      </Typography>

      <Card
        sx={{
          backgroundColor: theme.palette.surface.main,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Card content */}
      </Card>
    </>
  );
};
```

#### Direct Color Access

```tsx
import { colors } from "../theme/theme";

const StyledComponent = styled.div`
  background-color: ${colors.primary};
  color: ${colors.textOnPrimary};
  border: 2px solid ${colors.accent};

  &:hover {
    background-color: ${colors.primaryDark};
  }
`;
```

### 3. CSS Custom Properties

Import the CSS variables file to use colors in regular CSS:

```tsx
// In your main.tsx or App.tsx
import "./theme/cssVariables.css";
```

```css
/* In your CSS files */
.button-primary {
  background-color: var(--de-primary);
  color: var(--de-text-on-primary);
  border-radius: var(--de-border-radius);
}

.button-primary:hover {
  background-color: var(--de-primary-dark);
}

.card {
  background-color: var(--de-surface);
  border: 1px solid var(--de-card-shadow);
  box-shadow: var(--de-shadow-md);
}
```

### 4. Dark Mode Support

Toggle dark mode by switching themes:

```tsx
const [darkMode, setDarkMode] = useState(false);
const theme = createAppTheme(darkMode ? "dark" : "light");

// Or use CSS classes with data attributes
document.documentElement.setAttribute(
  "data-theme",
  darkMode ? "dark" : "light"
);
```

## Component Usage Examples

### Buttons and Actions

```tsx
// Primary actions (Celestial Blue)
<Button variant="contained" color="primary">Save Deal</Button>

// Secondary actions (Cerise)
<Button variant="contained" color="secondary">Delete</Button>

// Outlined buttons
<Button variant="outlined" color="primary">Cancel</Button>
```

### Text and Headings

```tsx
// Page headings - Use Royal Blue for importance
<Typography variant="h1" sx={{ color: theme.palette.primary.dark }}>
  Dashboard
</Typography>

// Section headings - Use Celestial Blue
<Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
  Recent Deals
</Typography>

// Body text - Automatic with theme
<Typography variant="body1">
  Regular content text
</Typography>

// Secondary text
<Typography variant="body2" color="textSecondary">
  Additional information
</Typography>
```

### Cards and Surfaces

```tsx
<Card
  sx={{
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      boxShadow: theme.shadows[4],
      transform: "translateY(-2px)",
    },
  }}
>
  <CardContent>{/* Content */}</CardContent>
</Card>
```

### Form Elements

```tsx
// Text fields automatically use theme colors
<TextField
  label="Deal Name"
  variant="outlined"
  fullWidth
/>

// Custom styling
<TextField
  label="Amount"
  variant="outlined"
  sx={{
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  }}
/>
```

### Status Indicators

```tsx
// Success state
<Alert severity="success">Deal completed successfully!</Alert>

// Warning state
<Alert severity="warning">Review required</Alert>

// Error state
<Alert severity="error">Transaction failed</Alert>

// Info state
<Alert severity="info">New features available</Alert>

// Custom status chips
<Chip label="Active" color="success" />
<Chip label="Pending" color="warning" />
<Chip label="High Priority" color="secondary" />
```

### Navigation and Sidebar

```tsx
// Sidebar background
<Drawer
  sx={{
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }}
>
  {/* Navigation items automatically styled */}
  <ListItemButton selected>
    <ListItemText primary="Dashboard" />
  </ListItemButton>
</Drawer>

// App bar
<AppBar sx={{
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}}>
  {/* Header content */}
</AppBar>
```

## Accessibility Considerations

### Contrast Ratios

- **Royal Blue (#0A2463) with White text:** Excellent contrast (AA)
- **Celestial Blue (#3E92CC) with White text:** Good contrast (AA)
- **Cerise (#D8315B) with White text:** Excellent contrast (AA)
- **Eerie Black (#1E1B18) on Ghost White:** Excellent contrast (AAA)

### Usage Guidelines

- Always use **white text** on Royal Blue or Cerise backgrounds
- Use **Eerie Black** for main text on light backgrounds
- Use **Secondary Gray** for less important text
- Ensure focus states are clearly visible with both color and border changes

### Focus States

```tsx
// Good focus styling
<Button
  sx={{
    "&:focus": {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: "2px",
    },
  }}
>
  Accessible Button
</Button>
```

## Customization

### Extending the Theme

```tsx
import { createAppTheme } from "./theme/theme";

// Create custom theme with additional properties
const customTheme = createAppTheme("light");
customTheme.palette.custom = {
  brandGradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
};
```

### Adding New Colors

```tsx
// In theme.ts
const colors = {
  // ... existing colors
  newColor: "#FF6B35",
};

// Extend the theme interface
declare module "@mui/material/styles" {
  interface Palette {
    newColor: string;
  }
  interface PaletteOptions {
    newColor?: string;
  }
}
```

## Performance Tips

1. **Use theme tokens** instead of hardcoded colors for consistency
2. **Leverage CSS custom properties** for better performance in large apps
3. **Memoize theme-dependent calculations** to avoid unnecessary re-renders
4. **Use the sx prop** for one-off styling rather than creating styled components

## Migration from Other Theme Systems

### From styled-components

```tsx
// Before
const Button = styled.button`
  background: #3e92cc;
  color: white;
`;

// After
<Button
  sx={{
    backgroundColor: "primary.main",
    color: "primary.contrastText",
  }}
/>;
```

### From CSS-in-JS

```tsx
// Before
const buttonStyles = {
  backgroundColor: "#3E92CC",
  color: "#FFFFFF",
};

// After
const buttonStyles = (theme) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
});
```

## Files in This Theme System

- **`theme.ts`** - Main theme configuration with MUI setup
- **`cssVariables.css`** - CSS custom properties for non-MUI usage
- **`README.md`** - This documentation file
- **`components/examples/ThemeExample.tsx`** - Live examples and showcase

For more examples, see the `ThemeExample` component which demonstrates all color combinations and usage patterns.
