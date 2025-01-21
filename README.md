# Welcome to E-Binder

E-Binder is an mobile application transforming a document into a "binder" with advanced search features. The binder page can be loaded via a Google document. An example of usage is helping churches to access resources quickly (such as lyrics). The import function will load a page as an entry using the first line as "title."

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm start
   ```

To test the application, you can use the `expo` mobile app or use an emulator (see [Android iOS Emulator extension in VS Code](https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate))


## Project structure

The project uses React native with [`gluestack-ui`'s components](https://gluestack.io).

* `/app` contains the application code.


To lint and format code, use:

   ```bash
    npm run lint
   ```

The application uses SQLite has offline database to manage the source document.

## Roadmap
- view "all" pages (or at least a defined number of pages)
- bottom navigation: prev | next
- updatable font size
- theme colors?
- load from different sources / formats