const React = require('react');
const ReactDOM = require('react-dom');
const u = require('react-addons-test-utils');
const expect = require('chai').expect;
const TextInput = require('../../components/common/text-input.jsx');

describe('Common Component:TextInput', function () {

    it('renders', function () {
        const Component = u.renderIntoDocument(<TextInput onChange={() => {}}/>);
        expect(Component).to.exist;
    });

    it('returns value typed in', function (done) {
        const onChange = (value) => {
            expect(value).to.equal('Hooray!');
            done();
        };
        const Component = u.renderIntoDocument(<TextInput onChange={onChange}/>);
    
        const input = u.findRenderedDOMComponentWithTag(Component, 'input');
        const inputNode = ReactDOM.findDOMNode(input);

        inputNode.value = 'Hooray!';

        u.Simulate.change(inputNode);
    });
})
