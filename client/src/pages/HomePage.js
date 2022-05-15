import React, { useEffect, useState } from 'react';
import { getCurrentMonth } from '../helpers/DateFilter';
import TableHome from '../components/TableHome';

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

// const [list, setList] = useState([]);
// const [filteredList, setFilteredList] = useState([]);
// const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
// const [apiError, setApiError] = useState();

// useEffect(() => {
//     setFilteredList(filterListByMonth(list, currentMonth));
// }, [list, currentMonth]);

const HomePage = () => {
    return (
        <div>
            <div style={headerStyle}>
                <h1 style={h1Style}>Controle Financeiro</h1>
            </div>
            <div className='container'>
                <TableHome />
            </div>
        </div>
    );
}

export default HomePage;