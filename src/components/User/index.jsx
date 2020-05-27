import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Cards from '../Cards'

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

function User(props) {
    const classes = useStyles();
    
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
                <Cards cards={[1]} cardStyles={classes.cardStyles} />
            </Typography>
        </main>
    )
}

export default memo(User);