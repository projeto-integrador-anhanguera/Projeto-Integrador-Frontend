import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import image from '../../assets/images/avatar1.png'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
  }));
  
export default function AvatarComponent() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Avatar alt="" src={image} className={classes.large} />
      </div>
    );
}