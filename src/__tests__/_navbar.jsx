const React = require('react');
const ReactDOM = require('react-dom');
const u = require('react-addons-test-utils');
const expect = require('chai').expect;
const NavBar = require('../components/_navbar.jsx');

describe('Component:NavBar', function () {
    
    let Component;

    before(function () {
        Component = u.renderIntoDocument(<NavBar title='Great NavBar!' className='ming' />);
    });

    it('renders', function () {
        expect(Component).to.exist;
    });

    it('displays set title', function () {
        const tag = u.findRenderedDOMComponentWithTag(Component, 'a');
        const node = ReactDOM.findDOMNode(tag);

        expect(node.textContent).to.equal('Great NavBar!');
    });


    it('sets the className', function() {
        const tag = u.findRenderedDOMComponentWithClass(Component, 'ming');
        expect(tag).to.exist;
    });
})

