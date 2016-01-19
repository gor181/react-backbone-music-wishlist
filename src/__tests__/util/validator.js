const expect = require('chai').expect;
const Validator = require('../../util/validator.js');

describe('Util:Validator', function () {
    it('validates amounts', function () {
        expect(Validator.isValidAmount(0)).to.be.true;
        expect(Validator.isValidAmount(1.2)).to.be.true;
        expect(Validator.isValidAmount("0")).to.be.true;
        expect(Validator.isValidAmount("99")).to.be.true;
    });

    it('validates text', function () {
        expect(Validator.isValidText("Hero!")).to.be.true;
        expect(Validator.isValidText("")).to.be.false;
    });
})

