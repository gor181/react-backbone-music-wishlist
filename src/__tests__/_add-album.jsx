const React = require('react');
const ReactDOM = require('react-dom');
const u = require('react-addons-test-utils');
const expect = require('chai').expect;
const AddAlbum = require('../components/_add-album.jsx');
const TextInput = require('../components/common/text-input.jsx');

describe('Component:AddAlbum', function () {
    
    it('renders', function () {
        const Component = u.renderIntoDocument(<AddAlbum onAdd={() => {}} />);
        expect(Component).to.exist;
    });

    it('submits and invokes callback with proper values', function (done) {
        const ALBUM = 'Fear of the dark. Iron Maiden';
        const AMOUNT = 150;

        const onAdd = (album, amount) => {
            expect(album).to.equal(ALBUM);
            expect(amount).to.equal(AMOUNT);
            done();
        };
        const Component = u.renderIntoDocument(<AddAlbum onAdd={onAdd} />);

        //Find all TextInput's and submit button
        const InputComponents = u.findAllInRenderedTree(Component, (component) => {
            return u.isCompositeComponentWithType(component, TextInput);
        });
        const Form = u.findRenderedDOMComponentWithTag(Component, 'form');

        //Expect 2.
        expect(InputComponents).to.have.length(2);

        //Get references, set values and simulate change
        const AlbumNode = ReactDOM.findDOMNode(InputComponents[0]);
        const AmountNode = ReactDOM.findDOMNode(InputComponents[1]);
        const FormNode = ReactDOM.findDOMNode(Form);

        AlbumNode.value = ALBUM;
        AmountNode.value = AMOUNT;

        u.Simulate.change(AlbumNode);
        u.Simulate.change(AmountNode);

        u.Simulate.submit(FormNode);
    });
})


