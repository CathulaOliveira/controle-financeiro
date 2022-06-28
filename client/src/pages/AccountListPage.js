import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { typeAccountFormat } from '../helpers/EnumHelper';
import AccountService from '../services/AccountService';

export const AccountListPage = (props) => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        AccountService.findByUserLogged()
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de contas');
            });
    };

    const onRemove = (id) => {
        AccountService.remove(id)
            .then(() => {
                loadData();
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao remover a conta.');
            });
    }


    return (
        <div className="container">
            <h1 className="text-center">Lista de Contas</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/accounts/new">Nova Conta</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Número</th>
                        <th>Agência</th>
                        <th>Banco</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((account) => (
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.number}</td>
                            <td>{account.agency}</td>
                            <td>{account.bank}</td>
                            <td>{typeAccountFormat(account.type)}</td>
                            <td>
                                <Link className="btn btn-primary" 
                                    to={`/accounts/${account.id}`}>
                                    Editar
                                </Link>

                                <button className="btn btn-danger" 
                                  onClick={() => onRemove(account.id)}>
                                      Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </div>
    );
}

export default AccountListPage;