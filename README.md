# Voix JS

A JavaScript library to add voice commands to your sites, apps or games.

It's cross-browser compatible:

- Chrome

## Installation

    $ component install pazguille/voix

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
You can use the standalone version:
```html
<script src="voix.js"></script>
```

## How-to
Create a new instance of Voix.
```js
var voix = new Voix('en-US');
```

## API
### Voix(lang)
Create a new instance of `Voix`.
- `lang`: A given language.

```js
var voix = new Voix('en-US');
```

### Voix#setCommand(command, listener)
Sets a new `command` with a `listener` to the collection.
- `command` - A given `command`.
- `listener` - A given `listener`.

```js
voix.setCommand('play', playVideo);
```

### Voix#removeCommand(command, listener)
Removes a given `command` or its `listener` from the collection.
- `command` - A given `command` to remove.
- `listener` [optional] - A given `listener` to remove.

```js
voix.removeCommand('play', playVideo);

// or

voix.removeCommand('play');
```

### Voix#start()
Starts the recognition.

```js
voix.start();
```

### Voix#stop()
Stops the recognition.

```js
voix.stop();
```

## Contact
- Guille Paz (Front-end developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
Licensed under the MIT license.

Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille).