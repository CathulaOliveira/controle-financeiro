import axios from 'axios';

const save = (account) => {
    return axios.post('/accounts', account, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/accounts', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/accounts/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/accounts/${id}`, {headers: getAuthHeader()});
}

const findByUserLogged = () => {
    return axios.get('/accounts/find-by-user-logged', {headers: getAuthHeader()});
}

const AccountService = {
    save,
    findAll,
    findOne,
    remove,
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

export default AccountService;