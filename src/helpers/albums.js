const { reduce } = require('lodash');
const CombineUtil = require('../util/combinator');

module.exports = {
    getAlbumsWithinBudget(albums, maxAmount) {
        return reduce(albums, (res, albums) => {
            const totalAmount = reduce(albums, (amount, album) => {
                return parseFloat(album.get('amount')) + amount;   
            }, 0);

            if (totalAmount <= maxAmount) {
                res.push(albums);
            }
            return res;
        }, []).reverse();
    
    },
    getCombinationsWithinBudget(albums, maxAmount) {
        return this.getAlbumsWithinBudget(CombineUtil.getCombinationsFor(albums), maxAmount);
    } 
};
