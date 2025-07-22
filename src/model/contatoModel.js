import mongoose from 'mongoose';
import validator from 'validator';

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: {type: Date, default: Date.now}
});

// Modelo exportado
const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async register() {
        this.valida();
        if(this.errors > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    valida() {
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido.');
        }
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
        if(!this.body.nome && !this.body.email) {
            this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone');
        }
    }

    cleanUp() {

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        };
    }
}

export default Contato;
