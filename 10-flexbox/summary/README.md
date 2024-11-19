# Summary

## Alignment

We can change how children are distributed along the `primary axis` using the `justify-content` property

When it comes to the `primary axis`, we don't generally think in terms of aligning a single child. Instead, it's all **about the distribution of the group**.

We can bunch all the items up in a particular spot with

- flex-start
- center, and
- flex-end

Or we can spread them apart with

- space-between
- space-around, and
- space-evenly

For the `cross axis`, things are a bit different. We use the `align-items` property. It's interesting… With `align-items`, we have some of the same options as `justify-content`, but there isn't a perfect overlap.

Note:

- Unlike `justify-content` and `align-items`, `align-self` is **applied to the child element, not the container**. It allows us to change the alignment of a specific child along the cross axis
- `align-self` has all the same values as `align-items`. In fact, they change the exact same thing. `align-items` is syntactic sugar, a convenient shorthand that automatically sets the alignment on all the children at once.
- There is no `justify-self`

## Content vs. items

Qn. So, based on what we've learned so far, `Flexbox` might seem pretty arbitrary. Why is it justify-content and align-items, and not justify-items, or align-content? For that matter, why is there an align-self, but not a justify-self?

In `Flexbox`, items are distributed along the primary axis. By default, **they're nicely lined up, side-by-side**. I can draw a straight horizontal line that skewers all of the children, like a kebab

The `cross axis` is different, though. A **straight vertical line will only ever intersect one of the children**. It's less like a kebab, and more like a group of cocktail wieners

- There's a significant difference here. With the cocktail wieners, each item can move along its stick without interfering with any of the other items
- By contrast, with our primary axis skewering each sibling, a single item can’t move along its stick without bumping into its siblings

> This is the fundamental difference between the **primary/cross axis**. When we're talking about alignment in the cross axis, each item can do whatever it wants. In the primary axis, though, we can only think about how to distribute the group. That's why there's no `justify-self`

With all of this context in mind, let's give a proper definition to all 4 terms we've been talking about:

1. `justify` — to position something along the primary axis
2. `align` — to position something along the cross axis
3. `content` — a group of “stuff” that can be distributed
4. `items` — single items that can be positioned individually

And so: we have `justify-content` to control the distribution of the group along the primary axis, and we have `align-items` to position each item individually along the cross axis. These are the two main properties we use to manage layout with `Flexbox`.

- There's no `justify-items` for the same reason that there's no `justify-self`; when it comes to the primary axis, we have to think of the items as a group, as content that can be distributed.
- What about `align-content`? Actually, this does exist within `Flexbox`! We'll cover it a little later on, when we talk about the `flex-wrap` property.

## Hypothetical size

In `Flow layout`, `width` is a hard constraint. When we set `width: 2000px`, we'll get a 2000-pixel wide element, even if it has to burst through the side of the viewport

In `Flexbox`, however, the `width` property is implemented differently. It's more of a suggestion than a hard constraint

The specification has a name for this: the **hypothetical size**. It's the size an element would be, in a perfect utopian world, with nothing getting in the way

Alas, things are rarely so simple. In this case, the limiting factor is that the parent doesn't have room for a 2000px-wide child. And so, the child's size is reduced so that it fits. See example [here](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)

This is a core part of the `Flexbox philosophy`. **Things are fluid and flexible and can adjust to the constraints of the world**

Tip:

- The width property behaves differently depending on the layout mode used

## Growing and shrinking

So, we've seen that the `Flexbox` algorithm has some built-in flexibility, with hypothetical sizes.
But to really see how fluid `Flexbox` can be, we need to talk about 3 properties: `flex-grow`,
`flex-shrink`, and `flex-basis`

### 1. flex-basis

In a `Flex row`, `flex-basis` does the same thing as `width`. In a `Flex column`, `flex-basis`
does the same thing as `height`

As we've learned, everything in `Flexbox` is pegged to the `primary/cross axis`. For example,
`justify-content` will distribute the children along the primary axis, and it works exactly
the same way whether the primary axis runs horizontally or vertically.

`width` and `height` don't follow this rule, though! `width` will always affect the horizontal
size. It doesn't suddenly become `height` when we flip flex-direction from row to column

And so, the `Flexbox` authors created a generic `size` property called `flex-basis`.
It's like `width` or `height`, but pegged to the primary axis, like everything else.
It **allows us to set the hypothetical size of an element in the primary-axis direction,
regardless of whether that's horizontal or vertical**

Note:

> In general, we can use `width` and `flex-basis` interchangeably in a Flex row, but there
> are some exceptions. For example, the `width` property affects replaced elements like images
> differently than `flex-basis`. Also, `width` can reduce an item below its minimum size,
> while `flex-basis` can't.

### 2. flex-grow

By default, elements in a Flex context will shrink down to their minimum comfortable size
along the primary axis. This often creates extra space

We can specify how that space should be consumed with the `flex-grow` property. The default
value for `flex-grow` is `0`, which means that growing is opt-in. If we want a child to
gobble up any extra space in the container, we need to explicitly tell it so.

What if multiple children set `flex-grow`? In this case, the extra space is divvied up between
children, proportionally based on their flex-grow value

### 3. flex-shrink

In most of the examples we've seen so far, we've had extra space to work with. But what if
our children are too big for their container?

Tip:

- As a friendly reminder, `flex-basis` serves the same purpose as width. We'll use `flex-basis`
because it's conventional, but we'd get the exact same result if we used width!

I had an epiphany a while back about `flex-shrink`: we can think of it as the “inverse” of
`flex-grow`. They're two sides of the same coin:

1. `flex-grow` controls how the extra space is distributed when the items are smaller than their container.
2. `flex-shrink` controls how space is removed when the items are bigger than their container.

This means that only one of these properties can be active at once. If there's extra space,
`flex-shrink` has no effect, since the items don't need to shrink. And if the children are too
big for their container, flex-grow has no effect, because there's no extra space to divvy up.

#### Preventing shrinking

Sometimes, we don't want some of our Flex children to shrink, We can do this by setting
`flex-shrink: 0`

When we set `flex-shrink to 0`, we essentially “opt out” of the shrinking process altogether.
The `Flexbox` algorithm will treat f`lex-basis (or width)` as a hard minimum limit.

## The minimum size gotcha

There's one more thing we need to talk about here, and it's super important. It may be the single most helpful thing in this entire article!

In addition to the `hypothetical size`, there's another important size that the `Flexbox` algorithm cares about: the `minimum size`.

The `Flexbox` algorithm refuses to shrink a child below its `minimum size`. The content will overflow rather than shrink further, no matter how high we crank flex-shrink! For example Text inputs have a default minimum size of 170px-200px (it varies between browsers). That's the limitation we're running into above, also For an element containing text, the minimum width is the length of the longest unbreakable string of characters.

Here's the good news: We can redefine the minimum size with the min-width property. By setting `min-width: 0px` directly on the Flex child, we tell the `Flexbox` algorithm to overwrite the “built-in” `minimum width`. Because we've set it to `0px`, the element can shrink as much as necessary.

This same trick can work in `Flex columns` with the `min-height` property (although the problem doesn't seem to come up as often).

## Gaps

One of the biggest Flexbox quality-of-life improvements in recent years has been the `gap` property. `gap` allows us to create space in-between each Flex child. This is great for things like navigation headers

### Auto margins

There's one other spacing-related trick I want to share. It's been around since the early days of Flexbox, but it's relatively obscure, and it blew my mind when I first discovered it.

The margin property is used to add space around a specific element. In some layout modes, like Flow and Positioned, it can even be used to center an element, with margin: auto.

Auto margins are much more interesting in Flexbox. Auto margins will gobble up the extra space, and apply it to the element's margin. It gives us precise control over where to distribute the extra space.

## Wrapping

So far, all of our items have sat side-by-side, in a single row/column. The `flex-wrap` property allows us to change that. Most of the time when we work in two dimensions, we'll want to use CSS Grid, but `Flexbox + flex-wrap` definitely has its uses!

Tip:

- When we set `flex-wrap: wrap`, items won't shrink below their hypothetical size. At least, not when wrapping onto the next row/column is an option!

But wait! What about our kebab / cocktail weenie metaphor??

With `flex-wrap: wrap`, we no longer have a single primary axis line that can skewer each item. Effectively, each row acts as its own mini flex container. Instead of 1 big skewer, each row gets its own skewer:

To summarize what's happening here:

- flex-wrap: wrap gives us two rows of stuff.
- Within each row, align-items lets us slide each individual child up or down
- Zooming out, however, we have these two rows within a single Flex context! The cross axis will now intersect two rows, not one. And so, we can't move the rows individually, we need to distribute them as a group.
- Using our definitions from above, we're dealing with content, not items. But we're also still talking about the cross axis! And so the property we want is align-content.
