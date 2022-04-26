import React from "react";
import Input from '../components/input';

export class Conta extends React.Component {
    state = {
        usuario: '',
        numero: '',
        agencia: '',
        banco: '',
        tipo: '',
        pendingApiCall: false,
        errors: {},
    }

    options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    onChangeUsuario = (event) => {
        const value = event.target.value;
        this.setState({ usuario: value });
    }

    onChangeNumero = (event) => {
        const value = event.target.value;
        this.setState({ numero: value });
    }

    onChangeAgencia = (event) => {
        const value = event.target.value;
        this.setState({ agencia: value });
    }

    onChangeBanco = (event) => {
        const value = event.target.value;
        this.setState({ banco: value });
    }

    onChangeTipo = (event) => {
        const value = event.target.value;
        this.setState({ tipo: value });
    }

    onClickCadastrar = () => {
        const conta = {
            usuario: this.state.usuario,
            numero: this.state.numero,
            agencia: this.state.agencia,
            banco: this.state.banco,
            tipo: this.state.tipo,
        }
        this.setState({ pendingApiCall: true });
        this.props.actions.postConta(conta)
        .then(response => {
            this.setState({ pendingApiCall: false });
        }).catch(apiError => {
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
                <h1 className="text-center">Conta</h1>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe o usuário"
                        type="text"
                        placeholder="Informe o usuário"
                        value={this.state.usuario}
                        onChange={this.onChangeUsuario}
                        hasError={this.state.errors.usuario && true}
                        error={this.state.errors.usuario}
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe o número"
                        type="text"
                        placeholder="Informe o número"
                        value={this.state.numero}
                        onChange={this.onChangeNumero}
                        hasError={this.state.errors.numero && true}
                        error={this.state.errors.numero}
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe a agência"
                        type="text"
                        placeholder="Informe a agência"
                        value={this.state.agencia}
                        onChange={this.onChangeAgencia}
                        hasError={this.state.errors.agencia && true}
                        error={this.state.errors.agencia}
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe o banco"
                        type="text"
                        placeholder="Informe o banco"
                        value={this.state.banco}
                        onChange={this.onChangeBanco}
                        hasError={this.state.errors.banco && true}
                        error={this.state.errors.banco}
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        label="Informe o tipo"
                        type="text"
                        placeholder="Informe o tipo"
                        value={this.state.tipo}
                        onChange={this.onChangeTipo}
                        hasError={this.state.errors.tipo && true}
                        error={this.state.errors.tipo}
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary"
                        disabled={this.state.pendingApiCall}
                        onClick={this.onClickCadastrar}
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

Conta.defaultProps = {
    actions: {
        postConta: () =>
            new Promise((resolve, reject) => {
                resolve({});
            }),
    }
}
export default Conta;