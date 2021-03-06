import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '../Button';
import SnackbarComponent from '../Snackbar';
import InputMask from "react-input-mask";
import api from '../../services/api';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Modal({ state, handleOpenModal, dataModal, isEditModal }) {
  const [model, setModel] = useState('');
  const [modelEdit, setModelEdit] = useState('');
  const [status, setStatus] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [robberyDate, setRobberyDate] = useState('');
  const [ownerCNH, setOwnerCNH] = useState('');
  const [recoveryDate, setRecoveryDate] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [messageCarRegister, setMessageCarRegister] = useState('');
  const [severitySnackbar, setSeveritySnackbar] = useState('');

  const handleClose = () => {
    handleOpenModal(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/api/cars', {
      model,
      status,
      licensePlate,
      robberyDate,
      recoveryDate,
      ownerName,
      ownerCNH
    });

    if (response.data.success) {
      setRegisterSuccess(true);
      setMessageCarRegister(response.data.message);
      setSeveritySnackbar('success');
    } else {
      setRegisterSuccess(true);
      setMessageCarRegister(response.data.message);
      setSeveritySnackbar('error');
    }
  }

  const getContentDialogEdit = () => {
    console.log(dataModal)
    return (
      <>
        {dataModal &&
          <Dialog open={state} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Editar Veículo</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText>
                  Para edição de um veículo, altere os dados abaixo.
               </DialogContentText>
                <div className='input-modal-form'>
                  <div className='align-input-modal-form'>
                    <TextField required id='outlined-basic1' label='Modelo' margin="dense" className='input-name' value={dataModal.model} handleChange={event => setModelEdit(event.target.value)} />
                  </div>
                  <div className='align-input-modal-form'>
                    <TextField id='outlined-basic' label='Status' margin="dense" className='input-name' value={dataModal.status} onChange={event => setStatus(event.target.value)} />
                  </div>
                </div>
                <div className='input-modal-form'>
                  <div className='align-input-modal-form'>
                    <TextField id='outlined-basic' label='Placa' margin="dense" className='input-name' value={dataModal.licensePlate} onChange={event => setLicensePlate(event.target.value)} />
                  </div>
                  <div className='align-input-modal-form'>
                    <TextField id='outlined-basic' label='Data do Roubo' margin="dense" className='input-name' type="text" value={dataModal.robberyDate} onChange={event => setRobberyDate(event.target.value)} >
                      <InputMask mask="99/99/9999" maskChar=" " />
                    </TextField>
                  </div>
                </div>
                <div className='input-modal-form'>
                  <div className='align-input-modal-form'>
                    <TextField id='outlined-basic' label='CNH dono do carro' margin="dense" className='input-name' value={dataModal.ownerCNH} onChange={event => setOwnerCNH(event.target.value)} />
                  </div>
                  <div className='align-input-modal-form'>
                    <TextField id='outlined-basic' label='Data de Recuperação' margin="dense" className='input-name' type="text" value={dataModal.recoveryDate} onChange={event => setRecoveryDate(event.target.value)} >
                      <InputMask mask="99/99/9999" maskChar=" " />
                    </TextField>
                  </div>
                </div>
                <div>
                  <div className='align-input-modal-form'>
                    <TextField id='outlined-basic' label='Dono do Carro' margin="dense" className='input-name' value={dataModal.ownerName} onChange={event => setOwnerName(event.target.value)} />
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="default" text='Cancelar' variant='contained' />
                <Button color="primary" text='Salvar' variant='contained' type='submit' />
              </DialogActions>
            </form>
          </Dialog>
        }
      </>
    )
  }

  const getContentDialog = () => {
    return (
      <>
        <Dialog open={state} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Cadastrar Veículo</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText>
                Para cadastrar um veículo, preencha os dados abaixo.
              </DialogContentText>
              <div className='input-modal-form'>
                <div className='align-input-modal-form'>
                  <TextField required id='outlined-basic' label='Modelo' margin="dense" className='input-name' value={model} onChange={event => setModel(event.target.value)} />
                </div>
                <div className='align-input-modal-form'>
                  <TextField id='outlined-basic' label='Status' margin="dense" className='input-name' value={status} onChange={event => setStatus(event.target.value)} />
                </div>
              </div>
              <div className='input-modal-form'>
                <div className='align-input-modal-form'>
                  <TextField id='outlined-basic' label='Placa' margin="dense" className='input-name' value={licensePlate} onChange={event => setLicensePlate(event.target.value)} />
                </div>
                <div className='align-input-modal-form'>
                  <InputMask mask="9999-99-99" maskChar=" " value={robberyDate} onChange={event => setRobberyDate(event.target.value)} >
                    {() => <TextField id='outlined-basic' label='Data do Roubo' margin="dense" className='input-name' type="text" />}
                  </InputMask>
                </div>
              </div>
              <div className='input-modal-form'>
                <div className='align-input-modal-form'>
                  <TextField id='outlined-basic' label='CNH dono do carro' margin="dense" className='input-name' value={ownerCNH} onChange={event => setOwnerCNH(event.target.value)} />
                </div>
                <div className='align-input-modal-form'>
                  <TextField id='outlined-basic' label='Data de Recuperação' margin="dense" className='input-name' type="text" value={recoveryDate} onChange={event => setRecoveryDate(event.target.value)} >
                    <InputMask mask="9999-99-99" maskChar=" " />
                  </TextField>
                </div>
              </div>
              <div>
                <div className='align-input-modal-form'>
                  <TextField id='outlined-basic' label='Dono do Carro' margin="dense" className='input-name' value={ownerName} onChange={event => setOwnerName(event.target.value)} />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default" text='Cancelar' variant='contained' />
              <Button color="primary" text='Salvar' variant='contained' type='submit' />
            </DialogActions>
          </form>
        </Dialog>
        {registerSuccess ? <SnackbarComponent severity={severitySnackbar} message={messageCarRegister} /> : null}
      </>
    )
  }

  return (
    isEditModal ? getContentDialogEdit() : getContentDialog()
  );
}