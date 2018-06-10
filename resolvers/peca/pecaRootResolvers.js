const pecasService = require('./../../services/pecasService');

module.exports = {
    Peca: {
        id: (root) => root._id
    }
};