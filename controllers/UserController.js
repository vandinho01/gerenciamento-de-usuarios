class UserController {
    constructor(formIdCreate, formIdUpdate, tableId) {
        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEdit();
        this.selectAll();
        this.onComparePassword();
    }

    //Edita o usuário existente
    onEdit() {

        document.querySelector('#box-user-update .btn-cancel').addEventListener('click', e => {

            this.showPanelCreate();

        });

        this.formUpdateEl.addEventListener('submit', event => {

            event.preventDefault();

            let btn = this.formUpdateEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index];

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values);

            this.getPhoto(this.formUpdateEl).then((content) => {

                if (!values.photo) {
                    result._photo = userOld._photo;
                } else {
                    result._photo = content;
                }

                let user = new User();

                user.loadFromJSON(result);

                user.save();

                this.getTr(user, tr);

                this.updateCount();

                this.formUpdateEl.reset();

                btn.disabled = false;

                this.showPanelCreate();

            }, (e) => {
                console.error(e);
            });

        })

    }

    //Cria um novo usuário
    onSubmit() {

        this.formEl.addEventListener("submit", event => {
            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]")
            btn.disabled = true;

            let values = this.getValues(this.formEl);

            if (!values) {
                btn.disabled = false;
                return false;
            }

            this.getPhoto(this.formEl).then((content) => {
                values.photo = content;

                values.save()

                this.addLine(values);

                this.formEl.reset();

                btn.disabled = false;

            }, (e) => {
                console.error(e);
            });
        });
    }

    // Lê a foto
    getPhoto(formEl) {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            const elements = [...formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            })

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);

            };

            fileReader.onerror = (e) => {
                reject(e);
            }

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    }

    // Lê e valida o formulário
    getValues(formEl) {
        let user = {};
        let isValide = true;

        [...formEl.elements].forEach((field, index) => {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');
                isValide = false;

            } else if (field.parentElement.classList.contains('has-error')) {

                field.parentElement.classList.remove('has-error');

            }

            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if (field.name == "admin") {

                user[field.name] = field.checked;

            } else {
                user[field.name] = field.value;
            }
        });

        if (!isValide) {
            return false;
        }

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
    } //Fechando a classe GetValues

    // Carrega usuários salvos
    selectAll() {

        let users = User.getUserStorage();

        users.forEach(dataUser => {

            let user = new User();

            user.loadFromJSON(dataUser);

            this.addLine(user);

        });

    }

    //Adiciona linha na tabela
    addLine(dataUser) {

        let tr = this.getTr(dataUser);

        this.tableEl.appendChild(tr);

        this.updateCount();

    }

    // Monta o HTML de uma linha
    getTr(dataUser, tr = null) {

        if (tr === null) tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.addEventsTr(tr);

        return tr;

    }

    // Liga eventos da linha
    addEventsTr(tr) {

        tr.querySelector('.btn-delete').addEventListener("click", e => {

            if (confirm("Deseja realmente excluir?")) {
                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user));

                user.remove();

                tr.remove();

                this.updateCount();
            }


        });

        tr.querySelector(".btn-edit").addEventListener("click", e => {

            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {
                let field = this.formUpdateEl.querySelector('[name=' + name.replace('_', '') + ']');

                if (field) {

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;

                        case 'radio':
                            field = this.formUpdateEl.querySelector('[name=' + name.replace('_', '') + '][value=' + json[name] + ']');
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];
                    }

                }

            }

            this.formUpdateEl.querySelector('.photo').src = json._photo;

            this.showPanelUpdate();

        });
    }

    // Exibe o formulário de criação
    showPanelCreate() {

        document.getElementById('box-user-create').style.display = 'block';
        document.getElementById('box-user-update').style.display = 'none';

    }

    // Exibe o formulário de edição
    showPanelUpdate() {

        document.getElementById('box-user-create').style.display = 'none';
        document.getElementById('box-user-update').style.display = 'block';

    }

    // Atualiza os contadores ( Usuário e administradores);
    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;


    }

    onComparePassword() {
        let primayPassword = document.querySelector('.password-1');
        let secondPassword = document.querySelector('.password-2');
        let span = document.querySelector('.span-required');
        let btnForm = this.formEl.querySelector('[type=submit]');

        secondPassword.addEventListener('input', () => {

            if (primayPassword.value == secondPassword.value) {
                span.style.display = 'none';
                secondPassword.style.border = '';
                btnForm.disabled = false;


            } else {
                span.style.display = '';
                span.style.color = 'red';
                secondPassword.style.border = '1px solid red'
                btnForm.disabled = true;
                

            }

        })

    }

}
