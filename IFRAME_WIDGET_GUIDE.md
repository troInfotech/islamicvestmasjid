# Responsive Iframe Widget Implementation Guide

## Overview
This guide explains how to add mobile-responsive iframe widgets to your static website. The implementation uses modern CSS techniques including aspect-ratio for maintaining proportions across all devices.

## Implementation Applied to Your Website

### Changes Made

#### 1. CSS Updates (`css/styles.css`)
We replaced the old transform-scaling approach with a modern aspect-ratio based solution that:
- ✅ Uses CSS `aspect-ratio` property for automatic responsive sizing
- ✅ Maintains consistent appearance across all devices
- ✅ Reduces code complexity and maintenance
- ✅ Provides smooth transitions and hover effects
- ✅ Includes dark mode support
- ✅ Adds loading animation for better UX

#### 2. HTML Enhancements (`index.html`)
Updated iframe elements with:
- ✅ Descriptive `title` attributes for accessibility
- ✅ `allow="geolocation"` permission for prayer time widgets
- ✅ `aria-label` for screen readers
- ✅ Fallback content for browsers that don't support iframes

## Key Features

### Responsive Design
- **Desktop (>768px)**: Displays full-width widget with 16:10 aspect ratio
- **Tablet (≤768px)**: Adjusts to 16:11 aspect ratio
- **Mobile (≤480px)**: Uses 1:1 (square) aspect ratio for optimal viewing
- **Small Mobile (≤375px)**: Uses 9:10 aspect ratio

### Performance Optimizations
- `loading="lazy"` - Defers loading until needed
- Smooth transitions for better user experience
- Efficient CSS using modern properties

### Accessibility
- Proper ARIA labels for screen readers
- Descriptive titles
- Fallback content for non-supporting browsers

## How to Add More Iframe Widgets

### Basic Template

```html
<!-- HTML -->
<div class="responsive-iframe-wrapper">
  <div class="responsive-iframe-container">
    <iframe 
      src="YOUR_WIDGET_URL"
      title="Descriptive Title"
      loading="lazy"
      scrolling="no"
      allow="required-permissions"
      aria-label="Widget description">
      <p>Fallback content for browsers that don't support iframes.</p>
    </iframe>
  </div>
</div>
```

```css
/* CSS */
.responsive-iframe-wrapper {
  width: 100%;
  max-width: 1200px; /* Adjust based on your needs */
  margin: 0 auto;
  padding: 20px;
}

.responsive-iframe-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  background: var(--white);
  aspect-ratio: 16 / 9; /* Change ratio as needed */
}

.responsive-iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .responsive-iframe-container {
    aspect-ratio: 4 / 3; /* More square on mobile */
  }
}
```

## Common Aspect Ratios

Choose the appropriate aspect ratio based on your widget content:

- **16:9** - Standard video, widescreen content
  ```css
  aspect-ratio: 16 / 9;
  ```

- **16:10** - Wider content, good for dashboards
  ```css
  aspect-ratio: 16 / 10;
  ```

- **4:3** - Traditional display ratio
  ```css
  aspect-ratio: 4 / 3;
  ```

- **1:1** - Square, good for social media embeds
  ```css
  aspect-ratio: 1 / 1;
  ```

- **21:9** - Ultra-wide content
  ```css
  aspect-ratio: 21 / 9;
  ```

## Alternative: Fallback for Older Browsers

If you need to support older browsers that don't support `aspect-ratio`, use the padding-bottom technique:

```css
.responsive-iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 ratio (9/16 * 100) */
  height: 0;
  overflow: hidden;
}

.responsive-iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
```

### Padding-Bottom Calculation
- **16:9** → `56.25%` (9 ÷ 16 × 100)
- **4:3** → `75%` (3 ÷ 4 × 100)
- **1:1** → `100%` (1 ÷ 1 × 100)
- **21:9** → `42.86%` (9 ÷ 21 × 100)

## Examples for Different Widget Types

### 1. Google Maps Embed
```html
<div class="map-iframe-wrapper">
  <div class="map-iframe-container">
    <iframe 
      src="https://www.google.com/maps/embed?pb=YOUR_MAP_CODE"
      title="Islamisk Center Vest Location"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allow="geolocation">
    </iframe>
  </div>
</div>
```

```css
.map-iframe-container {
  aspect-ratio: 16 / 9;
}

@media (max-width: 768px) {
  .map-iframe-container {
    aspect-ratio: 1 / 1;
  }
}
```

### 2. YouTube/Video Embed
```html
<div class="video-iframe-wrapper">
  <div class="video-iframe-container">
    <iframe 
      src="https://www.youtube.com/embed/VIDEO_ID"
      title="Video Title"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  </div>
</div>
```

```css
.video-iframe-container {
  aspect-ratio: 16 / 9; /* Standard video ratio */
}
```

### 3. Social Media Feed
```html
<div class="social-iframe-wrapper">
  <div class="social-iframe-container">
    <iframe 
      src="YOUR_SOCIAL_WIDGET_URL"
      title="Social Media Feed"
      loading="lazy"
      scrolling="yes">
    </iframe>
  </div>
</div>
```

```css
.social-iframe-container {
  aspect-ratio: 9 / 16; /* Vertical/portrait for feeds */
  max-width: 400px;
  margin: 0 auto;
}
```

## Best Practices

### 1. Security
- Always use HTTPS URLs for iframe sources
- Set appropriate `sandbox` attributes if needed
- Use `allow` attribute to specify required permissions only

```html
<iframe 
  src="https://trusted-source.com"
  sandbox="allow-scripts allow-same-origin"
  allow="geolocation; microphone">
</iframe>
```

### 2. Performance
- Use `loading="lazy"` for below-the-fold content
- Consider using a facade/placeholder for heavy embeds
- Minimize the number of iframes on a single page

### 3. Accessibility
- Always provide meaningful `title` attributes
- Include `aria-label` for additional context
- Provide fallback content inside iframe tags
- Ensure keyboard navigation works

### 4. Responsive Design
- Test on multiple devices and screen sizes
- Adjust aspect ratios for mobile vs desktop
- Consider hiding or showing different widgets based on screen size
- Use `max-width` to prevent widgets from becoming too large

### 5. Dark Mode Support
Your website already has dark mode implemented. Ensure iframe containers adapt:

```css
[data-theme="dark"] .responsive-iframe-container {
  background: var(--white);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
}
```

## Testing Checklist

- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test on tablets in both portrait and landscape
- [ ] Verify dark mode compatibility
- [ ] Check loading performance
- [ ] Validate accessibility with screen readers
- [ ] Test with slow network connections
- [ ] Verify fallback content displays correctly

## Troubleshooting

### Issue: Iframe content is cut off
**Solution**: Adjust the aspect ratio or use device-specific ratios in media queries.

### Issue: Iframe doesn't load
**Solutions**:
- Check if the source URL uses HTTPS
- Verify the widget provider allows iframe embedding
- Check browser console for X-Frame-Options errors
- Ensure no ad blockers are interfering

### Issue: Iframe is too large on mobile
**Solution**: Add mobile-specific aspect ratios and max-width constraints.

```css
@media (max-width: 480px) {
  .responsive-iframe-container {
    max-width: 100%;
    aspect-ratio: 1 / 1;
  }
}
```

### Issue: Loading spinner doesn't disappear
**Solution**: The spinner is set with `z-index: -1` so it should appear behind the iframe. If visible, check if iframe has loaded properly.

## Browser Support

The `aspect-ratio` property is supported in:
- Chrome/Edge 88+
- Firefox 89+
- Safari 15+
- Mobile browsers (iOS 15+, Android Chrome 88+)

For older browsers, use the padding-bottom fallback method described above.

## Resources

- [MDN: aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
- [MDN: iframe element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
- [Web.dev: Responsive iframes](https://web.dev/patterns/web-vitals-patterns/iframes)

## Support

For issues or questions about implementing iframe widgets on your website, refer to this guide or consult the CSS comments in `styles.css`.

---

**Last Updated**: December 2025  
**Author**: Responsive Website Implementation

