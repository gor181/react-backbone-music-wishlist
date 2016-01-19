const React = require('react');
const u = require('react-addons-test-utils');
const expect = require('chai').expect;
const Wishlist = require('../components/wishlist.hoc.jsx');

describe('Wishlist App', function () {
    it('renders', function () {
        const app = u.renderIntoDocument(<Wishlist />);
        expect(app).to.exist;
    })
})
