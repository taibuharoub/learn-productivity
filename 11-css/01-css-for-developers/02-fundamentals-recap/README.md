# Fundamentals Recap

## 1. Anatomy of a Style Rule

```css
.error-text {
  color: red;
}
```

## 2. Media Queries

In order to accommodate screens of different shapes and sizes, `CSS` features `media queries`, which allow us to apply different `CSS` in different scenarios

Media queries use the @media syntax. You can kinda think of it as an if statement in JavaScript, for example

```js
// Javascript
if (condition) {
  // Some JS that will run if the condition is met.
}
```

```css
/* CSS */
@media (condition) {
  /* Some CSS that'll run if the condition is met. */
}
```

Example

```css
@media (max-width: 300px) {
  .small-only {
    color: red;
  }
}
```

Breakdown:

- In this case, the condition is `max-width: 300px`. If the **window is between 0px and 300px wide**, the CSS within will be applied.

### 1. Hiding content

It's common to use `media queries` to have alternative interfaces depending on the screen size.

### 2. Valid conditions

Inside the parentheses, we typically use either `max-width` **to add styles on small screens**, or `min-width` **to add styles on larger ones**.

Note:

- In the context of a media query, max-width is a “media feature”, not a CSS property. They just happen to share the same name

Not all CSS properties have corresponding media features. For example, this snippet is not valid:

```css
/* 🚫 Not valid, since `font-size` can't be queried */
@media (font-size: 32px) {
}
```

Tip:

- An `iframe` is an embedded HTML document within the main HTML document. It's a page within a page. When you resize the partition between code and preview, you're resizing the embedded document. The media query runs in the context of that inner page.

## 3. Selectors

`CSS` comes with an incredibly rich set of `selectors`, and those `selectors` can be mixed and matched in interesting ways.

The most straightforward `selectors` target a specific tag or class

```css
/* Turn all links red! */
a {
  color: red;
}
/*
  Remove the underline from all elements that
  have been given a class of `navigation-link`
*/
.navigation-link {
  text-decoration: none;
}
```

Tip:
-Within the modern JS ecosystem, however, we often rely on tooling to generate these selectors for us (we'll cover this in more depth in Module 3). For this reason, we won't focus too much on them in this course.

## 4. Pseudo-classes

`Pseudo-classes` let us **apply a chunk of CSS based on an element's current state**. Let's say we have a button, and we want to change its text color when we hover over it, We can do this with the `:hover` pseudo-class.

This is similar to onMouseEnter / onMouseLeave events in JavaScript, but with built-in state management. If we were to do this in JS, we'd need to register event listeners, but we'd also need to manage the state somehow, to know if the element is currently being hovered.

### 1. focus

The `:focus` pseudo-class allows us to apply styles exclusively when an interactive element has focus

Qn. Why do focus styles matter?

Qn. Why is it helpful to know which element is focused?

Focus styles are primarily useful for folks who don't use a "pointer-style" input device (like a mouse, a trackpad, or a finger on a touchscreen). The focus styles show you where you are on the page, which element is selected.

### 2. checked

The `:checked` pseudo-class only applies to checkboxes and radio buttons that are "filled in". You can apply additional styles to indicate that the input is `activated:`

## 5. Pseudo-elements

`Pseudo-elements` are **like pseudo-classes, but they don't target a specific state. Instead, they target "sub-elements" within an element**. For example, we can style the placeholder text in a form input with `::placeholder`

In terms of syntax, `pseudo-elements` use two colons instead of one `(::)`, though some pseudo-elements also support single-colon syntax.

Tip:

- This is why they're called `pseudo-elements` — these selectors target elements in the DOM that we haven't explicitly created with HTML tags

### 1. before and after

Two of the most common pseudo-elements are `::before` and `::after`. These pseudo-elements are added inside the element, right before and after the element's content.

We could rewrite the example see `./03-pseudo-elements/01-before-and-after.html` example like so

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        .pseudo-pseudo {
        color: deeppink;
        }
    </style>
  </head>
  <body>
    <span class="pseudo-pseudo">→ </span>
  This paragraph has little arrows!
  <span class="pseudo-pseudo"> ←</span>
  </body>
</html>
```

There is no significant difference in terms of performance between these two examples. `::before` and :`:after` are really just **secret spans, nothing more. It's syntactic sugar**.

## 6. Combinators

When you think about it, the humble `<a>` tag has a lot of different hats to wear. The same element needs to handle navigation links in a header, as well as inline links in an article.

What if we wanted to only style navigation links? Well, we could do that using a combinator, see example `./04-combinators/index.html`

By putting a space between `nav` and `a`, we're combining two selectors in a very specific way: **we're saying that the styles should only apply to a tags that are nested within nav tags**. The first two links in the snippet qualify, but the last one doesn't.

The term `combinator` refers to a **character that combines multiple selectors**. In this case, the `space character` combines `nav` and `a` to create a descendant selector. The `descendant selector` will apply to all descendants, no matter how deeply nested they are

In CSS, we can differentiate between children and descendants. Think of a family tree: a child is only one level down from the parent. A descendant might be 1 level down (child), 2 levels down (grandchild), 3 levels down

Tip:

- The greater than symbol (`>`) will target only children that are direct descendants (it has to be a direct child)

Note:

- If you have just have a `space` between the two things, then it will target any descendant anywhere down the tree, when you add the greater than symbol/(`>`) this will only look for direct children

## 7. Color

We can adjust the text color of a specified element using the color property

```css
strong {
  color: red;
}
```

### 1. Color formats

CSS includes many different ways to represent color. A lot of developers use hex codes (#FF0000), but I believe there are better options

You can use `HSL` colors anywhere you'd normally put a `hex code`, for example

```css
.colorful-thing {
  color: hsl(200deg 100% 50%);
  border-bottom: 3px solid hsl(100deg 75% 50%);
}
```

The first number has the `deg` suffix since it's in degrees (from 0° to 360°), and the next two numbers are percentages (from 0% to 100%).

In CSS quite a few different ways to represent color, below are the four most common:

1. Hex Codes e.g `#FF0000`
   1. This is probably the most used color formats
   2. Hex codes are a way to represent RGB color, they go from 0 to and A to F so 16 which would be 16x16=256 e.g `#FF0000`
2. Keywords e.g. `red`, `green`, etc
   1. These have one very practical purpose which is for educational content like tutorials. The problem is that in a real application you gonna need a color shade/theme, you gonna need multiple shades of a color and there is really no way to trick/change that with color Keywords
   2. It's useful in educational content where you like need a placeholder color
3. RGB e.g `rgb(255, 0, 0)
   1. It really kind of the same color format as `Hex codes`, it's just the same information just represented in a `decimal` system instead of a `hex-decimal` system
4. HSL e.g `hsl(0deg, 100%, 50%)`
   1. By the far my favorite and the one i recommend that you use
   2. The huge is the actual pigment in the color, what color is being used is it purple, red or yellow represented by `264deg`. But this does not tell what the actual color should be we need two more pieces of information
   3. The first additional value is the saturation, this is how grayed out or vibrant the color is. when we have zero/0 saturation the hue does not matter
   4. The second additional value is the lightness value, so the up down axis(vertical axis), we can our color to be lighter or darker, when we are kind of in the middle of the scale we are not making it brighter or darker, so right in the middle is like the purest representation of the color and as we go up and up we hit a point where we are pure white, and similarly here at the top the saturation does not matter because white by definition does not have any pigment either

### 2. Transparency

Certain color formats allow us to supply an additional value for the `alpha` channel.

This is a measure of `opacity`. At `1` (default), the color `is fully opaque and solid`. At `0`, the color `is invisible`. We can specify decimal values to create a semi-transparent color.

Qn. What's the deal with the slash?

Many students have asked about this funky syntax; why is there a `slash` in the `hsl` function??

The `/` character is becoming a more common pattern in modern CSS. **It isn't about division, it's about separation**. The `slash` **allows us to create groups of values**. The first group is about the color. The second group is about its opacity.

### 3. Background colors

The color property only affects the color of the text. If we want to set a color to the element's background, we can use the background-color property.

## 8. Units

### 1. Pixels

The most popular unit for anything size-related is the pixel. Pixels are nice because they correspond more-or-less with what you see on the screen*. It's a unit that many developers get comfortable with. When it comes to most things, we'll use pixels in this course. The big exception is typography.

### 2. Ems

The `em` unit is an interesting fellow. It's a **relative unit, equal to the font size of the current element**.

If a heading has a font-size of 24px, and we give it a bottom padding of 2em, we can expect that the element will have 48px of cushion underneath it (2 × 24px).

Qn. How often should you use ems?

I don't often reach for them. It can be very surprising when a tweak to font-size affects the spacing of descendant elements.

This is especially true when it comes to modern component architectures. Using `em` means that a component's UI will change depending on the font size of the container it's placed within. This can be useful, but more often than not, it's a nuisance.

### 3. Rems

The `rem` unit is quite a lot like the `em` unit, with one crucial difference: it's **always relative to the root element, the `<html>` tag**.

All of the `rems` across your app will be taking their cues from that root HTML tag. By default, the HTML tag has a font size of `16px`, so `1rem` will be equal to `16px`.

From our example `./07-units/02-rem.html`

Notice how all the text scales accordingly, when you change the root font size? That's why people like the rem unit. No matter where an element is in the DOM tree, the rem is consistent.

It behaves consistently and predictably, like pixels, but it respects user preferences when it comes to increasing/decreasing default font sizes.

Please note, **You shouldn't actually set a px font size on the html tag**. This will override a user's chosen default font size. The only reason we're doing it here is to demonstrate how the rem unit works, and to simulate a user changing their default font size.

If you really want to change the baseline font size for rem units, you can do that using ems or rems example

```css
html {
  /* 20% bigger `rem` values, app-wide! */
  font-size: 1.2em;
}
```

Fun little fact:

- when selecting the html tag, em and rem units work exactly the same way! Normally, em values can be influenced by their parent elements, but html is the top-level root element on the page. It's also the element rem units are relative to

### 4. Percentages

The `percentage` unit is often used with `width/height`, as a **way to consume a portion of the available space**

### The bottom line

A common question I see from developers is "which unit should I use when?". Here's how I think about it:

- For `typography`, I generally use `rem`, because it has important accessibility benefits.
- When it comes to properties that relate to the `box model` — `padding`, `border`, `margin` — I usually use pixels. It's more intuitive than rem, and there isn't a clear accessibility win.
- For `width/height`, it'll **depend on whether I want the element to be a fixed size, or a relative size**. I might want one div to always be 250px wide, while another one should be 50% of the available space.
- For `color`, as we saw in the last lesson, I prefer `hsl`.

I reserve `em` for the rare cases when I want one property to scale directly with font size.

There are many other units as well. Some of them will be introduced later in the course. Others, like `in`, are only useful in very specific niche cases (eg. print media), so we won't be covering them.

## 9. Typography

When web designers are learning how to design for the web, they're taught that text is the most important aspect. Remove the text from the page, and it becomes totally unusable. The same might not be true for images or colors or styles.

CSS gives us many levers we can pull to tweak the text on our page, and we'll go deep into them later on. For now, let's cover the fundamentals of styling text.

### 1. Font families

We can change which font is used with the font-family property eg `font-family: Arial;`

Tip:

- It's called a `family` because each **font consists of multiple character sets**, for example, **“Roboto” includes 12 individual sets: 6 font weights, with 2 variants (normal and italic)**

`Font families` come in different styles. The 3 most popular:

- Serif
- Sans-serif
- Monospace

A `serif` is a little adornment at the edge of strokes. `Serif` fonts a**re very common in print media, but less so on the web (they tend to create a more sophisticated, aged look)**.

```css
p {
  /* Try changing me to 'serif' or 'monospace'! */
  font-family: sans-serif;
}
```

Alternatively, we can pick a custom font (AKA a web font)! In order for this to work, we'll need to instruct the browser to download the fonts we're missing.

```html
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

When using a web font, it's customary to surround it in quotation marks. This is technically only required if the font name has multiple words, but it's a good convention regardless.

Here's how we'd use that Google font:

```css
font-family: 'Roboto', sans-serif;
```

We pass multiples values (a “font stack”) so that the browser can fall back to an available font for the first few seconds (or if the font fails to download). The comma lets us pass an ordered list of fonts, and the browser will use the first one available

### 2.Typical text formatting

Word processing software like Microsoft Word or Google Docs provide many ways to format text, and CSS has inherited some of these conventions.

We'll focus on the 3 most common formatting options:

- Bold
- Italic
- Underline

#### 1. Bold text

We can create bold text with the font-weight property

```css
font-weight: bold;
```

There's also a numbering system, from 1 to 1000, which lets us control the font weight more precisely

```css
/* Light, thin text*/
font-weight: 300;
/* Normal text */
font-weight: 400;
/* Heavy, bold text */
font-weight: 700;
```

The default value for font weight is `400`, and the bold keyword maps to `700`.

If we only supply a single font weight, the browser will do its best to represent bold text by thickening the characters. It generally doesn't do a great job at this.

Tip:

- Certain HTML tags, like `<strong>` and `<em>`, come with some default text styling. `<strong>`, for example, adds font-weight: bold.

#### 2. Italic text

On the web, emphasis is generally represented by slanting the text at an angle. Angled text suggests that the words are being "leaned into".

We can apply italic text with this declaration

```css
font-style: italic;
```

Tip:

- Similar to bold text, the browser can simulate italic text by rendering the characters at an angle. For best results, though, we should supply an italic character set.

#### 3. Underlined text

On the web, underlines carry a very specific meaning: they tend to be links.

We shouldn't, therefore, use underlines for visual effect, or to signify that something is important. It'll confuse users.

That said, not all links will need underlines. Often, navigation links rely on other cues to let the user know that they're clickable.

We can toggle an element's underline with the text-decoration property:

```css
/* remove underlines from anchor tags: */
a {
  text-decoration: none;
}
```

### 3. Alignment

Another word-processing concern: how do we tweak text alignment?

We can shift characters horizontally using the `text-align` property

Tip:

- `text-align` is also capable of aligning other elements, like images. In general, though, we'll use other tools for those kinds of jobs. We should reserve `text-align` for text.

### 4. Text transforms

We can tweak the formatting of our text using the text-transform property:

```css
/* RENDER WITH ALL CAPS */
text-transform: uppercase;
/* Capitalize The First Letter Of Every Word */
text-transform: capitalize;
```

### 5. Spacing

We can tweak the spacing of our characters in two ways.

1. We can tweak the horizontal gap between characters using the `letter-spacing` property.
2. We can tweak the vertical distance between lines using the `line-height` property.

`line-height` is a bit of an odd duck because it takes a unitless value.

This works as a ratio: `line-height: 2` means that the lines should be twice as tall as a different element with `line-height: 1`.

Originally, the default value for this property was 1, but it's ticked up over the years: in Chrome, the new default value is 1.15. In Firefox, it's 1.2.

Note:

Line height and accessibility

In order to make our apps and websites as accessible as possible, we want to choose a pretty generous value for line-height. This will help those experiencing low vision conditions, as well as those with cognitive difficulties like dyslexia.

The minimum recommended value is 1.5

It is technically valid to pass other sorts of units to line-height, like this:

```cs
p {
  line-height: 20px;
}
```

We generally shouldn't do this though. If the user cranks up their default font size, we want the line heights to scale proportionally!