import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import TransactionService from '../services/TransactionService';
import CategoryService from '../services/CategoryService';
import AccountService from '../services/AccountService';
import '../css/form.css';

export const TransactionFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        description: '',
        category: null,
        account: null,
        type: '',
        date: null,
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (id) {
            console.log(id)
            TransactionService.findOne(id)
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            description: response.data.description,
                            category: response.category,
                            account: response.account,
                            price: response.price
                        });
                        setApiError();
                    } else {
                        setApiError('Falha ao editar a movimentação.');
                    }
                })
                .catch(() => {
                    setApiError('Falha ao editar a movimentação.');
                });
        }
        CategoryService.findAll().then((response) => {
            setCategories(response.data);
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao carregar a combo de categorias.');
        });
        AccountService.findByUserLogged().then((response) => {
            setAccounts(response.data);
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao carregar a combo de contas.');
        });
    }, [id]);


    const onChange = (event) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        });
        setErrors((previousError) => {
            return {
                ...previousError,
                [name]: undefined,
            }
        });
    };

    const onSubmit = () => {
        const transaction = {
            id: form.id,
            description: form.description,
            category: { id: form.category },
            account: { id: form.account },
            price: form.price,
            type: form.type,
            date: form.date,
        };
        setPendingApiCall(true);
        TransactionService.save(transaction)
            .then(() => {
                setPendingApiCall(false);
                setApiError();
                navigate('/transactions');
            })
            .catch((error) => {
                setPendingApiCall(false);
                if (error.response.data && error.response.data.validationErrors) {
                    setErrors(error.response.data.validationErrors);
                    setApiError();
                } else {
                    setApiError('Falha ao salvar a movimentação.');
                }
        });
    }

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Movimentação</h1>
            <div className="col-12 mb-3">
                <label>Conta</label>
                <select
                    className="form-control"
                    name="account"
                    value={form.account}
                    onChange={onChange}
                >
                    <option>Selecione</option>
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.bank} - {account.type}</option>
                    ))}
                </select>
                {errors.account && (
                    <div className="invalid-feedback d-block">{errors.account}</div>
                )}
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="price"
                    label="Valor"
                    placeholder="Informe o valor"
                    value={form.price}
                    onChange={onChange}
                    hasError={errors.price && true}
                    error={errors.price} 
                />
            </div>
            <div className="col-12 mb-3">
                <div className='op1'>
                    <label>Tipo</label>
                    <select
                        className="form-control"
                        name="type"
                        value={form.type}
                        onChange={onChange}
                    >
                        <option>Selecione</option>
                        <option key="ENTRADA" value="ENTRADA">Entrada</option>
                        <option key="SAIDA" value="SAIDA">Saída</option>
                        <option key="TRANSFERENCIA" value="TRANSFERENCIA">Transferência entre contas</option>
                    </select>
                    {errors.type && (
                        <div className="invalid-feedback d-block">{errors.type}</div>
                    )}
                </div>
                <div className='op2'>
                    <label>Data e hora</label>
                    <br/>
                    <input 
                        className="form-control"
                        name="date"
                        value={form.date}
                        type='date'
                        onChange={onChange}
                    ></input>
                    {errors.date && (
                        <div className="invalid-feedback d-block">{errors.date}</div>
                    )}
                </div>
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="description"
                    label="Descrição"
                    placeholder="Informe a descrição"
                    value={form.description}
                    onChange={onChange}
                    hasError={errors.name && true}
                    error={errors.name} 
                />
            </div>
            <div className="col-12 mb-3">
                <label>Categoria</label>
                <select
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                >
                    <option>Selecione</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.category && (
                    <div className="invalid-feedback d-block">{errors.category}</div>
                )}
            </div>
            <div className="text-center">
                <ButtonWithProgress
                    onClick={onSubmit}
                    disabled={pendingApiCall ? true : false}
                    pendingApiCall={pendingApiCall}
                    text="Cadastrar" />
            </div>
            {apiError && (<div className="alert alert-danger">{apiError}</div>)}
            <div className="text-center">
                <Link to="/transactions" />
            </div>
        </div>
    );
}
export default TransactionFormPage;