(function (window) {
    'use strict';

    var VoiceRecognition = window.webkitSpeechRecognition;

    /**
     * Description
     * @param
     * @returns
     */
    function Voix() {
        this.initialize();
    }

    Voix.prototype.initialize = function () {

        var that = this,
            keypress = false;

        this._collection = {};
        this._createRecognition();

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

    Voix.prototype._createRecognition = function () {
        var that = this;

        this._recognition = new VoiceRecognition();

        this._recognition.continuous = true;
        this._recognition.interimResults = false;
        this._recognition.lang = 'es-AR';
        this._recognition.maxAlternatives = 1;

        this._recognition.onresult = undefined;

        this._recognition.start();

        return this;
    };

    Voix.prototype.result = function (eve) {
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
                console.log(command);
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

    Voix.prototype.setCommand = function (command, listener) {
        if (this._collection[command] === undefined) {
            this._collection[command] = {
                'listeners': []
            };
        }

        this._collection[command].listeners.push(listener);

        return this;
    };

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

    Voix.prototype.getLang = function () {
        return this.recognition.lang;
    };

    Voix.prototype.setLang = function (lang) {
        this._recognition.lang = lang;
    };

    Voix.prototype.start = function () {
        var that = this;
        this._recognition.onresult = function (eve) {
            that.result.call(that, eve);
        };

        return this;
    };

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