import React, { useEffect, useState } from 'react';
import { getCurrentMonth } from '../helpers/DateFilter';
import TableHome from '../components/TableHome';
import Dashboard from '../components/Dashboard';

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
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setCurrentMonth(getCurrentMonth());
    }

    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
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
                    income={income}
                    expense={expense}
                />
                <TableHome />
            </div>
        </div>
    );
}

export default HomePage;