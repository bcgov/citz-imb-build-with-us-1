# IMB Campus Frontend

<img src="https://scrimba.com/articles/content/images/2022/08/Create-a-new-React-app-with-Vite-main.png">

## General Information 🗒️

- Uses Node v18, node:18.12.1-bullseye-slim as the docker image
- React v18
- Vite for bundling and dev server
- NPM package "serve" as "production" web server

## Directory Structure 🗂️

This section dissects each folder in the "src" folder, and what it's purpose is

```js
|-- assets // Stores images, svg's, and fonts which the app uses
|
|-- components // Contains general use React components for the app
|
|-- css // All of the styles used by the app
|
|-- layout // Contains React components who's purpose is to structure the page
|
|-- pages // React components which work as the different pages in the application
|
|-- providers // Special React components which "provide" the app's state to the rest of the application
|
|-- services // Composed of folders, each folder represents a "service", which is a set of functions that help the developer perform actions within the app
|
|-- utils // Utility functions which provide additional, often specific functionality
```

## Application Structure 🏟️

### State
Application state refers to the data currently being used by the app, this could be a list of posts returned by the api, the users information, or any piece of data that we want to be accessible througout the app.

IMB Campus makes use of React 18's [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) and [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) hook, to maintain the data that the application needs. This hook mimics the functionality of the library "redux", allowing us to build robust state storage, within React.

### Services
IMB Campus abstracts interacting with the api behind "services". Each service is a custom React hook which returns a number of functions that interact with the api. Some of the services you'll find in IMB Campus include the "users" service, and the "journeys" service.

### Components
Because IMB Campus is using React, we break the frontend app into React components. Depending on the use of the component itself, it is placed in one of the following directories:
- Pages are placed in the "pages" directory. 
- Components which are used as structure/layout are placed in the "layout" directory
- General purpose components are placed in the "components" directory