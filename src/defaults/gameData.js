const v4 = require( 'uuid/v4' );
const Plugin = require( '../' );

function initializeGameData( brinkbit ) {
    class GameData extends Plugin {

        constructor( initialData ) {
            super( brinkbit, {
                initialData,
                defaults: {
                    _id: v4(),
                },
                pluginId: 'gamedata',
                type: 'game',
            });
        }
    }

    return GameData;
}

module.exports = {
    name: 'Data',
    type: 'game',
    initialize: initializeGameData,
};
