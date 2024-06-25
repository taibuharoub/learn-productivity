# JSR

> Publishing JavaScript Packages, JSR is a superset of NPM

`JSR` is a new JavaScript module registry, `JSR` stands for JavaScript Registry, it's obviously a place where you can publish JavaScript but it does have native typescript support and you are encouraged to publish the code you write i.e the typeScript code. It's a ECMAScript modules only, it's designed to work with npm

Features:

- Native TypeScript support
- ECMAScript modules only
- Designed to work alongside npm
- Explicitly built for all runtimes - Node/Deno/Bun/Cloudfare Workers/Browsers
- Provides great DX for publishers and consumers

You can think of `JSR` as a superset of `NPM`, packages in `JSR` can depend on `NPM` packages it's just an overlay where you can publish typescript first code(esm first code). Publishing JavaScript is also fully supported, if your users are not using typescript they can still use your modules, `jsr` takes care of the distribution part it handles the DOC generation, the d.ts files and to the large extent the cross-run time compatibility

For consumers, life gets better for package consumers, with `jsr` this has improved with:

- Auto-generated documentation
- Package scoring (to encourage people to use best practices)
- Runtime compatibility labels (to able to tell your users pretty clearly which runtime this software is for)
- Better audibility because code you see is the source code, not transpiled and minified files(Since you are publishing the code you write)

Publishing is great:

- No transpilation
- No CommonJS
- Just publish sources
- Simple and secure publishing
- Encouragement to adopt best practices

Security

Publishing a package from your dev machine

- `JSR` requires in-browser 2FA

When publishing from Github Actions

- `JSR` packages use OIDC for authentication(no leakable tokens)
- Generates provence attestation using sigstore by default

Resources

[JSR Github](https://github.com/jsr-io/jsr)

Complie our .ts file

```bash
# will use ems modules instead of commonjs
tsc index.ts --module nodenext
```

Run/test

```bash

# open node
node

# import our script
await import("./index.js")

# run the trueDate function
_.trueDate(new Date())
```

So in the past to publish to npm you would kind of need to:

- Set up some build process
- And you publish `.js` files
- And you probably don't wanna do it as just ems, you probably also need commonJS

With JSR we don't need all of this, Publishing with `jsr`:

- Go to `browse package`, select a scope, and also choose/add a `name` for the package, click `next`. This will give you instructions on how to publish the package
- Create a `jsr.json` file, add the given configs from above, under exports add/modify path to your file
- run `npx jsr publish`
- if your files are not checked into version control, run with the `--allow-dirty` flag e.g `npx jsr publish --allow-dirty`

Tip:

- To publish a new version/changes change the version in the `jsr.json` file and then run `npx jsr publish` again