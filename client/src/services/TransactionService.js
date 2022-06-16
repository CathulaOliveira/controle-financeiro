import axios from 'axios';

const save = (account) => {
    return axios.post('/transactions', account, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/transactions', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/transactions/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/transactions/${id}`, {headers: getAuthHeader()});
}

const calcularTotal = (mes, ano, tipo) => {
    return axios.get(`/transactions/calcular-total/${mes}/${ano}/${tipo}`, {headers: getAuthHeader()});
}

const TransactionService = {
    save,
    findAll,
    findOne,
    remove,
    calcularTotal
}

const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization : 'Bearer ' +token }
    } else {
        return {};
    }
}

export default TransactionService;