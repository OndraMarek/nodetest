import {expect} from 'chai';
import {sum} from '../src/sum';

describe('Muj prvni test', () => {
    it('Muj prvni test testuje 1+2', () => {
        expect(sum(1, 2)).to.equal(3);
    });
});
