# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing yet.

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
