import axios from 'axios'


export const postUsuario = (usuario) => {
    return axios.post('/usuario', usuario);
} 

export const postConta = (conta) => {
    return axios.post('/conta', conta);
} 