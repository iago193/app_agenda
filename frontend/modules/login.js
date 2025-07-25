import validator from 'validator';

class Login {
    constructor(formClasse) {
        this.form = document.querySelector(formClasse);
    }

    init() {
        this.event();
    }

    event() {
        if(!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validade(e);
        });
    }

    validade(e) {
        const el = e.target;
        const inputEmail = el.querySelector('input[name="email"]');
        const inputPassword = el.querySelector('input[name="password"]');

        let error = false;

        if (!validator.isEmail(inputEmail.value)) {

            const emailError = this.form.querySelector('.textEmailError');
            if (emailError) {
                this.createElement(emailError, '*E-mail inválido.');
            }

            error = true;
        }


        if(inputPassword.value.length < 3 || inputPassword.value.length > 12) {
            error = true;
            const password = this.form.querySelector('.textPasswordError');

            if (password) {
                this.createElement(password, '*A senha precisa ter entre 3 e 15 caracteres.');
            }
        }

        if(!error) el.submit();
    }

    createElement(container, message) {
        container.innerHTML = '';

        const p = document.createElement('p');
        p.textContent = message;
        p.style.color = 'red';
        container.appendChild(p);
    }
}



export default Login;