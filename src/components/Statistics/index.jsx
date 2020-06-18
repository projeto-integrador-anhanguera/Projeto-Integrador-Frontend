import React from 'react';
import CardOne from './cardOne';
import CardTwo from './cardTwo';
import CardThree from './cardThree';
import CardFour from './cardFour';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

export default function Statistics() {
  const classes = useStyles();

  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div style={{ display: 'flex' }}>
          <CardOne />
          <CardTwo />
        </div>
        <div style={{ display: 'flex' }}>
          <CardThree />
          <CardFour />
        </div>
      </main>
    </>
  );
}