const v4 = require( 'uuid/v4' );
const Plugin = require( '../' );

function initializePlayerData( brinkbit, player ) {
    class PlayerData extends Plugin {

        constructor( initialData ) {
            super( brinkbit, {
                initialData,
                defaults: {
                    _id: v4(),
                },
                pluginId: 'playerdata',
                type: 'player',
                player,
            });
        }
    }

    return PlayerData;
}

module.exports = {
    name: 'Data',
    type: 'player',
    initialize: initializePlayerData,
};
