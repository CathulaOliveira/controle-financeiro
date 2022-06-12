import React, { useEffect, useState } from 'react';
import { formatDate } from '../helpers/DateFilter'
import TransactionService from '../services/TransactionService';

const tableStyle = {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    boxShadow: "0px 0px 5px #CCC",
    borderRadius: 10,
    marginTop: 20,
}


export const BalanceArea = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        
    };
    return (
        <div>
            <table style={tableStyle}>
                ...
            </table>
        </div>
    );
}
export default BalanceArea;