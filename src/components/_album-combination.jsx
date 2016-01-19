const { map } = require('lodash');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classnames = require('classnames');

module.exports = React.createClass({

    mixins: [PureRenderMixin],

    displayName: 'AlbumCombination',

    propTypes: {
        albums: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render() {
        const { albums } = this.props;
        return (
            <ul className='list-group'>
                { map(albums, (album, index) => {
                    return (
                        <li className='list-group-item' key={index}>
                            {album.get('album')} [{album.get('amount')} £]
                        </li>
                    );
                } )}
            </ul>
        );
    }
});

