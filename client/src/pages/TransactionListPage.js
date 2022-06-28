import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/DateHelper';
import { typeTransactionFormat } from '../helpers/EnumHelper';
import { currencyFormat } from '../helpers/NumberHelper';
import TransactionService from '../services/TransactionService';

export const TransactionListPage = (props) => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        TransactionService.findByUserLogged()
            .then((response) => {
                setData(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de movimentações');
            });
    };

    const onRemove = (id) => {
        TransactionService.remove(id)
            .then(() => {
                loadData();
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao remover a movimentação.');
            });
    }


    return (
        <div className="container">
            <h1 className="text-center">Lista de Movimentações</h1>
            <div className="text-center">
                <Link className="btn btn-success" to="/transactions/new">Nova Movimentação</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{formatDate(transaction.date, 'DD/MM/yyyy')}</td>
                            <td>{typeTransactionFormat(transaction.type)}</td>
                            <td>{currencyFormat(transaction.price)}</td>
                            <td>{transaction.category.name}</td>
                            <td>
                                <button className="btn btn-danger" 
                                  onClick={() => onRemove(transaction.id)}>
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

export default TransactionListPage;