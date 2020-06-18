import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '../Button';
import Modal from '../Modal';
import SnackbarComponent from '../Snackbar';
import api from '../../services/api';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'rgba(224, 224, 224, 0.644)',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        maxWidth: 500,
    },
    alignTable: {
        marginTop: '20px'
    },
    tableCar: {
        maxWidth: 600,
    }
});

export default function TableComponent(props) {
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [isEditModal, setIsEditModal] = useState(false);
    const [messageCarDelete, setMessageCarDelete] = useState('');
    const [severitySnackbar, setSeveritySnackbar] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    // const [data1, setData1] = useState([]);
    const { data, idTable } = props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    console.log(data)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = (state) => {
        setIsEditModal(false);
        !state ? setOpenModal(false) : setOpenModal(true);
    }

    function handleOpenModalEdit(state) {
        !state ? setOpenModal(true) : setOpenModal(false);
    }

    async function handleOpenModalEditGetData(state, licensePlate, isEditModal) {
        const response = await api.get(`/api/cars/${licensePlate}`);
        setIsEditModal(true);
        setDataModal(response);
        handleOpenModalEdit(state);
    }

    async function handleDelete(licensePlate) {
        const response = await api.delete(`/api/cars/${licensePlate}`);

        if (response.data.success) {
            setDeleteSuccess(true);
            setMessageCarDelete(response.data.message);
            setSeveritySnackbar('success');
        } else {
            setDeleteSuccess(true);
            setMessageCarDelete(response.data.message);
            setSeveritySnackbar('error');
        }

        return response;
    }

    // useEffect(() => {
    //     handleDelete();
    // }, []);

    const getContentTableRegisterCar = () => {
        return (
            <>
                <Button variant="contained" color="primary" ariaLabel="adicionar" size="small" text='Adicionar' icon={<AddIcon />} onClick={handleOpenModal} />
                <Modal
                    state={openModal}
                    handleOpenModal={handleOpenModal}
                    dataModal={dataModal.data}
                    isEditModal={isEditModal}
                />
                <TableContainer component={Paper} className={classes.alignTable}>
                    <Table className={classes.table2} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Modelo</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Placa</StyledTableCell>
                                <StyledTableCell align="right">Data do Roubo</StyledTableCell>
                                <StyledTableCell align="right">Data de Recuperação</StyledTableCell>
                                <StyledTableCell align="right">Dono do Carro</StyledTableCell>
                                <StyledTableCell align="right">CNH dono do Carro</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : data
                            ).map(row => {
                                return (
                                    <Fragment key={row.id}>
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">{row.model}</TableCell>
                                            <TableCell align="right">{row.status}</TableCell>
                                            <TableCell align="right">{row.licensePlate}</TableCell>
                                            <TableCell align="right">{row.robberyDate}</TableCell>
                                            <TableCell align="right">{row.recoveryDate}</TableCell>
                                            <TableCell align="right">{row.ownerName}</TableCell>
                                            <TableCell align="right">{row.ownerCNH}</TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="delete" onClick={() => handleDelete(row.licensePlate)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="edit" onClick={() => handleOpenModalEditGetData(openModal, row.licensePlate, isEditModal)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                )
                            })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={9} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                                    colSpan={9}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'Linhas por página' }
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                    {deleteSuccess ? <SnackbarComponent severity={severitySnackbar} message={messageCarDelete} /> : null}
                </TableContainer>
            </>
        )
    }

    const getContentTableSearch = () => {
        return (
            <>
                <TableContainer component={Paper} className={classes.alignTable}>
                    <Table className={classes.tableCar} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Modelo</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Placa</StyledTableCell>
                                <StyledTableCell align="right">Data do Roubo</StyledTableCell>
                                <StyledTableCell align="right">Data de Recuperação</StyledTableCell>
                                <StyledTableCell align="right">Dono do Carro</StyledTableCell>
                                <StyledTableCell align="right">CNH dono do Carro</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length !== 0 && (
                                <TableRow key={data.id}>
                                    <TableCell component="th" scope="row">{data.model}</TableCell>
                                    <TableCell align="right">{data.status}</TableCell>
                                    <TableCell align="right">{data.licensePlate}</TableCell>
                                    <TableCell align="right">{data.robberyDate}</TableCell>
                                    <TableCell align="right">{data.recoveryDate}</TableCell>
                                    <TableCell align="right">{data.ownerName}</TableCell>
                                    <TableCell align="right">{data.ownerCNH}</TableCell>
                                </TableRow>   
                            )}

                            {data.length === 0 && (
                                <TableRow style={{ height: emptyRows }}>
                                    <TableCell colSpan={5}>Digite a placa para consultar.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    return (
        <>
            {idTable === 'registerCar' ?
                getContentTableRegisterCar()
                : getContentTableSearch()
            }
        </>
    );
}