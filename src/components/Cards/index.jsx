import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Cards(props) {
    const { cards, cardStyles, isChart } = props;
    let data;
    let dataChart = [[11731000000], [22714000000], [8695000000], [8163000000], [8380000000], [6816000000], [6203000000], [4160000000], [3635000000], [3628000000]];

    const charts = [
        data = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Título do Chart'
            },
            series: dataChart.length === 0 ? 'data' : 
            {
                name: 'tal nome',
                data: dataChart.map(index => ( index ) )
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
        }
    ]   

    return (
    <>
        {cards.map(index => {
            return ( 
                <Card className={cardStyles} key={index}>
                    <CardContent>
                    { isChart ?
                        charts.map((chart, index) => {
                                return <HighchartsReact key={index} highcharts={Highcharts} options={chart} />  
                            }
                        ) : null}
                    </CardContent>
                </Card>
            )
        })}
    </>
    );
}

export default memo(Cards);