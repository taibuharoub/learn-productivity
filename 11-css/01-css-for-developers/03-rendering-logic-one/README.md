# Rendering Logic One

> Flow layout is the “OG” layout algorithm of the web, and it's still used heavily today. In this module, we explore how to best use Flow layout in modern times. We'll also deepen our understanding of common fundamentals like the Box Model.

Fundamentally, the goal of `CSS` is to **allow you to control the appearance and layout of your app's content**.

Tip:

- You don't quite start with a blank canvas; HTML tags do include a few minimal styles. For example, here are the built-in styles for <a> tags, in Chrome 86

```css
a {
  color: -webkit-link;
  cursor: pointer;
  text-decoration: underline;
}
```

These styles are part of the `user-agent stylesheet`. Each browser includes their own stylesheet full of base styles like this. There are some hard rules in the HTML specification, but for the most part, each browser comes up with its own default styles. That's why focus rings look so different across browsers!

Resource

[Full stylesheet for the Chrome browser](https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/html/resources/html.css)

## 1. Inheritance

Certain `CSS` properties inherit. When I apply a color to an element, that value gets passed down to all children and grand-children. Not all CSS properties are inheritable.

The people who wrote the CSS spec opted to make certain properties inheritable for convenience. It's a DX? thing. It would be super annoying if we had to keep re-applying the same text color styles to every child and grand-child of a container.

Most of the properties **that inherit are typography-related**, like `color`, `font-size`, `text-shadow`, and so on. You can find a more-or-less complete l[ist of inheritable properties](https://www.sitepoint.com/css-inheritance-introduction/#list-css-properties-inherit) on SitePoint.

### Forcing inheritance

Occasionally, you may wish to have a property inherit even when it wouldn't normally do so.

A good example is link colors. By default, anchor tags have built-in styles that give unvisited, inactive links a blue hue

See example `./01-inheritence/01-forcing-inheritence.html`, As we saw earlier, these are the “built-in” styles for `<a>` tag

```css
a {
  color: -webkit-link;
  cursor: pointer;
  text-decoration: underline;
}
```

The trouble is that even though `color` is an inheritable property, it's being overwritten by the default style, `color: -webkit-link`?.

We can fix this by **explicitly telling anchor tags to inherit their containing text color**

## 2. The Cascade

See the cascade algorithm example `./02-cascade-algorithm/index.html`. When the browser needs to display our introduction paragraph on the screen, it first needs to figure out which declarations apply to it. And before it can do that, it needs to collect a set of matching rules. Once it has a list of applicable rules, it works out any conflicts. I imagine this as a sort of deathmatch: if multiple selectors each apply the same property, it pits them against each other. Two fighters enter, but only one emerges.

That's the main idea. The browser will take a set of applicable style rules, and whittle it down to a list of specific declarations that are applicable.

Qn. How does it determine which rules win each battle? 

It depends on the `specificity` of the selector.

The `CSS` language includes many different `selectors`, and **each selector has a relative power**. For example, `classes` are "more specific" than `tags`, so if there is a conflict between a `class` and a `tag`, the `class` wins. `IDs`, however, are more specific than `classes`.

### 1. Similarities with JS merging

The order that they're merged in is determined by `specificity`; `class` styles are more specific than `tag` styles, so they're merged in later. This way, they overwrite any conflicting styles. All non-conflicting styles are kept.

Tip:

- But if you work with a component-based framework like `React`, **you shouldn't really need to know that much about the cascade.**

Note:

- In this course will spend much less time on the `cascade` than most other resources. Instead, we'll learn **how to effectively use modern tooling and methodologies to solve problems for us**.

Resource:

[deeper into the cascade](https://wattenberger.com/blog/css-cascade)

## 3. Directions

The web was **built for displaying inter-linked documents**. A lot of `CSS` mechanics and terminology are inherited from the print world.

`CSS` builds its sense of direction based on this system. **It has a block direction (vertical), and an inline direction (horizontal)**.

Here's an easy way to remember the directions, for horizontal languages:

- `Block direction` is like lego blocks: they stack together one on top of the other.
- `Inline direction` is like people standing in-line; they stand side by side, not one on top of the other

Note:

In this course, we're going to focus on horizontally-written languages. Vertically written languages on the web are rare; even Han-based languages that are traditionally written vertically (like Chinese, Japanese, and Korean) are often written horizontally on the web.

We'll also mainly focus on left-to-right languages like English. We'll pick up a few tidbits about right-to-left languages like Arabic, but for the most part, it's beyond the scope of this course.

Resource:

[writing modes](https://24ways.org/2016/css-writing-modes/)

### 1. Logical properties

Earlier, we learned about "built-in" styles — these are the rules that each browser comes with out-of-the-box, defined in the user-agent stylesheet.