const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classnames = require('classnames');
const { isEmpty, noop } = require('lodash');

module.exports = React.createClass({

    mixins: [PureRenderMixin],

    displayName: 'TextInput',

    propTypes: {
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },

    getDefaultProps() {
        return {
            placeholder: 'Please start typing..'
        };
    },

    getInitialState() {
        return {
            value: ''
        };
    },

    componentWillMount() {
        this._setValue(this.props.value);
    },

    componentWillReceiveProps(props) {
        this._setValue(props.value);
    },

    _onChange(evnt) {
        const { onChange } = this.props;
        const text = evnt.target.value;

        this._setValue(text, onChange(text));
    },

    _setValue(value, cb = noop) {
        this.setState({
            value
        }, cb);
    },

    render() {
        const { placeholder, className, ...rest } = this.props;
        const { value } = this.state;

        return (
            <input
                {...rest}
                type='text'
                className={classnames('form-control', className)}
                placeholder={placeholder}
                onChange={this._onChange}
                value={value}
            />
        );
    }
});
