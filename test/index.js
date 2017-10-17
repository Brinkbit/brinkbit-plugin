const chai = require( 'chai' );

global.expect = chai.expect;

describe( 'plugin', function() {
    require( './validate' );

    require( './player' );
});
