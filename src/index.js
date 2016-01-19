require('bootstrap/dist/css/bootstrap.css');
require('./css/wishlist.css'); 

const React = require('react');
const ReactDOM = require('react-dom');
const WishlistApp = require('./components/wishlist.hoc');

ReactDOM.render(<WishlistApp />, document.getElementById('app'));
