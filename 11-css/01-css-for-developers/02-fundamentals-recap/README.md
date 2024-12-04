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