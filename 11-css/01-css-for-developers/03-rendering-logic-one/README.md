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

## 5. Padding

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

## 6. Border

Border is a bit of an odd duck in the trinity of padding/border/margin—unlike the other two, it has a visual/cosmetic component.

There are three styles specific to border:

- Border width (eg. 3px, 1em)
- Border style (eg. solid, dotted)
- Border color (eg. hotpink, black)

They can be combined into a shorthand:

```css
.box {
  border: 3px solid hotpink;
}
```

The only required field is `border-style`. Without it, no border will be shown!

```css
.not-good {
  /* 🙅‍♀️ Won't work – needs a style! */
  border: 2px pink;
}
.good {
  /* 🙆‍♀️ Will produce a black, 3px-thick border */
  border: solid;
}
```

Tip;

- If we don't specify a border color, it'll use the font's color by default. This isn't well-known, but it can be useful in cases where those things should be synchronized!
- If you want to specify this behaviour explicitly, it can be done with the special `currentColor` keyword. `currentColor` is always a reference to the element's derived text color (whether set explicitly or inherited), and it can be used anywhere a color might be used

### 1. Border radius

The `CSSWG`? has published a list of mistakes they've made with the CSS language. One of these mistakes is listed

> border-radius should have been corner-radius.

It's not hard to understand the rationale; the `border-radius` property rounds an element even if it has no `border`

Like `padding`, `border-radius` accepts discrete values for each direction. Unlike `padding`, it's focused on specific corners, not specific sides.

You can also use percentages; 50% will turn your shape into a circle or oval, since each corner's radius is 50% of the total width/height

### 2. Border Playground

There are a surprising number of border styles

### 3. Border vs. Outline

A common stumbling block for devs is the distinction between `outline` and `border`. In some respects, they're quite similar! They both add a visual edge to a given element.

The core difference is that `outline` **doesn't affect layout**. `Outline` is kinda more like `box-shadow`; it's a cosmetic effect draped over an element, without nudging it around, or changing its size.

Outlines share many of the same properties:

- border-width becomes outline-width
- border-color becomes outline-color
- border-style becomes outline-style

`Outlines` are stacked outside `border`, and can sometimes be used as a "second border", for effect

A couple more quick tidbits about outlines:

- `Outlines` will follow the curve set with `border-radius` in all browsers except Safari. This is a recent change; before September 2021, most browsers kept outlines straight and boxy.
- `Outlines` have a special `outline-offset` property. It allows you to add a bit of a gap between the element and its outline

## 7. Margin

`Margin` increases the space around an element, giving it some breathing room. As we saw earlier, `margin` is "personal space".

In some ways, `margin` is the most amorphous and mysterious. It can do wacky things, like pull an element outside a parent, or center itself within its container.

The syntax for margin looks an awful lot like padding:

```css
.spaced-box {
  margin: 20px;
}
.asymmetrically-spaced-box {
  margin: 20px 10px;
}
.individually-specified-box {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 30px;
  margin-bottom: 40px;
}
.logical-box {
  margin-block-start: 20px;
  margin-block-end: 40px;
  margin-inline-start: 60px;
  margin-inline-end: 80px;
}
```

### 1. Negative margin

With `padding` and `border`, only positive numbers (including 0) are supported. With `margin`, however, we can drop into the negatives. A negative `margin` can pull an element outside its parent

Tip:

- Negative margins can also pull an element's sibling closer:

It's easy to fall into the trap of thinking that `margin` is exclusively about changing the selected element's position. Really, though, it's about changing the gap between elements. `Negative margin` shrinks the gap below an element, causing the next element to scoot up closer. Finally, `negative margin` can affect the position of all siblings.

When we use margin to tweak an element's position, we might also be tweaking every subsequent element as well. This is different from other methods of shifting an element's position, like using transform: translate (which we'll cover later on).

### 2. Auto margins

Margins have one other trick up their sleeve: they can be used to center a child in a container.

The auto value seeks to fill the maximum available space. It works the same way for the width property, as we'll discover shortly.

When we set both margin-left and margin-right to auto, we're telling them each to take up as much space as possible. They're evenly-matched, though, so neither side wins; they always end in a draw.

If you take the free space around an element and distribute it evenly on both sides, you wind up centering that element. This is a happy byproduct of this mechanism!

Two caveats:

- This only works for `horizontal margin`. Setting `top/bottom` margin to `auto` is equivalent to setting it to 0px*.
- This only works on elements with an explicit `width`. Block elements will naturally grow to fill the available horizontal space, **so we need to give our element a `width` in order to center it**.

Note:

- For margin auto we need a width on the element, we trying to center
- And also margin auto works for horizontal margin, setting auto for top and bottom is like setting it to 0px

Exercise on Stretched content, solution

- the photo or any child we choose should be able to extend all the way to the edge of the card while the other children like the text are still constrained by the padding
- One way to do this is just to remove the padding from the card and to add padding to the paragraph(the text)
- The other way is to use a wrapping element, this is what we will use, and the idea is that the container is going to do the structuring and our image is just going to fill that container

## 8. Flow Layout

When it comes to `layout`, `CSS` is more like a collection of mini-languages than a single cohesive language. Every HTML element will have its `layout` calculated **by a layout algorithm. These are known as “layout modes”, and there are 7 distinct ones**.

We'll cover several `layout modes` in this course, including Positioned layout, **“Flexible Box” layout (AKA Flexbox), and Grid layout (AKA CSS Grid)**. For now, though, let's focus on `Flow layout`.

`Flow layout` is the default layout mode. All the examples we've seen so far are rendered in `Flow layout`. A plain HTML document, with no CSS applied, uses `Flow layout` exclusively.

In `Flow layout`, every element will use a display value of either `inline`, `block`, or `inline-block`. This value governs how the `Flow layout` algorithm will place the element. The default value depends on the tag; `div` elements are block by default, while `spans` are inline.

Tip:

- `Inline elements` are generally meant to highlight a selection of text. You might use a `<strong>` tag to add weight to a specific word in a sentence, or use an `<a>` tag to add a link.

Most elements, however, are `block` elements. They can be used to create a block of text, or to arrange boxes into a layout. The `<div>` element, along with its semantic HTML5 alternatives (eg. `section`, `nav`, `header`, `footer`, `article`, etc), are block elements. So are `paragraphs`, `headings`, `form tags`, `blockquotes`, and so on.

It's no coincidence that `block` and `inline` align with the directions we were speaking about earlier. In flow layout, `block` elements stack in the `block` direction, and `inline` elements stack in the `inline` direction.

It's more than just direction, though. There are a set of rules that these display types follow. Let's look at them in turn:

### 1. Inline elements don't want to make a fuss

If you've ever tried to adjust the positioning or size of an `inline` element, you've likely been confounded by the fact that a bunch of CSS properties just don't work.

For example, this snippet will have no effect:

```css
strong {
  height: 2em;
}
```

You can picture `inline` elements as go-with-the-flow-type folks. They don't want to inconvenience anyone by pushing any boundaries. They're like polite dinner-party guests who sit exactly where they're assigned.

You can shift things in the `inline` direction with `margin-left` and `margin-right`, but you can't change its `width` or `height`. And in terms of the block direction, an `inline` element is where it is, and that's the end of the story. `Inline` elements can be given vertical padding, but the results can be surprising, and we need to exercise caution.

Exceptions

There are two exceptions to this rule. The first is `replaced elements`.

A `replaced element` is one that embeds a "foreign" object. This includes:

- `<img />`
- `<video />`
- `<canvas />`

These elements are all technically `inline`, but they're special: they can affect `block` layout. You can give them explicit dimensions, or add some margin-top.

How do we reconcile this? I have a trick. I like to pretend that it's a foreign object within an `inline` wrapper. When you pass it a `width` or `height`, you're applying those properties to the foreign object. The `inline` wrapper still goes with the flow.

The **second exception** is the `<button>` tag. They aren't quite replaced elements, but they function the same way. They can be given a width/height.

Note:

- You can't change the width and height of `inline` elements, You can shift things in the inline direction with `margin-left` and `margin-right`. There are two exceptions to this rule. The first is `replaced elements` e.g `<img />`, `<video />` and `<canvas />`, The second exception is the `<button>` tag. These elements are all technically inline, but they're special: they can affect block layout. You can give them explicit dimensions

### 2. Block elements don't share

When you place a `block` level element on the page, its content box greedily expands to fill the entire available horizontal space.

A heading might only need 150px to contain its letters, but if you put it in an 800px container, it will consume 800px of width. What if we force it to shrink down to the minimum size required for the letters? We can do this with the special width keyword `fit-content*`

### 3. Inline elements have “magic space”

In the box model lesson, we learned about the different ways we can increase space around an element: we can change its content size, we can add padding, we can thicken the border, or increase the margin.

The reason for this extra “magic space” is that the browser treats inline elements as if they're typography. It makes sense that with text, you'd want a bit of extra space, so that the lines in a paragraph aren't crammed in too tightly.

There are two ways we can fix this problem:

- Set images to `display: block` — if you're noticing this problem, there's a good chance your images aren't interspersed with text, so setting them to display as blocks makes sense.
- Set the `line-height` on the wrapping div to `0`: This space is proportional to the height of each line, so if we reduce the line height to 0, this “magic space” goes away. Because our container doesn't contain any text, this property has no other effect.

Space between inline elements

There's another unrelated way that inline elements have a bit of extra spacing. This space is caused by the whitespace between elements. If we squish our HTML so that there are no newlines or whitespace characters between images, this problem goes away

This happens because `HTML` is space-sensitive, at least to an extent. The browser can't tell the difference between `whitespace` added to separate words in a paragraph, and `whitespace` added to indent our `HTML` and keep it readable.

### 4. Inline elements can line-wrap

Inline elements have one pretty big trick up their sleeves; they can line-wrap. Unlike block elements, an inline element can produce shapes other than boxes. This helps explain why certain CSS properties aren't available for inline elements.

Tweaking this default behaviour

Using horizontal padding on inline elements can feel awkward, since the spacing is only applied at the tips

### 5. The deal with inline-block

There is one more primitive display value we haven't talked about, and it's a sort of Frankenstein: `inline-block`.

Essentially, `inline-block` allows you to drop a `block` element into an `inline` context. It's a block in **inline's** clothing.

Another way to phrase this: it's an element that internally acts like a `block` element, but externally acts like an `inline` element. The parent container will treat it as an `inline` element, since it's external. But the element itself can be styled like a `block`.

In this example `./08-flow-layout/01-inline-block.html`, we've set our `<strong>` to be inline-block, and this means that the full universe of CSS is open to us. It means we're able to give it a `width`, as well as give it an on-hover scale effect (discussed further in Module 8). Try removing the display declaration to see the difference.

We've effectively turned our strong element into a block element, as far as its own CSS declarations are concerned. Everything between the four corners of the element is block in nature.

But from the paragraph's perspective, it's an inline element. It lays it out as an inline element, in the inline direction beside the text.

Note:

- Inline-block doesn't line-wrap