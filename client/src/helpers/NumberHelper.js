export const currencyFormat = (num) => {
    return num ? 'R$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 'R$' + 0;
 }