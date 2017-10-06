const customError = require( 'custom-error-instance' );

const ValidationError = customError( 'ValidationError', {
    message: 'Validation failed',
    details: [],
});

module.exports = ValidationError;
