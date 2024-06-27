import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from 'react-spinkit';
import { Edit_data, Facility_data, Delete_data } from '../../../redux/action/facility.action';

function Facility(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [editingFacility, setEditingFacility] = useState(null);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
        setEditingFacility(null);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm(true);
        setUpdate(false);
        setEditingFacility(null);
    };

    const FacilitySchema = object({
        name: string().required(),
        description: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: FacilitySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(Edit_data({ ...values, id: editingFacility.id }));
            } else {
                const rNo = Math.floor(Math.random() * 1000);
                dispatch(Facility_data({ ...values, id: rNo }));
            }

            resetForm();
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik;

    const Facility = useSelector((state) => state.facilites);

    const handleDelete = (id) => {
        dispatch(Delete_data(id));
    };

    const handleEdit = (data) => {
        setEditingFacility(data);
        formik.setValues(data);
        setUpdate(true);
        setOpen(true);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div>
            {Facility.isLoading ? (
                <Spinner name="line-scale-pulse-out" color="aqua" />
            ) : (
                <>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Facility
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{update ? 'Update Facility' : 'Add Facility'}</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    error={errors.name && touched.name}
                                    helperText={errors.name && touched.name ? errors.name : ''}
                                />
                                <TextField
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    error={errors.description && touched.description}
                                    helperText={errors.description && touched.description ? errors.description : ''}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                </DialogActions>
                            </DialogContent>
                        </form>
                    </Dialog>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={Facility.facility}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection />
                    </div>
                </>
            )}
        </div>
    );
}

export default Facility;