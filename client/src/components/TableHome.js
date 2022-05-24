import React, { useEffect, useState } from 'react';
import { formatDate } from '../helpers/DateFilter'

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

const tdStyle = {
    padding: "10px 0px",
}

export const TableHome = () => {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setData([{date: '18/05/2022', category : {name: 'teste'}, title: 'title teste', value: 120000000}])
        // CategoryService.findAll()
        //     .then((response) => {
        //         setData(response.data);
        //         setApiError();
        //     })
        //     .catch((error) => {
        //         setApiError('Falha ao carregar a lista de categorias');
        //     });
    };
    return (
        <div>
            <table style={tableStyle}>
                <thead>
                    <tr style={thStyle}>
                        <th style={{width:'150px', padding: '10px 0px 10px 20px'}}>Data</th>
                        <th style={{width:'200px', padding: '10px 0px 10px 10px'}}>Categoria</th>
                        <th style={{padding: '10px 0px 10px 10px'}}>Título</th>
                        <th style={{width:'150px', padding: '10px 0px 10px 10px'}}>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td style={{width:'150px', padding: '10px 0px 10px 20px'}}>{item.date}</td>
                            <td  style={{width:'200px', padding: '10px 0px 10px 10px'}}>{item.category.name}</td>
                            <td  style={{padding: '10px 0px 10px 10px'}}>{item.title}</td>
                            <td  style={{width:'150px', padding: '10px 0px 10px 10px'}}>R$ {item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TableHome;