const Dispatcher = require('../dispatcher');
const Events = require('../events/albums');

module.exports = {
    addAlbum(album, amount) {
        Dispatcher.dispatch({
            actionType: Events.ADD_ALBUM,
            album,
            amount
        });
    },
    removeAlbum(cid) {
        Dispatcher.dispatch({
            actionType: Events.REMOVE_ALBUM,
            cid
        });
    },
    moveAlbum(model, toModel) {
        Dispatcher.dispatch({
            actionType: Events.MOVE_ALBUM,
            model,
            toModel
        });
    }
};
