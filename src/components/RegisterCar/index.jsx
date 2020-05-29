import React, { memo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from '../Table';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    cardStyles: {
        width: '100%'
    }
}));

function RegisterCar() {
    const classes = useStyles();
    // const [dataTable, setDataTable] = useState([]);
    const [showDataTable, setShowDataTable] = useState([]);

    useEffect(() => {
        async function loadCars() {
            const response = await api.get('/api/cars');

            // setDataTable(response.data)
            setShowDataTable(response.data)
        }

        loadCars()
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <TableComponent data={showDataTable} />
        </main>
    )
}

export default memo(RegisterCar);