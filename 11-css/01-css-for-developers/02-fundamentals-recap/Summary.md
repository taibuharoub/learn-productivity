# Summary

## The bottom line

A common question I see from developers is "which unit should I use when?". Here's how I think about it:

- For `typography`, I generally use `rem`, because it has important accessibility benefits.
- When it comes to properties that relate to the `box model` — `padding`, `border`, `margin` — I usually use pixels. It's more intuitive than rem, and there isn't a clear accessibility win.
- For `width/height`, it'll **depend on whether I want the element to be a fixed size, or a relative size**. I might want one div to always be 250px wide, while another one should be 50% of the available space.
- For `color`, as we saw in the last lesson, I prefer `hsl`.

I reserve `em` for the rare cases when I want one property to scale directly with font size.

There are many other units as well. Some of them will be introduced later in the course. Others, like `in`, are only useful in very specific niche cases (eg. print media), so we won't be covering them.