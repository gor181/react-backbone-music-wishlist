const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classnames = require('classnames');
const { map, flow, isFunction } = require('lodash');

const DRAGTYPE = 'ROW';

const TR = require('./row');
const DragTR = require('./draggable-row');

const DragSource = require('react-dnd').DragSource;
const DropTarget = require('react-dnd').DropTarget;
const DragDropContext = require('react-dnd').DragDropContext;
const HTML5Backend = require('react-dnd-html5-backend');

const DraggableTR = (onDragComplete) => {
    return flow(
        DropTarget(DRAGTYPE, {
            drop(droppedOn, monitor) {
                const droppedItem = monitor.getItem();
                onDragComplete(droppedItem, droppedOn);
            }
        }, (connect, monitor) => ({
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver()
        })),
        DragSource(DRAGTYPE, {
            beginDrag(props) {
                return props;
            }
        }, (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
            connectDragPreview: connect.dragPreview()
        }))
    )(DragTR);
};

const TH = (props) => {
    return (
        <th className={props.className}>
            {props.label}
        </th>
    );
};

const Table = React.createClass({

    mixins: [PureRenderMixin],

    displayName: 'Table',

    propTypes: {
        headings: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                label: React.PropTypes.string.isRequired,
                className: React.PropTypes.string
            }) 
        ).isRequired,
        rows: React.PropTypes.arrayOf(
            React.PropTypes.shape({
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
                style: React.PropTypes.func
            })
        ).isRequired,
        dragEnabled: React.PropTypes.bool,
        onDragComplete: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            dragEnabled: false 
        };
    },

    componentDidMount() {
        const { dragEnabled, onDragComplete } = this.props;

        if (dragEnabled && !isFunction(onDragComplete)) {
            console.warn('You have enabled row drag and drop but no onDragComplete function has been provided to handle results');
        }
    },

    render() {
        const { className, headings, rows, dragEnabled, onDragComplete } = this.props;

        const Row = dragEnabled ? DraggableTR(onDragComplete) : TR;

        return (
            <table className={classnames('table', className)}>
                <thead>
                    <tr>
                        { map(headings, (h, i) => (
                            <TH className={h.classname}
                                key={i}
                                label={h.label}
                            />
                        )) }
                    </tr>
                </thead>
                <tbody>
                    { map(rows, (r, i) => (
                        <Row 
                            {...r}
                            key={i}
                        />
                    )) }
                </tbody>
            </table>
        );
    }
});

module.exports = DragDropContext(HTML5Backend)(Table);
