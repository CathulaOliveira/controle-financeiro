import moment from 'moment';

export const getCurrentMonth = () => {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth()+1}`;
}

export const filterListByMonth = (list, date) => {
    let newList = [];
    let [year, month] = date.split('-');

    for(let i in list) {
        if (
            list[i].date.getFullYear() === parseInt(year) &&
            (list[i].date.getMonth + 1) === parseInt(month)
        ) {
            newList.push(list[i]);
        }
    }
    return newList;
}

export const formatCurrentMonth = (currentMonth) => {
    let [year, month] = currentMonth.split('-');
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${months[parseInt(month) - 1]} de ${year}`;
}

export const formatDate = (date, format) => {
    return moment(date).format(format)
}