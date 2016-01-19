const { trim } = require('lodash');

module.exports = {
    isValidAmount(amount) {
        if (!isNaN(amount)) {
            return amount >= 0;
        }

        return false;
    },
    isValidText(text) {
        return trim(text).length > 0;
    }
};
