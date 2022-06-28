import React, { useEffect, useState } from 'react';
import { getCurrentMonth } from '../helpers/DateHelper';
import TableHome from '../components/TableHome';
import Dashboard from '../components/Dashboard';
import TransactionService from '../services/TransactionService'
import BalanceArea from '../components/BalanceArea';
import AccountService from '../services/AccountService';

const headerStyle = {
    backgroundColor: '#820ad1',
    height: 150,
    textAlign: 'center',
}

const h1Style = {
    margin: 0,
    padding: 0,
    color: '#FFF',
    paddingTop: 30,
}

const HomePage = () => {
    const [currentMonth, setCurrentMonth] = useState('');
    const [apiError, setApiError] = useState();
    const [entry, setEntry] = useState(0);
    const [output, setOutput] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [accountSelected, setAccountSelected] = useState(null);
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setCurrentMonth(getCurrentMonth());
        AccountService.findByUserLogged().then((response) => {
            setAccounts(response.data);
            setApiError();
        }).catch((erro) => {
            setApiError('Falha ao carregar a combo de contas.');
        });
    }

    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
    }

    const handleAccountChange = (newAccount) => {
        setAccountSelected(newAccount);
    }

    useEffect(() => {
        reloadData();
    }, [currentMonth, accountSelected]);

    const reloadData = () => {
        let [year, month] = currentMonth.split('-');
        if (month && year && accountSelected) {     
            let filter = {
                month: month,
                year: year,
                accountId: accountSelected
            }
            TransactionService.calcularTotalEntradas(filter)
            .then((response) => {
                setEntry(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar o total de entradas');
            });
            TransactionService.calcularTotalSaidas(filter)
            .then((response) => {
                setOutput(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar o total de entradas');
            });
            TransactionService.findByAccount(filter)
            .then((response) => {
                setTransactions(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar a lista de movimentações');
            });
        }
    }

    return (
        <div>
            <div style={headerStyle}>
                <h1 style={h1Style}>Controle Financeiro</h1>
            </div>
            <div className='container'>
                <Dashboard 
                    currentMonth={currentMonth}
                    onMonthChange={handleMonthChange}
                    entry={entry}
                    output={output}
                />
                <BalanceArea accounts={accounts} onAccountChange={handleAccountChange}/>
                <TableHome transactions={transactions}/>
            </div>
        </div>
    );
}

export default HomePage;