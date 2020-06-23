import React, { memo, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import AvatarComponent from '../Avatar';
import Button from '../Button';
import TableComponent from '../Table';
import api from '../../services/api';
import SnackbarComponent from '../Snackbar';

function Cards({ cards, cardStyles, isChart, styleUl, styleLi, styleSpan, styleUlDiv, alignDivUl, typeChart, titleChart, dataChartTodayRobbery, dataChartLastWeekRobbery, dataChartLastMonthRobbery, history, userData }) {
    const [licensePlateSearch, setLicensePlateSearch] = useState('');
    const [carNotEncontered, setCarNotEncontered] = useState(false);
    const [messageCarNotEncontered, setMessageCarNotEncontered] = useState('');
    const [dataCar, setDataCar] = useState([]);

    const handleSubmitLicensePlate = async () => {
        const response = await api.get(`/api/cars/${licensePlateSearch}`);

        if (!response.data.success) {
            setCarNotEncontered(true);
            setMessageCarNotEncontered(response.data.message)

            return;
        }

        setCarNotEncontered(false);
        setDataCar(response.data.car);
    }

    const getTypeAndDataCharts = () => {
        let data;
        let charts = []

        if (typeChart === 'column') {
            charts = [
                data = {
                    chart: {
                        type: typeChart
                    },
                    title: {
                        text: titleChart
                    },
                    yAxis: {
                        title: {
                            text: 'Quantidade de carros roubados'
                        }
                    },
                    xAxis: {
                        categories: ['Hoje', 'Última semana', 'Último mês']
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Hoje',
                        data: dataChartTodayRobbery,
                    }, {
                        name: 'Última semana',
                        data: dataChartLastWeekRobbery
                    },
                    {
                        name: 'Último mês',
                        data: dataChartLastMonthRobbery
                    }]
                }
            ]
        } else if (typeChart === 'bar') {
            charts = [
                data = {
                    colors: ['#f45b5b', '#8085e9', '#8d4654'],
                    chart: {
                        type: 'bar',
                    },
                    title: {
                        text: titleChart
                    },
                    xAxis: {
                        categories: ['Hoje', 'Última semana', 'Último mês'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' carros'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: 'Hoje',
                        data: [dataChartTodayRobbery]
                    }, {
                        name: 'Na semana',
                        data: [dataChartLastWeekRobbery]
                    }, {
                        name: 'No mês',
                        data: [dataChartLastMonthRobbery]
                    }],
                    credits: {
                        enabled: false
                    }
                }
            ]
        } else if (typeChart === 'areaspline') {
            charts = [
                data = {
                    chart: {
                        type: 'areaspline'
                    },
                    accessibility: {
                        description: ''
                    },
                    title: {
                        text: titleChart
                    },
                    xAxis: {
                        categories: [
                            'Hoje',
                            'Última semana',
                            'Último mês'
                        ]
                    },
                    yAxis: {
                        title: {
                            text: 'Quantidade de carros recuperados'
                        }
                    },
                    tooltip: {
                        pointFormat: '{xAxis.categories} foram recuperados <b>{point.y:,.0f}</b> carro(s)'
                    },
                    series: [{
                        name: '',
                        data: [dataChartTodayRobbery, dataChartLastWeekRobbery, dataChartLastMonthRobbery]
                    }],
                    credits: {
                        enabled: false
                    }
                }
            ]
        }

        return charts;
    }

    const getContentCharts = () => {
        return isChart ? getTypeAndDataCharts().map((chart, index) => <HighchartsReact key={index} highcharts={Highcharts} options={chart} />) : null
    }

    const renderUserToLogin = () => {
        history.push('/');
    }

    const getContentCardAvatar = () => {
        return (
            !isChart ?
                <div className={styleUlDiv}>
                    <AvatarComponent />
                    <div className={alignDivUl}>
                        <ul className={styleUl}>
                            <li className={styleLi}>
                                <span className={styleSpan}>Nome do usuário:</span>
                                {userData.name}
                            </li>
                            <li className={styleLi}>
                                <span className={styleSpan}>E-mail:</span>
                                {userData.email}
                            </li>
                        </ul>
                    </div>
                    <div className='btn-holder'>
                        <Button variant="contained" color="secondary" ariaLabel="edit" size="small" text='Sair' onClick={() => renderUserToLogin()} />
                    </div>
                </div> : null
        )
    }

    const getContentCardTable = () => {
        return (
            isChart === 'table' ?
                <div className='width-table-search'>
                    <text className='text-span-table-search' x="300" text-anchor="middle" data-z-index="4" >
                        <tspan>Busca personalizada</tspan>
                    </text>
                    <div style={{ display: 'flex' }}>
                        <TextField label='Placa' margin="dense" className='input-name' value={licensePlateSearch} onChange={event => setLicensePlateSearch(event.target.value)} />
                        <div style={{ margin: '15px 0 0 5px' }}>
                            <Button text='Consultar' variant='contained' color='primary' onClick={() => handleSubmitLicensePlate()} />
                        </div>
                    </div>
                    <TableComponent data={dataCar} idTable='tableSearch' />
                </div> : null
        )
    }

    return (
        <>
            {cards.map(index => {
                return (
                    <Card className={cardStyles} key={index}>
                        <CardContent>
                            {getContentCharts()}
                            {getContentCardAvatar()}
                            {getContentCardTable()}
                        </CardContent>
                        {carNotEncontered ? <SnackbarComponent severity='error' message={messageCarNotEncontered} /> : null}
                    </Card>
                )
            })}
        </>
    );
}

export default memo(Cards);