# components.json

> Configuration for your project.

The `components.json` file holds configuration for your project. We use it to understand how your project is set up and how to generate components customized for your project.

Note:

- The `components.json` file is optional and only required if you're using the CLI to add components to your project. If you're using the copy and paste method, you don't need this file.

You can create a components.json file in your project by running the following command

```bash
npx shadcn-ui@latest init
```

## style

The style for your components. This cannot be changed after initialization.

```js
{
  "style": "default" | "new-york"
}
```

## tailwind

Configuration to help the CLI understand how Tailwind CSS is set up in your project.

## tailwind.css

Path to the CSS file that imports Tailwind CSS into your project.

## tailwind.baseColor

This is used to generate the default color palette for your components. This cannot be changed after initialization.

[More on components.json](https://ui.shadcn.com/docs/components-json)
