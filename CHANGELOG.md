# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Add stage pane on the right that appears when no object is selected, used to update project dimensions
- Add object pane that replaces the stage pane when an object is selected, used to delete an object
- Add ability to delete objects through the use of the delete key when an object is selected
- Add `useEditorContext` function to get parent editor's API, for building panes and other child components
- Add DesignStripe favicon

### Changed
- Refactor the aesthetics to utilize gradients and reduce whitespace
- Use flex-based masonry layout for the assets list instead of grid

### Fixed
- Use consistent ring color for focus elements

## [1.0.0]- 2022-10-11

This release establishes the base application which includes the main features required for initial launch. You can browse, filter, and select assets using the Asset Pane on the right, Drag and drop the assets onto the canvas, transform the assets on the canvas, and save your creation to a PNG. The canvas is persisted automatically through page reloads.

### Added
- Add Vite assets plugin which provides a virtual import for all art assets compiled from the `/src/assets/artwork` folder
- Add asset categories defined in `/src/constants.ts`
- Add artwork asset context and artwork categories contexts which provide their respective collections anywhere in the app
- Add asset pane to editor for displaying, filtering, and selecting artwork assets
- Add main editor component to the App
- Add central redux store for project state
- Add drag and drop from asset pane onto stage
- Add project state persistence to localstorage
- Add save to PNG button
