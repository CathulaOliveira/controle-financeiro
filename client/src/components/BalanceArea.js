import React, { useEffect, useState } from 'react';
import AccountService from '../services/AccountService';

const tableStyle = {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    boxShadow: "0px 0px 5px #CCC",
    borderRadius: 10,
    marginTop: 20,
}


export const BalanceArea = (props) => {
    const [form, setForm] = useState({
        account: null,
    });
    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        setAccounts(props.accounts);
    });


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
    return (
        <div>
            <table style={tableStyle}>
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
            </table>
        </div>
    );
}
export default BalanceArea;