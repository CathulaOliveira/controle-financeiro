import React from 'react';

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

const TableHome = () => {
    return (
       <table style={tableStyle}>
           <thead>
               <tr style={thStyle}>
                   <th style={{width:'100px', padding: '10px 0px 10px 10px'}}>Data</th>
                   <th style={{width:'150px', padding: '10px 0px 10px 10px'}}>Categoria</th>
                   <th style={{padding: '10px 0px 10px 10px'}}>Título</th>
                   <th style={{width:'100px', padding: '10px 0px 10px 10px'}}>Valor</th>
               </tr>
           </thead>
       </table>
    );
}
export default TableHome;