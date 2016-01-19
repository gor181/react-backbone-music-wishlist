const React = require('react');

const NavBar = require('./_navbar');
const WishlistTable = require('./_wishlist-table');
const AddAlbum = require('./_add-album');
const AlbumCombinations = require('./_album-combinations');
const AlbumsActions = require('../actions/albums');

module.exports = React.createClass({

    displayName: 'Wishlist',

    propTypes: {
        albums: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                album: React.PropTypes.string,
                amount: React.PropTypes.number
            })
        ),
        totalAmount: React.PropTypes.number
    },

    render() {
        const { albums, totalAmount } = this.props;
        return (
            <div>
                <NavBar className='bar' title='Wishlist' />

                <div className='albums container'>
                    <div className='panel panel-default'>
                        <div className='panel-heading clearfix'>
                            <h3 className='panel-title pull-left'>Wishlist</h3>
                        </div>
                        <div className='panel-body'>
                            <AddAlbum onAdd={AlbumsActions.addAlbum} />
                            <WishlistTable albums={albums} />
                        </div>
                        <div className='panel-footer text-right'>
                            Total items: {albums.length} [{totalAmount.toFixed(2)} £]
                        </div>
                    </div>
                </div>

                <AlbumCombinations 
                    title='Album combinations matching your budget'
                    albums={albums}
                />
            </div>
        );
    }
});
