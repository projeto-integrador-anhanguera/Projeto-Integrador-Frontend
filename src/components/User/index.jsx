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
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    cardStyles: {
        width: '100%'
    },
    styleUl: {
        margin: '0 0 0 30px ',
        padding: '0',
        listStyle: 'none',
        overflow: 'hidden'
    },
    styleLi: {
        color: '#009a14',
        marginBottom: '6px'
    },
    styleSpan: {
        color: '#333',
        display: 'block',
        fontWeight: '600'
    },
    styleUlDiv: {
        display: 'flex'
    },
    alignDivUl: {
        flex: '1 1 auto'
    }
}));

function User() {
    const classes = useStyles();
    
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
                <Cards 
                    cards={[1]} 
                    cardStyles={classes.cardStyles} 
                    styleUl={classes.styleUl} 
                    styleLi={classes.styleLi} 
                    styleSpan={classes.styleSpan} 
                    styleUlDiv={classes.styleUlDiv}
                    alignDivUl={classes.alignDivUl}
                />
            </Typography>
        </main>
    )
}

export default memo(User);