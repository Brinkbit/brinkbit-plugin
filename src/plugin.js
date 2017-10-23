/* eslint-disable no-param-reassign */

const merge = require( 'lodash.merge' );
const pick = require( 'lodash.pick' );
const get = require( 'lodash.get' );
const set = require( 'lodash.set' );
const eventEmitter = require( 'event-emitter' );

const validate = require( './validate' );
const normalizeArguments = require( './validate/normalizeArguments' );
const normalizeResponse = require( './validate/normalizeResponse' );
const BrinkbitEvent = require( './events' );
const { ensurePromise, promisifyValidation } = require( './util' );

class Plugin {

    constructor( brinkbit, config ) {
        validate.constructor( config, {
            type: {
                dataType: 'string',
                presence: true,
                inclusion: [
                    'player',
                    'game',
                    'core',
                ],
            },
            player: {
                dataType: 'object',
            },
            initialData: {
                dataType: 'object',
            },
            defaults: {
                dataType: 'object',
            },
            read: {
                dataType: 'array',
            },
            write: {
                dataType: 'array',
            },
            middleware: {
                dataType: 'object',
            },
            pluginId: {
                presence: true,
                dataType: 'string',
            },
        });
        const {
            initialData = {},
            defaults = {},
            type,
            read,
            write,
            middleware = {},
            pluginId,
        } = config;
        const player = config.player || brinkbit.Player.primary;
        this.pluginId = pluginId;
        this.player = player;
        this.brinkbit = brinkbit;
        this.read = read;
        this.write = write;
        this.type = type;
        this.middleware = middleware;
        const data = merge({}, defaults, initialData );
        validate.constructor( data, {
            _id: {
                dataType: 'string',
            },
        });
        this.data = data;
        if ( type === 'core' && data._id ) {
            this.id = initialData._id;
        }
    }

    getPlayer() {
        if ( !this.player && !this.brinkbit.Player.primary ) {
            return new Error( 'No player logged in' );
        }
        const player = this.player || this.brinkbit.Player.primary;
        if ( !player.token && !player.id ) {
            return new Error( 'No player logged in' );
        }
        return player;
    }

    validate() { // eslint-disable-line class-methods-use-this
        return Promise.resolve();
    }

    getUrl( method ) {
        const key = this.id || this.data._id;
        if ( this.type === 'core' ) {
            switch ( method ) {
                case 'post':
                    return `./${this.pluginId}/`;
                default:
                    return `./${this.pluginId}/${key}/`;
            }
        }
        if ( this.type === 'player' ) {
            return `./data/${this.pluginId}/players/${this.getPlayer().id}/keys/${key}`;
        }
        return `./data/${this.pluginId}/keys/${key}`;
    }

    getToken( options = {}) {
        return options.token || this.token || ( this.type !== 'core' ? this.getPlayer().token : undefined );
    }

    fetch( ...args ) {
        const options = normalizeArguments( ...args );
        const promise = ensurePromise( this.getToken( options ))
        .then(( token ) => {
            options.token = token;
            return ensurePromise( this.getUrl( 'get' ));
        })
        .then(( uri ) => {
            options.uri = options.uri || uri;
            return ensurePromise( this.processMiddleware( 'fetch', options ));
        })
        .then( opts =>
            promisifyValidation( this.validate( 'get', opts ))
            .then(() => this.brinkbit._get( opts )
        ))
        .then(( response ) => {
            merge(
                this.data,
                this.readable( this.type === 'core' ? response.body : response.body.dataValue )
            );
            if ( this.data._id ) {
                this.id = this.data._id;
            }
            this.emit( 'fetch', new BrinkbitEvent( 'fetch', response ));
            return response;
        });
        return normalizeResponse( promise, options );
    }

    save( ...args ) {
        const options = normalizeArguments( ...args );
        if ( options.body ) {
            this.set( options.body );
        }
        options.method = options.method || ( this.id ? 'put' : 'post' );
        options.body = options.method === 'put' || options.method === 'post' ? this.writeable( this.data ) : undefined;
        const promise = ensurePromise( this.getToken( options ))
        .then(( token ) => {
            options.token = token;
            return ensurePromise( this.getUrl( options.method ));
        })
        .then(( uri ) => {
            options.uri = options.uri || uri;
            return ensurePromise( this.processMiddleware( 'save', options ));
        })
        .then( opts =>
            promisifyValidation( this.validate( options.method, opts ))
            .then(() => this.brinkbit._request( opts ))
        )
        .then(( response ) => {
            merge(
                this.data,
                this.readable( this.type === 'core' ? response.body : response.body.dataValue )
            );
            if ( this.data._id ) {
                this.id = this.data._id;
            }
            this.emit( 'save', new BrinkbitEvent( 'save', response ));
            return response;
        });
        return normalizeResponse( promise, options );
    }

    destroy( options = {}) {
        const promise = ensurePromise( this.getToken( options ))
        .then(( token ) => {
            options.token = token;
            return ensurePromise( this.getUrl( 'delete' ));
        })
        .then(( uri ) => {
            options.uri = options.uri || uri;
            return ensurePromise( this.processMiddleware( 'destroy', options ));
        })
        .then( opts =>
            promisifyValidation( this.validate( 'delete', opts ))
            .then(() => this.brinkbit._delete( opts ))
        )
        .then(( response ) => {
            this.id = undefined;
            this.data.id = undefined;
            return response;
        });
        return normalizeResponse( promise, options );
    }

    get( path ) {
        if ( typeof path !== 'object' && typeof path !== 'string' ) {
            throw new Error( `${typeof path} is not a valid type for path` );
        }
        return typeof path === 'string' ? get( this.data, path ) : pick( this.data, path );
    }

    set( path, value ) {
        if ( typeof path === 'object' ) {
            merge( this.data, this.writeable( path ));
        }
        else if ( typeof path === 'string' ) {
            if ( this.write && !this.write.includes( path )) {
                throw new Error( `Path ${path} is not writeable!` );
            }
            set( this.data, path, value );
        }
        else {
            throw new Error( `${typeof path} is not a valid type for path` );
        }
    }

    writeable( data ) {
        return this.write ? pick( data, this.write ) : data;
    }

    readable( data ) {
        return this.read ? pick( data, this.read ) : data;
    }

    processMiddleware( method, opts ) {
        return typeof this.middleware === 'object' &&
            typeof this.middleware[method] === 'function' ? this.middleware[method]( opts ) : opts;
    }

    static create( ...args ) {
        const instance = new this( ...args );
        return instance.save()
        .then(() => instance );
    }

}

eventEmitter( Plugin.prototype );

module.exports = Plugin;
