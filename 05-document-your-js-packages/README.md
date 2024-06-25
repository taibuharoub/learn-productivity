# How to document your JavaScript package

Thanks to `JSDoc` it’s easy to write documentation that is coupled with your code and can be consumed by users in a variety of formats. When combined with a modern publishing flow like `JSR`, you can easily create comprehensive documentation for your package that not only fits within your workflow, but also integrates directly in the tools your users consume your package with.

Tip:

- When you write JSDoc-style comments in your code and publish to JSR, it will appear formatted on your package’s documentation page on JSR, VSCode tooltips and auto-complete, and in `deno doc` output.

## A brief intro to JSDoc

JSDoc turns your comments in your code into a documentation object that can be rendered and displayed in a variety of formats.

JSDoc comments are any block comments that begin with /** and end with */ that precede a block of code. Here’s an example:

```js
/** Adds two values and returns the sum. */
function sum(value1, value2) {
  return value1 + value2;
}
```

JSDoc comments can span multiple lines. Each line should start with * and should be indented by one space.

```js
/**
 * Adds two values and returns the sum.
 *
 * NOTE: JavaScript math uses IEEE 754 floating point arithmetic, so there may
 * be some rounding errors when adding two numbers.
 */
function sum(value1, value2) {
  return value1 + value2;
}
```

**The first paragraph of a JSDoc comment is the most important**. It is a summary of the symbol and is shown in tooltips, auto-completions in your editor, and is indexed by search. The first paragraph should be a concise description of the symbol, and should be written in a way that helps users quickly understand what this function does, concisely describe what the function does:

```js
/**
 * Replaces all spaces in a string with underscores.
 */
function replaceSpacesWithUnderscores(value) {
  return value.replace(/ /g, "_");
}
```

Additional information like the implementation details, caveats, or examples should be added in subsequent paragraphs. Because JSDoc supports markdown, you can even use headings to separate different sections.

Simple and concise summaries help users quickly filter through a list of symbols during auto-complete and find the one they need.

## Provide good type information

After the succinct descriptive summary, it’s important to provide good type information for the symbols you are exposing in your package. This serves two main purposes:

1. It allows auto-completion on parameters and return values in your editor, because the editor knows the types of the parameters and return values.
2. It helps users quickly filter through the list of functions to find the one they need
Here, we’ll use TypeScript to add type information.

```js
/**
 * Adds two values and returns the sum.
 */
export function sum(value1: number, value2: number): number {
  return value1 + value2;
}
```

## Tags, tags, tags

JSDoc supports a variety of tags that can be used to provide additional information about your symbols, such as `@param` for parameters, `@returns` for the return value, or `@typeParam` for type parameters.

```js
/**
 * Find a substring in a string and return the index of the first occurrence.
 *
 * @param value The string that will be searched for the needle.
 * @param needle The substring to search for in the string.
 * @returns The index of the first occurrence of the needle in the value, or -1 if the needle is not found.
 */
declare function find(value: string, needle: string): number;
```

## Add examples to JSDoc

Examples are another great way to help users quickly understand how to use your library. This is especially useful for functions that have complex behavior or many parameters. Examples can be added to your JSDoc comments using the @example tag

```js
/**
 * Find a substring in a string and return the index of the first occurrence.
 *
 * @example Find a substring in a string
 * ```ts
 * const value = "hello world";
 * const needle = "world";
 * const index = find(value, needle); // 6
 * ```
 *
 * @example Find a substring in a string that doesn't exist
 * ```ts
 * const value = "hello world";
 * const needle = "foo";
 * const index = find(value, needle); // -1
 * ```
 */
declare function find(value: string, needle: string): number;
```

The best examples are concise and demonstrate the most common use cases of your function. They should be easy to understand and can be copied and pasted into a project.

You can even provide multiple examples if there are multiple use cases worth mentioning.

```js
/**
 * (truncated for brevity)
 * @example Basic usage
 * ```ts
 * import { move } from "@std/fs/move";
 *
 * await move("./foo", "./bar");
 * ```
 *
 * This will move the file or directory at `./foo` to `./bar` without
 * overwriting.
 *
 * @example Overwriting
 * ```ts
 * import { move } from "@std/fs/move";
 *
 * await move("./foo", "./bar", { overwrite: true });
 * ```
 *
 * This will move the file or directory at `./foo` to `./bar`, overwriting
 * `./bar` if it already exists.
 */
```

## But what should I document?

You should document every symbol your package exports, including functions, classes, interfaces, and type aliases.

This extends beyond just one JSDoc comment per symbol. For classes and interfaces for example, you should document the symbol itself, each method or property on it, including constructors. Example:

```ts
/** Base interface for application listening options. */
export interface ListenOptionsBase {
  /** The port to listen on. If not specified, defaults to `0`, which allows the
   * operating system to determine the value. */
  port?: number;
  /** A literal IP address or host name that can be resolved to an IP address.
   * If not specified, defaults to `0.0.0.0`.
   *
   * __Note about `0.0.0.0`__ While listening `0.0.0.0` works on all platforms,
   * the browsers on Windows don't work with the address `0.0.0.0`.
   * You should show the message like `server running on localhost:8080` instead of
   * `server running on 0.0.0.0:8080` if your program supports Windows. */
  hostname?: string;
  secure?: false;
  /** An optional abort signal which can be used to close the listener. */
  signal?: AbortSignal;
}
```

If your package consists of multiple modules, adding a JSDoc comment to the top of each module file with the @module tag will be helpful. This module comment should include a description and examples of how to use its exported symbols. Here’s an example of @module in Oak’s application.ts file:

```js
/**
 * Contains the core concept of oak, the middleware application. Typical usage
 * is the creation of an application instance, registration of middleware, and
 * then starting to listen for requests.
 *
 * # Example
 *
 * ```ts
 * import { Application } from "jsr:@oak/oak@14/application";
 *
 * const app = new Application();
 * app.use((ctx) => {
 *   ctx.response.body = "hello world!";
 * });
 *
 * app.listen({ port: 8080 });
 * ```
 *
 * @module
 */
```

In JSR, the first paragraph becomes the description beneath the modules on the main docs page of your package

## Use markdown for a better documentation experience

Using markdown in JSDoc lets you organize your documentation in a more readable and engaging way

Some useful markdown features you can use in your JSDoc comments include:

- # my heading for section headings
- - hello world for bullet points
- **important** for bold
- _noteworthy_ for italic
- > quote for block quotes
- [foo](https://example.com) for links
- `console.log("foo")` for inline code snippets

On JSR, you can also use **[!IMPORTANT]** to highlight important information in your documentation that you want to draw attention to.

```js
// Copyright 2018-2024 the oak authors. All rights reserved. MIT license.

/** Middleware that converts the oak specific context to a Fetch API standard
 * {@linkcode Request} and {@linkcode Response} along with a modified context
 * providing some of the oak functionality. This is intended to make it easier
 * to adapt code to work with oak.
 *
 * There are two functions which will "wrap" a handler that operates off a
 * Fetch API request and response and return an oak middleware. The
 * {@linkcode serve} is designed for using with the {@linkcode Application}
 * `.use()` method, while {@linkcode route} is designed for using with the
 * {@linkcode Router}.
 *
 * > [!IMPORTANT]
 * > This is not intended for advanced use cases that are supported by oak,
 * > like integrated cookie management, web sockets and server sent events.
 * >
 * > Also, these are designed to be very deterministic request/response handlers
 * > versus a more nuanced middleware stack which allows advanced control.
 * > Therefore there is no `next()`.
 * >
 * > For these advanced use cases, create middleware without the wrapper.
 *
 * @module
 */
```

This module-level JSDoc comment will appear at the top level in JSR

# Link internally to other parts of your documentation

Sometimes, your documentation refers to another symbol within your package. To make it easy for your users to navigate throughout your docs, you can link within your documentation using the @link , @linkcode , and @linkplain tags. These tags accept a name paths or URL, from which it generates an HTML anchor element. Here’s an example:

```ts
/** Options to use when styling text with the {@linkcode print} function. */
export interface StyleOptions {
  /** The color to print the message in. */
  color: "black" | "red" | "green";
  /** Whether to print the message in bold. */
  bold: boolean;
  /** Whether to print the message in italic. */
  italic: boolean;
}

/**
 * A function that prints a message to the terminal with the given options.
 *
 * Note that on some versions of Windows, {@linkcode StyleOptions.color} may not
 * be supported in combination with {@linkcode StyleOptions.bold}.
 */
declare function print(message: string, options: StyleOptions): void;
```

You can also reference built-in JavaScript objects, like ArrayBuffer, and JSR will automatically link to the relevant MDN documentation.

What’s next?
Writing good JSDocs for your JavaScript package is critical to its success. Let’s recap the best practices:

- **Write a concise summary**: The first paragraph of your JSDoc comment should be a concise description of the symbol that helps users quickly understand what it does.
- **Provide good type information**: Type information helps users quickly filter through the list of functions and find the one they need.
- **Use tags**: Tags like @param, @returns, and @typeParam provide more information about specific parts of your function or class.
- **Add examples**: Examples help users quickly understand how to use your library.
- **Document everything**: Document every symbol you are exposing in your package, including whole modules if you expose multiple modules.
- **Link internally**: Use @link, @linkcode, and @linkplain to link to other parts of your documentation to help users navigate your docs.
- **Test your documentation**: Use deno test --doc to type check your documentation examples before publishing, and deno doc --lint to check for issues in your JSDoc comments.

By following these best practices, you can create comprehensive documentation for your package that helps users get up and running with your package as quickly as possible.

Resources:

[How to document your JavaScript package](https://deno.com/blog/document-javascript-package)

[JSDoc](https://jsdoc.app/)
