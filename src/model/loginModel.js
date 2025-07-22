import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    const senhaValida = await bcryptjs.compare(this.body.password, this.user.password);
    if (!senhaValida) {
      this.errors.push('Senha inválida.');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = await bcryptjs.genSalt(10);
    this.body.password = await bcryptjs.hash(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  valida() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido.');
    }

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }
  }

  cleanUp() {
    const { email, password } = this.body;

    this.body = {
      email: typeof email === 'string' ? email.trim() : '',
      password: typeof password === 'string' ? password : ''
    };
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe.');
  }
}

export default Login;
