import React, { memo, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Cards from '../Cards'
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
    },
    styleUl: {
        margin: '0 0 0 30px ',
        padding: '0',
        listStyle: 'none',
        overflow: 'hidden'
    },
    styleLi: {
        color: 'rgba(0, 0, 0, 0.644)',
        marginBottom: '6px'
    },
    styleSpan: {
        color: '#333',
        display: 'block',
        fontWeight: '600',
        margin: '5px 0 0 0'
    },
    styleUlDiv: {
        display: 'flex'
    },
    alignDivUl: {
        flex: '1 1 auto'
    }
}));

function User({ history }) {
    const classes = useStyles();
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        const loadUser = async () => {
            const userLogged = localStorage.getItem('Usuario');
            const response2 = await api.get('/api/user');
            const filterUser = response2.data.filter(el => el.name === userLogged)
            const userId = filterUser.reduce(el => el.id);
            const response = await api.get(`/api/user/${userId.id}`);

            setDataUser(response.data);
        }

        loadUser();
    }, []);
    
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
                    history={history}
                    userData={dataUser}
                />
            </Typography>
        </main>
    )
}

export default memo(User);