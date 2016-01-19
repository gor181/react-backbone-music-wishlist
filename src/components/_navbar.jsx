const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classnames = require('classnames');

module.exports = React.createClass({

    mixins: [PureRenderMixin],

    displayName: 'NavBar',

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render() {
        const { className, title } = this.props;
        return (
            <nav className={classnames('navbar navbar-inverse navbar-static-top', className)}>
                 <div className='container-fluid'>
                     <div className='navbar-header'>
                         <a className='navbar-brand' href='#'>{title}</a>
                    </div>
                 </div>
            </nav>
        );
    }
});
