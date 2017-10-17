/* eslint-disable no-param-reassign */

const merge = require( 'lodash.merge' );

const validate = require( '../validate' );
const ValidationError = require( '../validate/validationError' );
const normalizeArguments = require( '../validate/normalizeArguments' );
const Plugin = require( '../plugin' );

function initialize( brinkbit ) {
    class Player extends Plugin {

        constructor( initialData ) {
            super( brinkbit, {
                initialData,
                read: [ '_id', 'dateCreated', 'email', 'username' ],
                write: [ 'email', 'password', 'username' ],
                pluginId: 'players',
                type: 'core',
            });
            if ( initialData ) {
                validate.constructor( initialData, {
                    username: {
                        dataType: 'string',
                    },
                    email: {
                        dataType: 'string',
                    },
                    password: {
                        dataType: 'string',
                    },
                    token: {
                        dataType: 'string',
                    },
                });
                if ( initialData.token ) {
                    this.token = initialData.token;
                }
            }
            this.middleware.save = this.saveMiddleware.bind( this );
            Player.plugins.forEach(( plugin ) => {
                this[plugin.name] = plugin.initialize( brinkbit, this );
            });
        }

        login( ...args ) {
            const options = normalizeArguments( ...args );
            options.password = options.uri;
            options.uri = undefined;
            const opts = merge({}, this.data, options );
            return this.brinkbit.login( opts, this )
            .then(() => this );
        }

        logout() {
            this.token = undefined;
            if ( this.isPrimary ) {
                this.brinkbit.logout();
            }
        }

        promote() {
            this.brinkbit.promotePlayer( this );
        }

        forgot( options ) {
            return this.brinkbit.forgot( options || this.data );
        }

        getUrl( method ) {
            const key = this.id || this.data._id;
            if ( method === 'get' && !this.id ) {
                return './playerinfo/';
            }
            if ( method === 'post' ) {
                return './players/';
            }
            return `./players/${key}/`;
        }

        saveMiddleware( options ) {
            if ( !this.id ) {
                options.passToken = false;
                options.body.gameId = options.body.gameId || this.brinkbit.gameId;
            }
            else {
                delete options.body.username;
                delete options.body.password;
            }
            return options;
        }

        validate( method, options ) {
            const data = options.body;
            switch ( method ) {
                case 'delete':
                    return Promise.reject( new Error( 'Cannot delete user' ));
                case 'post':
                    return validate( data, {
                        username: {
                            dataType: 'string',
                            presence: true,
                        },
                        email: {
                            dataType: 'string',
                            presence: true,
                        },
                        password: {
                            dataType: 'string',
                            presence: true,
                        },
                    });
                case 'put':
                    return validate( data, {
                        username: {
                            dataType: 'string',
                            presence: false,
                        },
                        email: {
                            dataType: 'string',
                        },
                        password: {
                            dataType: 'string',
                            presence: false,
                        },
                    })
                    .then(() => (
                        typeof options.token === 'string' ?
                            Promise.resolve() :
                            Promise.reject( new ValidationError( 'User is not logged in' ))
                    ));
                default:
                    return typeof options.token === 'string' ?
                        Promise.resolve() :
                        Promise.reject( new ValidationError( 'User is not logged in' ));
            }
        }

    }

    Player.plugins = [];

    return Player;
}

module.exports = {
    name: 'Player',
    type: 'core',
    initialize,
};
