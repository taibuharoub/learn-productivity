# Guide to Flexbox

We'll build an intuition for how the `Flexbox` algorithm works, by learning about each of these properties. Whether you're a CSS beginner, or you've been using `Flexbox` for years, I bet you'll learn quite a bit!

`CSS` is comprised of many different layout algorithms, known officially as `layout modes`. Each `layout mode` is its own little sub-language within CSS. The **default `layout mode` is `Flow layout`, but we can opt in to `Flexbox` by changing the display property on the parent container**

When we flip display to `flex`, we create a `flex` formatting context. This means that, by default, all children will be positioned according to the Flexbox layout algorithm.

Each `layout algorithm` is designed to solve a specific problem. **The default `Flow` layout is meant to create digital documents; it's essentially the Microsoft Word `layout algorithm`**. Headings and paragraphs stack vertically as blocks, while things like text, links, and images sit inconspicuously within these blocks.

Qn. So, what problem does Flexbox solve?

`Flexbox` is all **about arranging a group of items in a row or column**, and giving us a ridiculous amount of **control over the distribution and alignment of those items**. As the name suggests, Flexbox is all about flexibility. We can control whether items grow or shrink, how the extra space is distributed, and more.

Qn. Is it still relevant?

You might be wondering: now that `CSS Grid` is well-supported in modern browsers, isn't `Flexbox` obsolete?

`CSS Grid` is a wonderful layout mode, but it solves different problems than `Flexbox`. We should learn both layout modes, and use the right tool for the job.

`Flexbox` still reigns supreme when it comes to dynamic, fluid UIs that arrange items in a vertical or horizontal list. We'll see an example in this guide, the deconstructed pancake, that can't easily be accomplished with `CSS Grid`.

Honestly, as someone comfortable with both `CSS Grid` and `Flexbox`, I still find myself reaching for `Flexbox` quite often.

## Flex direction

`Flexbox` is all about **controlling the distribution of elements in a row or column**. By default, items will stack side-by-side in a `row`, but we can flip to a `column` with the flex-direction property

With `flex-direction: row`, the primary axis runs horizontally, from left to right. When we flip to `flex-direction: column`, the primary axis runs vertically, from top to bottom.

Important:

- In `Flexbox`, **everything is based on the primary axis**. The algorithm doesn't care about `vertical/horizontal`, or `even rows/columns`. All of the rules are structured around this primary axis, and the cross axis that runs perpendicularly.

This is pretty cool. When we **learn the rules of Flexbox**, we can switch seamlessly from `horizontal layouts` to `vertical ones`. All of the rules adapt automatically. This feature is unique to the Flexbox layout mode.

The children will be positioned by default according to the following 2 rules:

1. `Primary axis`: Children will be bunched up at the start of the container.
2. `Cross axis`: Children will stretch out to fill the entire container.

In `Flexbox`, we decide whether the `primary axis` runs horizontally or vertically. This is the **root that all `Flexbox` calculations are pegged to**.

## Alignment

We can change how children are distributed along the `primary axis` using the `justify-content` property

- When it comes to the `primary axis`, we don't generally think in terms of aligning a single child. Instead, it's all about the distribution of the group.
- We can bunch all the items up in a particular spot (with `flex-start, center, and flex-end`), or we can spread them apart (with `space-between, space-around, and space-evenly`).

For the `cross axis`, things are a bit different. We use the `align-items property`

It's interesting, With `align-items`, we have some of the same options as `justify-content`, but there isn't a perfect overlap

Unlike `justify-content` and `align-items`, `align-self` is **applied to the child element, not the container**. It allows us to change the alignment of a specific child along the cross axis

- `align-self` has all the same values as `align-items`. In fact, they change the exact same thing. `align-items` is syntactic sugar, **a convenient shorthand that automatically sets the alignment on all the children at once**
- There is no justify-self*. To understand why not, we need to dig deeper into the Flexbox algorithm.

## Content vs. items

See Resource

Summary:

- In `Flexbox`, items are distributed along the primary axis. By default, they're nicely lined up, side-by-side.
- The `cross axis` is different, though. A straight vertical line will only ever intersect one of the children.
- This is the fundamental difference between the `primary/cross axis`. **When we're talking about alignment in the `cross axis`, each item can do whatever it wants. In the `primary axis`, though, we can only think about how to distribute the group**.
- That's why there's no `justify-self`. What would it mean for that middle piece to set `justify-self: flex-start`? There's already another piece there!

With all of this context in mind, let's give a proper definition to all 4 terms we've been talking about:

- `justify` — to position something along the primary axis.
- `align` — to position something along the cross axis.
- `content` — a group of “stuff” that can be distributed.
- `items` — single items that can be positioned individually.

And so: we have `justify-content` to control the distribution of the group along the primary axis, and we have `align-items` to position each item individually along the `cross axis`. These are the **two main properties we use to manage layout with `Flexbox`**.

There's no `justify-items` for the same reason that there's no `justify-self`; when it comes to the `primary axis`, we have to think of the items as a group, as content that can be distributed.

What about `align-content`? Actually, this does exist within Flexbox! We'll cover it a little later on, when we talk about the flex-wrap property.

---

Resources:

[Resource](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)