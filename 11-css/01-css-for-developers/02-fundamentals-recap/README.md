# Fundamentals Recap

## Anatomy of a Style Rule

```css
.error-text {
  color: red;
}
```

## Media Queries

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