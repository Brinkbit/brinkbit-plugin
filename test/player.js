const playerConfig = require( '../src/defaults/player' );

const Player = playerConfig.initialize({ Player: {} });

describe( 'player', function() {
    it( 'should extract a token provided in constructor', function() {
        const player = new Player({ token: 'token' });
        expect( player ).to.have.property( 'token' ).and.equal( 'token' );
    });
});
