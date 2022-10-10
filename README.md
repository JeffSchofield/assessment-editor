# DesignStripe Assessment - Artwork Editor

A prototype drag-and-drop artwork editor built with React and Tailwind CSS. Created for an assessment with DesignStripe.

## What is this?

This is a prototype graphical editor app built with React and Tailwind CSS. It features the an artwork asset browser that lets you drag-and-drop artwork onto the canvas, allowing you to build larger scenes out of pre-made artwork!

## Installation

Clone this repo and install with your favorite Node.js package manager:

```bash
git clone https://github.com/JeffSchofield/assessment-editor.git
cd assessment-editor
yarn install
```

### Development

Run the development server using the `dev` script:

```bash
yarn dev
```

This starts a Vite server in dev mode. The server is accessible from http://localhost:5173 by default.

### Building for production

Use the `build` script to build the project:

```bash
yarn build
```

## Usage

Choose an art asset from the pane on the left side. You can click it to add it to the stage or drag and drop it onto the stage. After placing, position the asset how you would like. Use the save button to export your work as a PNG.

### Updating Asset Categories

Asset categories are defined in `/src/constants.ts`. You can edit the constant object to update existing categories or add new ones.

The `id` property must be unique. Be careful about changing existing category IDs, as the changes will need to be reflected within an asset manifest JSON.

### Adding Assets

Assets are stored within the project as a pair of SVG/JSON files within the `/src/assets/artwork` folder. The SVG file is the art asset itself, and the JSON file is a manifest containing metadata about the art asset.

## Testing

### Unit testing

Unit tests are run by `Vitest`. Use the `test:unit` script to run Vitest in watch mode:

```bash
yarn test:unit
```

Vitest will not enter watch mode when part of a CI pipeline.

## Linting & Formatting

Linting is handled by `eslint` and formatting is handled by `prettier`. Formatting happens on every commit, and can be triggered manually using either the `lint` or `format` scripts:

```bash
yarn lint # Displays any issues with code
yarn format # Automatically formats the codebase
```

It is recommended to set up VS Code with the eslint plugin and enable linting on save.

## Credits

The icons used in this project are from the [Ionicons](https://ionic.io/ionicons) set.
