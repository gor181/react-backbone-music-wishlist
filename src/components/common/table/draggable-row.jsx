const { map } = require('lodash');
const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

module.exports = React.createClass({

    mixins: [PureRenderMixin],
    
    displayName: 'DraggableTableRow',

    propTypes: {
        id: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired,
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
        style: React.PropTypes.func,
        connectDragSource: React.PropTypes.func.isRequired,
        connectDragPreview: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        isOver: React.PropTypes.bool.isRequired
    },

    getDefaultProps() {
        return {
            style(isDragged, isHovered) {
                return {
                    opacity: isDragged ? 0.5 : 1,
                    cursor: 'move',
                    backgroundColor: isHovered ? '#EDFAFF' : 'transparent'
                };
            }
        };
    },
 
    render() {
        const { id, columns, connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver, style, ...rest } = this.props;

        return connectDragPreview(connectDragSource(connectDropTarget(
            <tr style={style(isDragging, isOver)} {...rest}>
                { map(columns, (col, i) => {
                    return (<td className={col.className} key={i}>{col.value}</td>);
                }) }
            </tr>                
        )));
    }
});
