import React from 'react';
import { typeTransactionFormat } from '../helpers/EnumHelper';
import { currencyFormat } from '../helpers/NumberHelper';
import { formatDate } from '../helpers/DateHelper';

const tableStyle = {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    boxShadow: "0px 0px 5px #CCC",
    borderRadius: 10,
    marginTop: 20,
}

const thStyle = {
    textAlign: 'left',
}


export const TableHome = ({transactions}) => {
    
    return (
        <div>
            <table style={tableStyle}>
                <thead>
                    <tr style={thStyle}>
                        <th style={{width:'150px', padding: '10px 0px 10px 20px'}}>Data</th>
                        <th style={{width:'200px', padding: '10px 0px 10px 10px'}}>Categoria</th>
                        <th style={{width:'200px', padding: '10px 0px 10px 10px'}}>Tipo</th>
                        <th style={{width:'150px', padding: '10px 0px 10px 10px'}}>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item, index) => (
                        <tr key={index}>
                            <td style={{width:'150px', padding: '10px 0px 10px 20px'}}>{formatDate(item.date, 'DD MMM')}</td>
                            <td  style={{width:'200px', padding: '10px 0px 10px 10px'}}>{item.category.name}</td>
                            <td  style={{width:'200px', padding: '10px 0px 10px 10px'}}>{typeTransactionFormat(item.type)}</td>
                            <td  style={{width:'150px', padding: '10px 0px 10px 10px'}}>{currencyFormat(item.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TableHome;