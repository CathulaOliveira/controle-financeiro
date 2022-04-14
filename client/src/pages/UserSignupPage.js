import React from "react";
import Input from '../components/input';

export class UserSignupPage extends React.Component {
    state = {
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: '',
        pendingApiCall: false,
        errors: {},
    }

    onChangeNome = (event) => {
        const value = event.target.value;
        this.setState({ nome: value });
    }

    onChangeEmail = (event) => {
        const value = event.target.value;
        this.setState({ email: value });
    }

    onChangeSenha = (event) => {
        const value = event.target.value;
        this.setState({ senha: value });
    }
    onChangeConfirmaSenha = (event) => {
        const value = event.target.value;
        this.setState({ confirmaSenha: value });
    }

    onClickSignup = () => {
        const usuario = {
            email: this.state.email,
            nome: this.state.nome,
            senha: this.state.senha,
        }
        this.setState({ pendingApiCall: true });
        this.props.actions.postSignup(usuario).then(response => {
            this.setState({ pendingApiCall: false });
        })
            .catch(apiError => {
                let errors = { ...this.state.errors }
                if (apiError.response.data && apiError.response.data.validationErrors) {
                    errors = { ...apiError.response.data.validationErrors }
                }
                this.setState({ pendingApiCall: false, errors });
            });

    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe o seu nome"
                        type="text"
                        placeholder="Informe o seu nome"
                        value={this.state.nome}
                        onChange={this.onChangeNome}
                        hasError={this.state.errors.nome && true}
                        error={this.state.errors.nome}
                    />

                </div>
                <div className="col-12 mb-3">
                    <label>Informe o seu email</label>
                    <input className="form-control"
                        type="text" placeholder="Informe o seu email"
                        value={this.state.email}
                        onChange={this.onChangeEmail} />
                </div>
                <div className="col-12 mb-3">
                    <label>Informe o sua senha</label>
                    <input className="form-control"
                        type="password" placeholder="Informe a sua senha"
                        value={this.state.senha}
                        onChange={this.onChangeSenha} />
                </div>
                <div className="col-12 mb-3">
                    <label>Confirme sua senha</label>
                    <input className="form-control"
                        type="password" placeholder="Confirme sua senha"
                        value={this.state.confirmaSenha}
                        onChange={this.onChangeConfirmaSenha} />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary"
                        disabled={this.state.pendingApiCall}
                        onClick={this.onClickSignup}
                    >
                        {this.state.pendingApiCall && (
                            <div className="spinner-border text-light spinner-border-sm mr-sm-1"
                                role="status">
                                <span className="visually-hidden">Aguarde...</span>
                            </div>
                        )}
                        Cadastrar
                    </button>
                </div>
            </div>
        )
    }
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({});
            }),
    }
}
export default UserSignupPage;