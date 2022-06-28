import React, { useEffect, useState } from 'react';
import { typeAccountFormat } from '../helpers/EnumHelper';
import { currencyFormat } from '../helpers/NumberHelper';
import AccountService from '../services/AccountService';
import '../css/container.css';


const containerStyle =  {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    boxShadow: "0px 0px 5px #CCC",
    borderRadius: 10,
    marginTop: 20,
    display: 'flex',
}

export const BalanceArea = (props) => {
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState();
    const [accounts, setAccounts] = useState([]);
    const [accountSelected, setAccountSelected] = useState(); 

    useEffect(() => {
        setAccounts(props.accounts);
    });


    const onChange = (event) => {
        const { value, name } = event.target;
        props.onAccountChange(value);
        loadBalance(value);
    };

    const loadBalance = (accountId) => {
        AccountService.getBalance(accountId).then((response) => {
            setAccountSelected(response.data)
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao carregar a combo de contas.');
        });
    } 

    return (
        <div>
            <div className='container' style={containerStyle}>
                <div className='container-padding container-flex-2'>
                    <label>Conta</label>
                    <br></br>
                    <select
                        className="form-control"
                        name="account"
                        onChange={onChange}
                    >
                        <option>Selecione</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>{account.bank} - {typeAccountFormat(account.type)}</option>
                        ))}
                    </select>
                    {errors.account && (
                        <div className="invalid-feedback d-block">{errors.account}</div>
                    )}
                </div>
                <div className='container-flex-1'>
                    <label>Saldo</label>
                    <br></br>
                    <b><label className='padding-top'>{currencyFormat(accountSelected)}</label></b>
                </div>
            </div>
        </div>
    );
}
export default BalanceArea;