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

function CardFour() {
    const classes = useStyles();
    const [dataChartTodayRobbery, setDataChartTodayRobbery] = useState([]);
    const [dataChartLastWeekRobbery, setDataChartLastWeekRobbery] = useState([]);
    const [dataChartLastMonthRobbery, setDataChartLastMonthRobbery] = useState([]);

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

            const response = await api.post('/api/cards/one', {
                startDate: '2020-06-11',
                endDate: '2020-06-11',
                state: 'SC',
            })

            setDataChartTodayRobbery(response.data.total);

            const response2 = await api.post('/api/cards/one', {
                startDate: '2020-06-11',
                endDate: '2020-03-05',
                state: 'SC',
            })
            
            setDataChartLastWeekRobbery(response2.data.total);

            const response3 = await api.post('/api/cards/one', {
                startDate: '2020-01-11',
                endDate: '2020-05-11',
                state: 'SC',
            })

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
                    isChart='table'
                    // typeChart='table'
                    titleChart='Busca personalizada por placa'
                    // dataChartTodayRobbery={dataChartTodayRobbery}
                    // dataChartLastWeekRobbery={dataChartLastWeekRobbery}
                    // dataChartLastMonthRobbery={dataChartLastMonthRobbery}
                />
            </Typography>
        </main>
    )
}

export default memo(CardFour);