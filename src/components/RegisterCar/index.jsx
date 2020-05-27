import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from '../Table';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
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
    const data = [
        {
            id: 1,
            model: 'Fiesta',
            status: 'Roubado',
            licensePlate: 'AAA-0000',
            robberyDate: '20/02/2020',
            recoveryDate: '20/05/2020',
            ownerName: 'Carlos Roberto',
            ownerCNH: 22222222222
        }
    ]

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <TableComponent data={data} />
        </main>
    )
}

export default memo(RegisterCar);