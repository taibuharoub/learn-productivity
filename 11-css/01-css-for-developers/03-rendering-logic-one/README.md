# Rendering Logic One

> Flow layout is the “OG” layout algorithm of the web, and it's still used heavily today. In this module, we explore how to best use Flow layout in modern times. We'll also deepen our understanding of common fundamentals like the Box Model.

Fundamentally, the goal of `CSS` is to **allow you to control the appearance and layout of your app's content**.

Tip:

- You don't quite start with a blank canvas; HTML tags do include a few minimal styles. For example, here are the built-in styles for `<a>` tags, in Chrome 86

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

Note:

- For now, the important takeaway is that like a real-world document, content is structured along a block axis and an inline axis.

## 4. The Box Model

> The most common CSS-related job-interview question is probably this: Can you explain the box model?

It's the `CSS` version of "what is a `closure`?", or "what's the difference between classical and prototypal inheritance?".

Because it's such a common question, you may have read about it when prepping for job interviews, or maybe it was taught to you at a bootcamp. Typically, though, the answer given is quite shallow, and glosses over a lot of details. This is unfortunate, since the Box Model is a critical part of CSS' rendering model!

Over the next few lessons, we'll go a bit deeper, and learn about how the browser uses the box model to dictate layout.

### 1. Winter Layers

The four aspects that make up the `box model` are:

1. Content
2. Padding
3. Border
4. Margin

A helpful analogy is to imagine a person out for a winter walk, wearing a big poofy coat:

- The `content` is the person themselves, the human being inside the coat.
- The `padding` is the polyester stuffing in the coat. The more stuffing there is, the more poofed-up the coat will be, and the more space the person will take up.
- The `border` is the material of the coat. It has a thickness and a color, and it affects the person's appearance.
- The `margin` is the person's “personal space”. As we've learned in recent years, it's good to have 2 meters (6 feet) of space around us.

### 2. Box Sizing

When we say that an element should have a `width` of 100%, what does that actually mean?

It turns out, the browser might have a slightly different interpretation than you do. Let's explore. These aspects affect the size of the element.

See Example `./03-the-box-model/01-box-sizing.html`

- When we set our `.box` to have `width: 100%`, we're saying that the box's content size should be equal to the available space, 500px. The padding and border is added on top.
- Our box winds up being `548px` wide because it adds 20px of padding and 4px of border to each side: `500 + 20 * 2 + 4 * 2`
- The same thing happens with `height`: because the element is empty, it has a content size of 0px, with the same border and padding added on top.

The `box-sizing` CSS property **allows us to change the rules for size calculations**. The default value (`content-box`) only takes the inner content into account, but it offers an alternative value: `border-box`.

With `box-sizing: border-box`, things behave much more intuitively

#### A new default

Instead of having to remember to swap `box-sizing` on every layout element, we can set it as the default value for all elements with this handy code snippet:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Tip:

- Whenever I start a new project, I copy/paste this snippet into my global styles. I never want to work again in a project without it!

---

Important

`content-box` => `box-sizing: content-box` is the default value, essentially here when you use a percentage width, it sets that percentage based on the content size, not the size of the box contained by the border

With `border-box` => `box-sizing: border-box`, it essentially includes the padding and border as part of the width calculations. By doing this we are able to make sure that every thing can fit within the width that we have established

Tip:

When you comment out a line of css, it does show up in the dev tools

## Padding

A helpful way to think about `padding` is t**hat it's "inner space"**. Padding can be set for all directions at once, or it can be specified for individual directions

### 1. Units

When applying padding, we can pick from a pretty wide range of units. The most common ones are:

1. px
2. em
3. rem

Tip:

- Many developers believe that `pixels` are bad for accessibility. This is true when it comes to `font size`, but I actually think `pixels` are the best unit to use for padding (and other box model properties like margin/border).

### 2. Shorthand properties

The padding property has a couple tricks up its sleeve. It can be used to set asymmetric padding, in a few different ways.

```css
.two-way-padding {
  padding: 15px 30px;
}
.asymmetric-padding {
  padding: 10px 20px 30px 40px;
}
```

If two values are passed, the first value is used for both vertical directions (top/bottom), and the second value is used for horizontal directions (left/right).

If all 4 values are passed, it applies them in a specific order: top, right, bottom, left.

The easiest way to remember this order is to picture a clock. We start at the top (12:00), and go clockwise for the remaining values

Tip:

- When fewer than 4 values are passed, it "fills in the gaps". If you pass it two values, it mirrors the top to the bottom, and the right to the left. With only 3 values, we set top/right/bottom explicitly, and mirror the right value to the left.

---
Beyond padding

This pattern is shared amongst other CSS properties that have shorthand values. For example:

- margin (margin: 10px 20px 30px 40px)
- border-style (border-style: dotted solid dashed solid)

A similar pattern is used for properties that affect corners, like border-radius; the pattern is top-left, top-right, bottom-right, bottom-left. It follows a clockwise pattern starting from the top-left.

### 3. Overwriting values

Let's say we want to produce an element with only 3 padded sides, We could do this with our shorthand property:

```css
.box {
  padding: 48px 48px 0 48px;
}
```

There is another way to represent the same intent, which is arguably clearer:

```css
.box {
  padding: 48px;
  padding-bottom: 0;
}
```

"Long-form" properties can overwrite the relevant value in shorthand properties. The effect is the same, but it's a bit more semantic; instead of a random string of numbers

**Please note**: the order matters! The overwrite has to come after the shorthand, otherwise it won't have any effect
