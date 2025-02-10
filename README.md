# Welcome to E-Binder

E-Binder is a mobile application that converts documents into interactive "binders" with advanced search capabilities. Users can load binder pages from Google Documents, enabling quick and efficient access to information. A key use case is assisting churches in swiftly retrieving resources like song lyrics. The import function automatically creates an entry for each page, using the first line as the title.

## Features

* Document Transformation: Convert documents into binders for organized access.
* Advanced Search: Quickly locate specific entries within binders.
* (In Progress) Google Document Integration: Import pages directly from Google Docs, with the first line used as the entry title.

## Usage

Upon launching the application:

* Import a Document: Use the import function to load a Google Document (In Progress. A default document is automatically loaded). The first line of the document will serve as the entry title.
* Navigate the Binder: Browse through the entries, which are organized for easy access.
* Utilize Search: Employ the advanced search feature to quickly find specific entries within your binder.

Read Mode                  |  Search Content           |  Settings                 |  Table of content
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![Read content](https://github.com/dlyfoung/e-binder/blob/81f3035d47b2ff3a7dceab46f266dcd8a2c7426c/assets/screenshots/Screenshot-Reader.png) | ![Search content](https://github.com/dlyfoung/e-binder/blob/81f3035d47b2ff3a7dceab46f266dcd8a2c7426c/assets/screenshots/Screenshot-Search.png) | ![Settings](https://github.com/dlyfoung/e-binder/blob/81f3035d47b2ff3a7dceab46f266dcd8a2c7426c/assets/screenshots/Screenshot-Settings.png) | ![Table of Content](https://github.com/dlyfoung/e-binder/blob/81f3035d47b2ff3a7dceab46f266dcd8a2c7426c/assets/screenshots/Screenshot-TableOfContent.png)

## Roadmap
### Improvements
- home page (containing binder name and organization name)
- help page
- view "all" pages: Paginate to avoid too many pages
- bottom navigation / swipe: prev | next
- settings: theme, font size, title per page or not, auto-refresh configuration (always, on open, never, etc.), only download on wifi (isWifiEnabled)
- load from multiple documents.
- load from multiple sources? (other than Google docs)
- load from different formats. Possibly format as the original document is formatted.
- search page contents
- error handling when the app "crashes"
- centralized styling
- "new version available" when a new version of the original document is available.
- scroll down to refresh the content.
- "dot" menu for faster access when screen is pressed for a second or so.

### Known bugs
- [BUG #1]: when changing page, the new page needs to be scrolled to the top.
- [BUG #2]: The X on top right after clicking on "View Table of Content" was a little unresponsive. Can it be a little more lenient so if you tap around that general area, it can close?


## Development

This application is built with React Native and powered by [Expo](https://expo.dev). It utilizes components from [gluestack-ui](https://gluestack.io) and employs [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) as an offline database to manage the source documents.

### Get started

1. Install dependencies

   ```zsh
   npm install
   ```

2. Start the app

   ```zsh
    npx expo start
   ```
or:
   ```zsh
    npm start
   ```

To test the application, you can use the `expo` mobile app or use an emulator (see [Android iOS Emulator extension in VS Code](https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate))


## Project structure

* `/app` contains the application code.


To lint and format code, use:

   ```zsh
    npm run lint
   ```

## Testing (E2E)

This project uses [Maestro](https://maestro.mobile.dev) to run e2e tests. The flow tests are set up in `/maestro`.

1. Install Maestro:

```zsh
brew tap mobile-dev-inc/tap
brew install maestro
```

2. Go to the e2e test folder:

```zsh
cd maestro
```

3. Start the mobile emulator.

4. Build and run the local app depending on the platform you are testing:

```zsh
npx expo run:ios
```
or
```zsh
npx expo run:android
```

3. Run the tests locally. The test output will be stored under `/maestro/.maestro/tests`.

To run all the tests:
```zsh
./e2e-tests.sh
```

To run a specific test:
```zsh
./e2e-tests.sh search/search-displays-none.yaml
```

## License

This project is licensed under the MIT License. See the [LICENSE file](https://github.com/dlyfoung/e-binder/blob/main/LICENSE.md) for details.

## Acknowledgements

E-Binder utilizes several open-source libraries and tools (React Native, Expo, Gluestack-ui, SQLite, and more). We extend our gratitude to the developers and contributors of these projects.