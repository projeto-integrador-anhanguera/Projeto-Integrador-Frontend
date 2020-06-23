import React, { memo, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Cards from '../Cards'
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
    cardStyles: {
      margin: '10px',
      // minWidth: '100%'
    }
}));

function CardTwo() {
    const classes = useStyles();
    const [dataChartTodayRobbery, setDataChartTodayRobbery] = useState([]);
    const [dataChartLastWeekRobbery, setDataChartLastWeekRobbery] = useState([]);
    const [dataChartLastMonthRobbery, setDataChartLastMonthRobbery] = useState([]);
    // const [stardDate, setStartDate] = useState('2020-')

    useEffect(() => {
        async function loadDataChart() {
            Date.prototype.yyyymmdd = function() {
                var mm = this.getMonth() + 1; // getMonth() is zero-based
                var dd = this.getDate();
              
                return [this.getFullYear(),
                        (mm>9 ? '' : '0') + mm,
                        (dd>9 ? '' : '0') + dd
                       ].join('-');
            };

            const response = await api.get(`/api/cards/two/2020-06-11/2020-06-11/RS/em busca`);
            // console.log(response)
            setDataChartTodayRobbery(response.data.total);

            const response2 = await api.get('/api/cards/two/2020-06-05/2020-06-11/RS/em busca');
            // console.log(response2)
            setDataChartLastWeekRobbery(response2.data.total);

            const response3 = await api.get('/api/cards/two/2020-01-11/2020-05-11/RS/em busca');
            // console.log(response3)
            setDataChartLastMonthRobbery(response3.data.total);
        } 

        loadDataChart();
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
                <Cards 
                    cards={[1]} 
                    cardStyles={classes.cardStyles} 
                    isChart 
                    typeChart='bar'
                    titleChart='Carros em busca'
                    dataChartTodayRobbery={dataChartTodayRobbery}
                    dataChartLastWeekRobbery={dataChartLastWeekRobbery}
                    dataChartLastMonthRobbery={dataChartLastMonthRobbery}
                />
            </Typography>
        </main>
    )
}

export default memo(CardTwo);