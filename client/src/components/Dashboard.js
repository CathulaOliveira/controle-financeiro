import { formatCurrentMonth } from "../helpers/DateFilter"

const tableStyle = {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    boxShadow: "0px 0px 5px #CCC",
    borderRadius: 10,
    marginTop: -40,
    display: 'flex',
    alignItems: 'center'
}

const monthArea = {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
}

const monthArrow = {
    width: '40px',
    textAlign: 'center',
    fontSize: '25px',
    cursor: 'pointer'
}

const monthTitle = {
    flex: 1,
    textAlign: 'center',
}

const resumeArea = {
    flex: 2,
    display: 'flex',
}

const resumeAreaContainer = {
    flex: 1
}

const resumeTitle = {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#888',
    marginBottom: '5px',

}

const resumeInfo = {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',

}

export const Dashboard = (props) => {

    const handlePrevMonth = () => {
        let [year, month] = props.currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month - 1), 1);
        currentDate.setMonth(currentDate.getMonth() - 1);
        props.onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}`);
    }

    const handleNextMonth = () => {
        let [year, month] = props.currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month - 1), 1);
        currentDate.setMonth(currentDate.getMonth() + 1);
        props.onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth()+1}`);

    }

    return (
        <div style={tableStyle}>
            <div style={monthArea}>
                <div style={monthArrow} onClick={handlePrevMonth}>
                    ⬅️
                </div>
                <div style={monthTitle}>
                    {formatCurrentMonth(props.currentMonth)}
                </div>
                <div style={monthArrow} onClick={handleNextMonth}>
                    ➡️
                </div>
            </div>
            <div style={resumeArea}>
                <div style={resumeAreaContainer}>
                    <div style={resumeTitle}>Receitas</div>
                    <div style={resumeInfo}>{props.income}</div>
                </div>
                <div style={resumeAreaContainer}>
                    
                    <div style={resumeTitle}>Despesas</div>
                    <div style={resumeInfo}>{props.expense}</div>
                </div>
                <div style={resumeAreaContainer}>
                    <div style={resumeTitle}>Balanço</div>
                    <div style={resumeInfo}>{props.income - props.expense}</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;