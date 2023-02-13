## Miro Board Browser
Browse and open your boards without leaving the page.

### How to start locally

- Run `npm i` to install dependencies.
- Run `npm start` to start developing. \
  Your URL should be similar to this example:
 ```
 http://localhost:3000
 ```
- Point an app to this url and test on your Miro board.

### How to build the app

- Run `npm run build`. \
  This generates a static output inside [`dist/`](./dist), which you can host on a static hosting
  service.

### How to deploy the app

Deployment happens automatically with changes on main.

- Run `firebase deploy`. \
  This will deploy the local build to firebase hosting.

