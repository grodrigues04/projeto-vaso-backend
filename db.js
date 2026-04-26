const clientDb  = require('./mongo.js');



const banco = {
    listar_historico: async (params) => {
        console.log('Listando histórico com parâmetros:', params);
        try {
            await clientDb.client.connect();
            const database = await clientDb.client.db("vaso");
            const collection = await database.collection("history");
            return await collection.find().toArray();
        } catch (e) {
            console.log('Ocorreu um erro ao recuperar os itens da tabela', e);
        }
    },

    salvar_umidade: async (umidade) => {
        //Salva os mais recentes, remove os mais antigos se passar de 30 itens e salva os antigos em uma coleção de histórico
        try {

            await clientDb.client.connect();

            const db = clientDb.client.db("vaso");
            const current = db.collection("current_infos");
            const history = db.collection("history");

            await current.insertOne({
                umidade,
                data: new Date()
            });

            const count = await current.countDocuments();

            if (count > 30) {
                const excesso = count - 30;

                const antigos = await current
                    .find()
                    .sort({ data: 1 })
                    .limit(excesso)
                    .toArray();

                if (antigos.length > 0) {
                    const ids = antigos.map(doc => doc._id);

                    await history.insertMany(antigos);

                    await current.deleteMany({
                        _id: { $in: ids }
                    });
                }
            }

            console.log("Salvo no mongoDB:", umidade);
        } catch (e) {
            console.log('Erro ao salvar umidade', e);
        }
    },

    dados_atuais: async () => {
        try {
            await clientDb.client.connect();
            const database = await clientDb.client.db("vaso");
            const collection = await database.collection("current_infos");
            return await collection.find().toArray();

        } catch (e) {
            console.log('Ocorreu um erro ao recuperar os itens da tabela', e);
        }
    }



}

module.exports = banco;