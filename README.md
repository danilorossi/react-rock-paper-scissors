# Instructions

### Requirements

This commands are for a Mac OSX system, you need `node` installed in your system and `gulp` (this is just for building SemanticUI theme).

### Installing

Expand the .zip archive: it should create a `rock-paper-scissors-game` folder.

Enter the folder:

```
> cd rock-paper-scissors-game
```

Install the node server dependencies:

```
rock-paper-scissors-game> npm install
```

Enter the React client folder:

```
rock-paper-scissors-game> cd react-client
```

Install the React client dependencies:


```
rock-paper-scissors-game/react-client> npm install
```

**NOTE**: during the dependencies installation process SemanticUI will ask to be installed. Choose the first option (`Automatic`), then answer `Yes` to the first questions, and use default values for any other questions it may ask.

### Running

This project is made up by two different project:

* the RodeJS server
* the React client

From the root directory (`rock-paper-scissors-game`, in the example), simply run:

```
rock-paper-scissors-game> npm run start
```

This command will:

* start the react client webpack dev server on port 3000 (just serve the app)
* start the node server on port 3001 (which implement the actual API for the project)
* open the `http://localhost:3000` in your default browser

The react client webpack server is configured as a proxy to the main node server, so that the RPC from the client to the root node server will go through with no problem and without breaking the cross origin policy.

You can start manually both project by running the `npm run start` command in the react client folder, and the ´npm run server´ from the root folder.
