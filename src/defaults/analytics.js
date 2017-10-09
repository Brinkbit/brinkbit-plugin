const v4 = require( 'uuid/v4' );
const Plugin = require( '../plugin' );
const validate = require( '../validate' );

function initializePlayerData( brinkbit, player ) {
    class PlayerData extends Plugin {

        constructor( initialData ) {
            super( brinkbit, {
                initialData,
                defaults: {
                    _id: v4(),
                    dateCreated: new Date().toString(),
                    playerId: player.id,
                },
                pluginId: 'analytics',
                type: 'player',
                player,
            });
            this.middleware.save = this.saveMiddleware.bind( this );
        }

        static validate( method, data ) {
            return validate( data, {
                dateCreated: {
                    dataType: 'string',
                    presence: true,
                },
                playerId: {
                    dataType: 'string',
                    presence: true,
                },
                type: {
                    dataType: 'string',
                    presence: true,
                },
            });
        }

        saveMiddleware( options ) {
            const { body } = options;
            if ( !body.playerId ) {
                body.playerId = this.player.id;
            }
            return options;
        }

    }

    return PlayerData;
}

module.exports = {
    name: 'Analytic',
    type: 'player',
    initialize: initializePlayerData,
};
