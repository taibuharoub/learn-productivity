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

### 2. Background colors

The color property only affects the color of the text. If we want to set a color to the element's background, we can use the background-color property.