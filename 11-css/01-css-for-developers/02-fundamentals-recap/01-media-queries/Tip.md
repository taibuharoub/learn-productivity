# Media Queries

Media queries allow us to modify our styles depending on particular parameters like screen width or device type

For Example:

## 1

```cs
@media(width: 360px) {
    h1 {
        color: red
    }
}
```

The above width is the width of your viewport

Tip:

- We use either `max-width` **to add styles on small screens**, or `min-width` **to add styles on larger ones**.

## 2

```css
@media(min-width: 800px) {
    h1 {
        color: red
    }
}
```

- Will be at 800px and greater than 800px
- At `min-width` of `800px` and upwards

## 3

```css
@media(max-width: 400px) {
    h1 {
        color: red
    }
}
```

- Will be at 400px and less than 400px

---

We can also combine both to do a range

```css
@media(min-width: 600px) and (max-width: 800px) {
    h1 {color: red; font-size:}
}
```

- Start with the large width

---

Important

For multiple queries for `max-width` start with the largest width and for `min-width` start with the lowest width

For example:

## 1 max-width

> > Start with large screens first when applying multiple queries

```css
@media(max-width: 1500px) {
    h1 {
        color: red
    }
}

@media(max-width: 1000px) {
    h1 {
        color: orange
    }
}

@media(max-width: 500px) {
    h1 {
        color: yellow
    }
}
```

## 2. min-width

> Start with small screens first when applying multiple queries

```css
@media(min-width: 500px) {
    h1 {
        color: red
    }
}

@media(min-width: 1000px) {
    h1 {
        color: orange
    }
}

@media(min-width: 1600px) {
    h1 {
        color: yellow
    }
}
```
