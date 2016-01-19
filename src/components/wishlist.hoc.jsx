const React = require('react');
const Wishlist = require('./wishlist');

const AlbumsActions = require('../actions/albums');
const AlbumCollection = require('../collections/albums');

module.exports = React.createClass({

    displayName: 'WishlistAppHOC',

    getInitialState() {
        return this.importState();
    },

    importState() {
        return {
            albums: AlbumCollection.models,
            totalAmount: AlbumCollection.getAmount()
        };
    },

    onChange() {
        return this.setState(this.importState());
    },

    componentDidMount() {
        AlbumCollection.on('change', this.onChange);
    },

    componentWillUnmount() {
        AlbumCollection.off('change', this.onChange);
    },

    render() {
        return (<Wishlist {...this.state} />);
    }
});
