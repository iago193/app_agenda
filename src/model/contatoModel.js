import mongoose from 'mongoose';

const ContatoSchema = new mongoose.Schema({
  titulo: {type: String, required: true },
  descricao: String
});

// Modelo exportado
const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }
}

export default Contato;
