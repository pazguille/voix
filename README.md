# Voix JS

A JavaScript library to add voice commands to your sites, apps or games.

## Installation

    $ component install pazguille/voix

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
You can use the standalone version:
```html
<script src="voix.js"></script>
```

## How-to
WIP

## API
### voix.setCommand(command, listener)
Sets a new `command` with a `listener` to the collection.
- `command` - A given `command`.
- `listener` - A given `listener`.

```js
voix.setCommand('play', playVideo);
```

### voix.removeCommand(command, listener)
Removes a given `command` or its `listener` from the collection.
- `command` - A given `command` to remove.
- `listener` [optional] - A given `listener` to remove.

```js
voix.removeCommand('play', listener);

// or

scrolling.removeCommand('play');
```

### voix.start()
Starts the recognition.

```js
voix.start();
```

### voix.stop()
Stops the recognition.

```js
voix.stop();
```

### voix.setLanguage(lang)
Sets the language of the speech.
- `lang` - A given `language`.

```js
voix.setLanguage('es-AR');
```

### voix.getLanguage()
Returns the current language of the speech.

```js
voix.getLanguage(); // returns 'es-AR'
```

## Contact
- Guille Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
Licensed under the MIT license.

Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille).