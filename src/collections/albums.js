const { findIndex } = require('lodash');
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
                this.add({
                    album: payload.album,
                    amount: payload.amount
                });
                this.emitChange();
                break;
            case Events.REMOVE_ALBUM:
                this.remove([payload.cid]) 
                this.emitChange();
                break;
            case Events.MOVE_ALBUM:
                const { model, toModel } = payload;

                //Remove model
                const moveToIndex = findIndex(this.models, { cid: toModel.id });
                const removedModel = this.remove(model.id);

                this.add(removedModel, { at: moveToIndex });
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
