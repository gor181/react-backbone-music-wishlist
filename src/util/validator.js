const { trim } = require('lodash');

module.exports = {
    isValidAmount(amount) {
        return !isNaN(amount);
    },
    isValidText(text) {
        return trim(text).length > 0;
    }
};
