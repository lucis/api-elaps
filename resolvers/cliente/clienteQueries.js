module.exports = {
    cliente: (_, args, context) => {
        return {nome: 'Luciano'};
    },
    clientes: (_, args, context) => {
        return [{nome: 'Luciano'}];
    }
};