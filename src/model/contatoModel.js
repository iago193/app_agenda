import mongoose from 'mongoose';
import validator from 'validator';

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
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
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    valida() {
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido.');
        }
        if (!this.body.nome) {
            this.errors.push('Nome é um campo obrigatório.');
        }

        if (!this.body.email && !this.body.telefone) {
            this.errors.push('Pelo menos e-mail ou telefone devem ser informados.');
        }

    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome.trim(),
            sobrenome: this.body.sobrenome.trim(),
            email: this.body.email.trim(),
            telefone: this.body.telefone.trim()
        };
    }

}

export default Contato;
