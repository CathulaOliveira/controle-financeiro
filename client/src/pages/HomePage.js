import React, { useEffect, useState } from 'react';
import { getCurrentMonth } from '../helpers/DateFilter';
import TableHome from '../components/TableHome';
import Dashboard from '../components/Dashboard';
import TransactionService from '../services/TransactionService'
import BalanceArea from '../components/BalanceArea';

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

const filteredList = [
    {
    title: "Teste"
    }
]

const HomePage = () => {
    const [list, setList] = useState([]);
    // const [filteredList, setFilteredList] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('');
    const [apiError, setApiError] = useState();
    const [entry, setEntry] = useState(0);
    const [output, setOutput] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setCurrentMonth(getCurrentMonth());
        loadEntry(getCurrentMonth());
        loadOutput(getCurrentMonth());
        loadBalance(getCurrentMonth());
    }

    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
        loadEntry(newMonth);
        loadOutput(newMonth);
        loadBalance(newMonth);
    }
    
    const loadEntry = (mesAno) => {
        let [year, month] = mesAno.split('-');
        TransactionService.calcularTotal(month, year, 'ENTRADA')
            .then((response) => {
                setEntry(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar o total de entradas');
            });
    };

    const loadOutput = (mesAno) => {
        let [year, month] = mesAno.split('-');
        TransactionService.calcularTotal(month, year, 'SAIDA')
            .then((response) => {
                setOutput(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar o total de saídas');
            });
    };

    const loadBalance = (mesAno) => {
        let [year, month] = mesAno.split('-');
        TransactionService.calcularTotal(month, year, 'TRANSFERENCIA')
            .then((response) => {
                setBalance(response.data);
                setApiError();
            })
            .catch((error) => {
                setApiError('Falha ao carregar o saldo total');
            });
    };
    
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
                    balance={balance}
                />
                <BalanceArea />
                <TableHome />
            </div>
        </div>
    );
}

export default HomePage;