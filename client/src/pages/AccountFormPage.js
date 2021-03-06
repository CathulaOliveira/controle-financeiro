import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/input';
import AccountService from '../services/AccountService';

export const AccountFormPage = () => {
    const [form, setForm] = useState({
        id: null,
        number: '',
        agency: '',
        bank: '',
        type: '',
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            AccountService.findOne(id)
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            number: response.data.number,
                            agency: response.data.agency,
                            bank: response.data.bank,
                            type: response.data.type,
                        });
                        setApiError();
                    } else {
                        setApiError('Falha ao editar a conta.');
                    }
                })
                .catch(() => {
                    setApiError('Falha ao editar a conta.');
                });
        }
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
        const account = {
            id: form.id,
            number: form.number,
            agency: form.agency,
            bank: form.bank,
            type: form.type ? form.type : null,
        };
        setPendingApiCall(true);
        AccountService.save(account)
            .then(() => {
                setPendingApiCall(false);
                setApiError();
                navigate('/accounts');
            })
            .catch((error) => {
                console.log(error.response.data.validationErrors)
                setPendingApiCall(false);
                if (error.response.data && error.response.data.validationErrors) {
                    setErrors(error.response.data.validationErrors);
                    setApiError();
                } else {
                    setApiError('Falha ao salvar a conta.');
                }
        });
    }

    return (
        <div className="container">
            <h1 className="text-center">Cadastro de Conta</h1>
            <div className="col-12 mb-3">
                <Input
                    name="number"
                    label="N??mero"
                    placeholder="Informe o n??mero"
                    value={form.number}
                    onChange={onChange}
                    hasError={errors.number && true}
                    error={errors.number} 
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="agency"
                    label="Ag??ncia"
                    placeholder="Informe a ag??ncia"
                    value={form.agency}
                    onChange={onChange}
                    hasError={errors.agency && true}
                    error={errors.agency} 
                />
            </div>
            <div className="col-12 mb-3">
                <Input
                    name="bank"
                    label="Banco"
                    placeholder="Informe o banco"
                    value={form.bank}
                    onChange={onChange}
                    hasError={errors.bank && true}
                    error={errors.bank} 
                />
            </div>
            <div className="col-12 mb-3">
                <label>Tipo</label>
                <select
                    className="form-control"
                    name="type"
                    value={form.type}
                    onChange={onChange}
                >
                    <option>Selecione</option>
                    <option key="CONTA_CORRENTE" value="CONTA_CORRENTE">Conta Corrente</option>
                    <option key="CONTA_POUPANCA" value="CONTA_POUPANCA">Conta Poupan??a</option>
                    <option key="CARTAO" value="CARTAO">Cart??o</option>
                </select>
                {errors.type && (
                    <div className="invalid-feedback d-block">{errors.type}</div>
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
                <Link to="/accounts" />
            </div>
        </div>
    );
}
export default AccountFormPage;