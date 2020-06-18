import React, { memo, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Cards from '../Cards'
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
    cardStyles: {
      margin: '10px'
    }
}));

function CardOne() {
    const classes = useStyles();
    const [dataChartTodayRobbery, setDataChartTodayRobbery] = useState([]);
    const [dataChartLastWeekRobbery, setDataChartLastWeekRobbery] = useState([]);
    const [dataChartLastMonthRobbery, setDataChartLastMonthRobbery] = useState([]);
    // const [startDate, setStartDate] = useState('2020-06-11');

    useEffect(() => {
        async function loadDataChart() {
            Date.prototype.yyyymmdd = function() {
                var mm = this.getMonth() + 1; // getMonth() is zero-based
                var dd = this.getDate();
                // console.log('ola')
                return [this.getFullYear(),
                        (mm>9 ? '' : '0') + mm,
                        (dd>9 ? '' : '0') + dd
                       ].join('-');
            };

            const response = await api.get('/api/cards/one/2020-06-11/2020-06-11/RS');

            setDataChartTodayRobbery(response.data.total);

            const response2 = await api.get('/api/cards/one/2020-06-05/2020-06-11/RS');

            setDataChartLastWeekRobbery(response2.data.total);

            const response3 = await api.get('/api/cards/one/2020-01-11/2020-05-11/RS');

            setDataChartLastMonthRobbery(response3.data.total);
        } 

        loadDataChart();
    }, []);

    return (
        <Typography paragraph>
            <Cards 
                cards={[1]} 
                cardStyles={classes.cardStyles} 
                isChart 
                typeChart='column'
                titleChart='Carros roubados'
                dataChartTodayRobbery={[dataChartTodayRobbery]}
                dataChartLastWeekRobbery={[dataChartLastWeekRobbery]}
                dataChartLastMonthRobbery={[dataChartLastMonthRobbery]}
            />
        </Typography>
    )
}

export default memo(CardOne);