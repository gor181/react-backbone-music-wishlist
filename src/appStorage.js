const APP_NAMESPACE = 'WISHLIST_APP';
const appStorage = require('./util/localStorage')(APP_NAMESPACE);

module.exports = appStorage;
