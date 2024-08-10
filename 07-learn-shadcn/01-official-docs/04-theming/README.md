# Theming

> Using CSS Variables or Tailwind CSS for theming.

You can choose between using CSS variables or Tailwind CSS utility classes for theming.

## Utility classes

```html
<div className="bg-zinc-950 dark:bg-white" />
```

To use utility classes for theming set `tailwind.cssVariables` to `false` in your `components.json` file.

## CSS Variables

```html
<div className="bg-background text-foreground" />
```

To use CSS variables for theming set tailwind.cssVariables to true in your components.json file.

## Convention

We use a simple background and foreground convention for colors. The background variable is used for the background color of the component and the foreground variable is used for the text color.

- The background suffix is omitted when the variable is used for the background color of the component.

## Adding new colors

To add new colors, you need to add them to your CSS file(e.g. `app/globals.css`) and to your tailwind.config.js file.

Other color formats

I recommend using [HSL colors](https://www.smashingmagazine.com/2021/07/hsl-colors-css/) for theming but you can also use other color formats if you prefer.