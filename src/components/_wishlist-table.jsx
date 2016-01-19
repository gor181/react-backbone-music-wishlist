const { reduce } = require('lodash');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const Table = require('./common/table/table');

const AlbumsActions = require('../actions/albums');

module.exports = React.createClass({

    mixins: [PureRenderMixin],

    displayName: 'WishlistTable',

    propTypes: {
        albums: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                album: React.PropTypes.string,
                amount: React.PropTypes.number
            })
        )
    },

    _buildTableHeadings() {
        return [ { label: 'Album' }, { label: 'Amount' }, { label: 'Remove' } ];
    },

    _buildTableData(albums) {
        return reduce(albums, (res, album) => {
            return res.push({
                id: album.cid,
                columns: [
                    { value: album.get('album') },
                    { value: parseFloat(album.get('amount')).toFixed(2) },
                    { value: <button onClick={() => AlbumsActions.removeAlbum(album.cid)}>&times;</button> }
                ]
            }) && res;
        }, []);
    },

    render() {
        const { albums } = this.props;
        return (
            <div className='table-responsive'>
                <Table 
                    className='table-hover table-stripped'
                    headings={this._buildTableHeadings()}
                    rows={this._buildTableData(albums)}
                    dragEnabled
                    onDragComplete={AlbumsActions.moveAlbum}
                />
            </div>
        ); 
    }
});

