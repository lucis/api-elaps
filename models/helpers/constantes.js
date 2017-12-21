module.exports = {
    criaEndereco: ()=>({
            rua: String,
            n: String,
            cep: String,
            cidade: String,
            uf: String,
            bairro: String,
            complemento: String
    }),
    tiposFiliacao: ['dm-ativo', 'sen', 'sen-mac', 'esc', 'mae'],
    situacoesFiliado: ['reg', 'irr', 'afa', 'fal', 'exp', 'sus'],
    cargosFiliado: ['mc', '1c'],
    tiposEvento: ['pos', 'ini', 'ele', 'mae', 'pai', 'ema', 'ceo', 'cno'],
    publicosEvento: ['dmo', 'dmm', 'pub']
};