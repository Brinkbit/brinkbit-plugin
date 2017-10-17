const ValidationError = require( './validate/validationError' );

module.exports = {
    ensurePromise: function ensurePromise( value ) {
        if ( typeof value !== 'object' ) return Promise.resolve( value );
        if ( typeof value.then === 'function' ) return value;
        if (
            value instanceof Error ||
            value instanceof TypeError
        ) {
            return Promise.reject( value );
        }
        return Promise.resolve( value );
    },
    promisifyValidation: function promisifyValidation( value ) {
        if ( typeof value === 'object' ) {
            if ( typeof value.then === 'function' ) {
                return value;
            }
            else if (
                value instanceof ValidationError ||
                value instanceof Error ||
                value instanceof TypeError
            ) {
                return Promise.reject( value );
            }
            const error = new ValidationError();
            error.details = value;
            return Promise.reject( error );
        }
        else if ( typeof value === 'string' ) {
            return Promise.reject( value );
        }
        return Promise.resolve();
    },
};
