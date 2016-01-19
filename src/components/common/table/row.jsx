const { map, noop } = require('lodash');
const React = require('react');

module.exports = React.createClass({
    
    displayName: 'TableRow',

    propTypes: {
        id: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        columns: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                value: React.PropTypes.oneOfType([
                    React.PropTypes.string,
                    React.PropTypes.number,
                    React.PropTypes.element
                ]).isRequired,
                className: React.PropTypes.string
            })
        ),
        style: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            style: noop
        };
    },

    render() {
        const { columns, style, ...rest } = this.props;
        return (
            <tr {...rest} style={style()}>
                { map(columns, (col, i) => {
                    return (<td className={col.className} key={i}>{col.value}</td>);
                }) }
            </tr>                
        );
    }
});
