export const typeTransactionFormat = (value) => {
    return value === 'ENTRADA' ? 'Entrada' :
        value === 'SAIDA' ? 'Saída' :
        value === 'TRANSFERENCIA' ? 'Transferência' :
        null;
}

export const typeAccountFormat = (value) => {
    return value === 'CONTA_CORRENTE' ? 'Conta Corrente' :
        value === 'CONTA_POUPANCA' ? 'Conta Poupança' :
        value === 'CARTAO' ? 'Cartão' :
        null;
}