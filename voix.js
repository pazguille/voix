(function (window) {
    'use strict';

    var VoiceRecognition = window.webkitSpeechRecognition;

    /**
     * Voix Constructor.
     * @constructor
     * @returns {voix} Returns a new instance of Voix.
     */
    function Voix() {
        this.initialize();
    }

    /**
     * Initializes a new instance of Voix.
     * @function
     * @returns {voix} Returns a new instance of Voix.
     */
    Voix.prototype.initialize = function () {

        this._collection = {};
        this._createRecognition();
        this._bindKeyEvents();

        return this;
    };

    /**
     * Creates a new instance of VoiceRecognition.
     * @function
     * @private
     * @returns {voix}
     */
    Voix.prototype._createRecognition = function () {
        var that = this;

        this._recognition = new VoiceRecognition();

        this._recognition.continuous = true;
        this._recognition.interimResults = false;
        this._recognition.lang = 'en-US';
        this._recognition.maxAlternatives = 1;

        this._recognition.onresult = undefined;

        this._recognition.start();

        return this;
    };

    /**
     * Binds key events.
     * @function
     * @private
     * @returns {voix}
     */
    Voix.prototype._bindKeyEvents = function () {
        var that = this,
            keypress = false;

        document.addEventListener('keydown', function (eve) {
            if (!keypress && eve.keyCode === 86) {
                that.start();
                keypress = true;
            }
        });

        document.addEventListener('keyup', function (eve) {
            if (keypress && eve.keyCode === 86) {
                keypress = false;
            }
        });

        return this;
    };

    /**
     * Transcripts commands.
     * @function
     * @private
     * @returns {voix}
     */
    Voix.prototype._result = function (eve) {
        this.stop();

        var that = this,
            i = eve.resultIndex,
            len = eve.results.length,
            j = 0,
            listeners,
            lenListeners,
            command;

        for (i; i < len; i += 1) {

            if (eve.results[i].isFinal) {
                command = eve.results[i][0].transcript.replace(/^\s+|\s+$/g, '');

                if (that._collection[command]) {
                    listeners = that._collection[command].listeners,
                    lenListeners = listeners.length;

                    for (j; j < lenListeners; j += 1) {
                        listeners[j].call();
                    }
                }

            }
        }
    };

    /**
     * Sets a new command with a listener to the collection.
     * @memberof! Voix.prototype
     * @function
     * @param {String} [command] - A given command.
     * @param {Funtion} listener - A given listener.
     * @returns {voix}
     */
    Voix.prototype.setCommand = function (command, listener) {
        if (this._collection[command] === undefined) {
            this._collection[command] = {
                'listeners': []
            };
        }

        this._collection[command].listeners.push(listener);

        return this;
    };

    /**
     * Rmoves a given command or its listener from the collection.
     * @memberof! Voix.prototype
     * @function
     * @param {String} [command] - A given command.
     * @param {Funtion} listener - A given listener.
     * @returns {voix}
     */
    Voix.prototype.removeCommand = function (command, listener) {
        var listeners = this._collection[command].listeners,
            i = 0,
            len = listeners.length;

        if (len !== undefined) {
            for (i; i < len; i += 1) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }

        if (listeners.length === 0 || listener === undefined) {
            delete this._collection[command];
        }

        return this;
    };

    /**
     * Returns the current language of the speech.
     * @memberof! Voix.prototype
     * @function
     * @returns {voix}
     */
    Voix.prototype.getLanguage = function () {
        return this.recognition.lang;
    };

    /**
     * Sets the language of the speech.
     * @memberof! Voix.prototype
     * @function
     * @param {String} [lang] - A given language.
     * @returns {voix}
     */
    Voix.prototype.setLanguage = function (lang) {
        this._recognition.lang = lang;
    };

    /**
     * Starts the recognition.
     * @memberof! Voix.prototype
     * @function
     * @returns {voix}
     */
    Voix.prototype.start = function () {
        var that = this;
        this._recognition.onresult = function (eve) {
            that._result.call(that, eve);
        };

        return this;
    };

    /**
     * Stops the recognition.
     * @memberof! Voix.prototype
     * @function
     * @returns {voix}
     */
    Voix.prototype.stop = function () {
        this._recognition.onresult = undefined;

        return this;
    };

    /**
     * Expose Voix
     */
    // AMD suppport
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('Voix', [], function () {
            return new Voix();
        });

    // CommonJS suppport
    } else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = new Voix();

    // Default
    } else {
        window.voix = new Voix();
    }

}(this));