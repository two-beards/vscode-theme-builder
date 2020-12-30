# VS Code Theme Builder

This is a module for building a VS Code theme with variables and a config file.

## Why?

Creating VS Code themes is fairly tedious. You're working in an enormous JSON file with tons of property declarations, and you're reusing the same set of colors all over the place. But let's say you decide to tweak a color slightly because you find out it doesn't pass WCAG Accessibility standards. You have to do a find and replace on all instances of that color, and there are a few situations where you can get into trouble doing that.

It would be so great if JSON had variables, but since it doesn't... this was created.

## Installation

You can install the library as a dependency using Yarn or npm:

```sh
npm install --save-dev @two-beards/vscode-theme-builder
# or yarn add --dev @two-beards/vscode-theme-builder
```

## Usage

The library exports a binary (`build-theme`) that can be executed via an npm script. Typical usage would look something like this:

```json
{
    "scripts": {
        "build": "build-theme"
    }
}
```

The script looks for a file called `theme.config.js` in the root directory of your project (see below for configuration options). If you would prefer to use a different file name or location, you can pass that as a second input to the script instead:

```json
{
    "scripts": {
        "build": "build-theme ./build/config.js"
    }
}
```

The script above would look for the config file `config.js` inside the `build` directory.

When the script runs, it will take an input file (your theme with variables), parse it, replace the variables with the values provided in your config, and write the output to a file specified in your config (see options section below).

## Creating the theme

You can define values in the `theme.config.js` file (or whatever file you want, if you pass the file name in the build script). Values will be read from the config file when building the theme. For example, if you have a value `"red": "#f00"`, all instances of `{{ red }}` in your theme will be replaced with `#f00`.

### Configuration Options

| Property | Required | Default Value | Description | Example |
| -------- | -------- | ------------- | ----------- | ------- |
| `name` | `true` | n/a | The name of your theme. | `"Early Riser"` |
| `inputFile` | `true` | n/a | The name of your theme file with variables. | `"theme.json"` |
| `outputDir` | `false` | `themes` | The directory that your compiled theme file will be placed. | `"themes"` |
| `outputFileName` | `false` | The `name` field, kebab-cased, plus `-color-theme.json`. | The final file name for the theme. We ensure it gets the `.json` extension if you forget it. | `"early-riser-color-theme.json"` |

The rest of the config file you can structure however makes the most sense to you. When you write your theme, you can use an interpolation syntax to inject variables from your config file. If you take a look at the `theme.config.js` file in this repo, your theme file might look like this:

```json
{
  "name": "{{ name }}",
  "colors": {
    "activityBar.border": "{{ colors.blue }}",
    "activityBar.background": "{{ colors.lightGray }}",
    "activityBar.foreground": "{{ colors.gray }}",
    "activityBar.activeForeground": "{{ colors.blue }}"
  }
}
```

The goal here is that it is super easy to change variables in a single place, and allow for greater flexibility when creating theme files.

### Multiple Themes

Some themes have multiple themes within them. Some examples would be a high contrast theme in addition to the normal one. Another example would be something like the Material suite of themes, which contain 3 or 4 different color schemes that you can choose from in one theme. In these situations, it would be nice to be able to build multiple themes in one go. We totally support that too - instead of exporting an object in `theme.config.js`, you can export an array of config objects and each one will be processed.
