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

const calcularTotalEntradas = (filter) => {
    return axios.post(`/transactions/calcular-total-entradas`, filter, {headers: getAuthHeader()});
}

const calcularTotalSaidas = (filter) => {
    return axios.post(`/transactions/calcular-total-saidas`, filter, {headers: getAuthHeader()});
}

const findByAccount = (filter) => {
    return axios.post(`/transactions/find-by-account`, filter, {headers: getAuthHeader()});
}

const findByUserLogged = (filter) => {
    return axios.get(`/transactions/find-by-user-logged`, {headers: getAuthHeader()});
}

const TransactionService = {
    save,
    findAll,
    findOne,
    remove,
    calcularTotalEntradas,
    calcularTotalSaidas,
    findByAccount,
    findByUserLogged
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