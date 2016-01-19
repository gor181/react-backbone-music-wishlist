const React = require('react');
const ReactDOM = require('react-dom');
const classnames = require('classnames');

const TextInput = require('./common/text-input');
const Validator = require('../util/validator');

module.exports = React.createClass({

    displayName: 'AddAlbum',

    propTypes: {
        onAdd: React.PropTypes.func.isRequired
    },

    initialState() {
        return {
            album: { value: '', hasError: false },
            amount: { value: 0, hasError: false }
        };
    },

    getInitialState() {
        return this.initialState();
    },

    _onSubmit(evnt) {
        evnt.preventDefault();

        const { album, amount } = this.state;
        const isValid = Validator.isValidAmount(amount.value) && Validator.isValidText(album.value);

        if (!isValid) {
            return;
        }

        this.setState(this.initialState(), () => {
            this.props.onAdd(album.value, parseFloat(amount.value));
            ReactDOM.findDOMNode(this.refs.albumInput).focus();
        });
    },

    render() {
        const { amount, album } = this.state;

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <form className='form-inline clearfix' onSubmit={this._onSubmit}>
                        <div className='col-md-9 add-album'>
                            <div className={classnames('form-group', { 'has-error': album.hasError })}>
                                <TextInput
                                    ref='albumInput'
                                    className='add-album-input'
                                    placeholder='Add new album'
                                    value={album.value || undefined}
                                    onChange={(v) => this.setState({
                                        album: {
                                            value: v,
                                            hasError: !Validator.isValidText(v)
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className={classnames('form-group', { 'has-error': amount.hasError })}>
                                <div className='input-group'>
                                    <div className='input-group-addon'>£</div>
                                    <TextInput
                                        placeholder='Amount'
                                        value={amount.value || undefined}
                                        onChange={(v) => this.setState({
                                            amount: {
                                                value: v,
                                                hasError: !Validator.isValidAmount(v)
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-1'>
                            <button type='submit' className='btn btn-primary'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});
