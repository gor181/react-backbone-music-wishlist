const { map } = require('lodash');
const React = require('react');
const classnames = require('classnames');

const TextInput = require('./common/text-input');
const AlbumCombination = require('./_album-combination');

const Validator = require('../util/validator');
const AlbumsHelper = require('../helpers/albums');

module.exports = React.createClass({

    displayName: 'AlbumCombinations',

    propTypes: {
        title: React.PropTypes.string.isRequired,
        albums: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                album: React.PropTypes.string,
                amount: React.PropTypes.number
            })
        ),
    },

    getInitialState() {
        return {
            maxAmount: {
                value: 0,
                hasError: false
            },
            combinations: []
        };
    },

    componentWillReceiveProps(nextProps) {
        this._generateCombinations(nextProps.albums, this.state.maxAmount.value);
    },

    _onChange(amount, albums) {
        const isValid = Validator.isValidAmount(amount);
        this.setState({
            maxAmount: {
                value: amount,
                hasError: !isValid
            }
        }, () => isValid && this._generateCombinations(albums, amount));
    },

    _generateCombinations(albums, maxAmount) {
        this.setState({
            ...this.state,
            combinations: AlbumsHelper.getCombinationsWithinBudget(albums, maxAmount)
        });
    },

    render() {
        const { title, albums } = this.props;
        const { maxAmount, combinations } = this.state;

        return (
            <div className='album-combinations container'>
                <div className='panel panel-default'>
                    <div className='panel-heading clearfix'>
                        <div className='pull-left'>
                            <h3 className='panel-title'>{title}</h3>
                        </div>
                        <div className={classnames('form-group combination-amount pull-right', { 'has-error': maxAmount.hasError })}>
                            <div className='input-group'>
                                <div className='input-group-addon'>£</div>
                                <TextInput
                                    className='pull-right'
                                    placeholder='Enter amount'
                                    onChange={(amount) => this._onChange(amount, albums)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='panel-body'>
                        { !!maxAmount.value && combinations.length > 0 ? map(combinations, (albums, index) => {
                            return (
                                <div className='col-md-3' key={index}>
                                    <AlbumCombination albums={albums} />
                                </div>
                            );
                        }) : <h4 className='text-center text-uppercase'>There are no albums matching your budget</h4>}
                    </div>
                </div>
            </div> 
        );
    }
});
