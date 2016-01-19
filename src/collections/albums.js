const { remove, clone } = require('lodash');
const BB = require('backbone');
const Dispatcher = require('../dispatcher');
const AlbumModel = require('../models/album');
const Events = require('../events/albums');

const AppStorage = require('../appStorage');

const Albums = BB.Collection.extend({
    model: AlbumModel,

    initialize() {
        this.dispatchToken = Dispatcher.register(this.onDispatch.bind(this));
    },

    getAmount() {
        return this.reduce((amount, album) => {
            return amount + parseFloat(album.get('amount'));
        }, 0);
    },

    onDispatch(payload) {
        switch(payload.actionType) {
            case Events.ADD_ALBUM:
                this.reset([...this.toJSON(), {
                    album: payload.album,
                    amount: payload.amount
                }]);
                this.emitChange();
                break;
            case Events.REMOVE_ALBUM:
                const albumIndex = this.indexOf(this.get(payload.cid));
                this.reset([...remove(this.toJSON(), (v, i) => i !== albumIndex)]);

                this.emitChange();
                break;
            case Events.MOVE_ALBUM:
                 const { model, toModel } = payload;
                 const collection = clone(this);

                //Remove model
                const moveToIndex = collection.indexOf(collection.get(toModel.id));
                const removedModel = collection.remove(model.id);

                collection.add(removedModel, { at: moveToIndex });

                this.reset(collection.toJSON());
                this.emitChange();
                break;
        }
    },

    emitChange() {
        AppStorage.store({ albums: this.toJSON() });
        this.trigger('change');
    }
});

const AlbumCollection = new Albums(AppStorage.getKey('albums') || []);
module.exports = AlbumCollection;
