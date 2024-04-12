import React, { useEffect, useState } from 'react'
import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeeQuery, useUpdateEmployeeMutation } from '../../services/employeeApi'
import CustomDataGrid from './CustomDataGrid'
import { Stack, Button } from '@mui/material';
import DialogBox from './DialogBox';
import * as Yup from 'yup';
import CustomSnackbar from '../../componants/CustomSnackbar';
import UpdateDialog from './UpdateDialog';
// Define validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  salary: Yup.number().required('Salary is required').positive('Salary must be a positive number'),
  department: Yup.string().required('Department is required'),
  project_name: Yup.string().required('Project Name is required'),
});
export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [userId, setUserId] = useState()
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    msg: "",
    msgType: ""
  });
  const { data, error, isLoading } = useGetAllEmployeeQuery();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [createEmployee, { isLoading: isCreateing }] = useCreateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeleteing }] = useDeleteEmployeeMutation();


  const initialValues = {
    name: '',
    email: '',
    salary: '',
    department: '',
    project_name: '',
  };

  const handleSubmit = async (values) => {
    await createEmployee(values).unwrap().then((data) => {
      if (!isCreateing) {
        setOpenAlert({
          ...openAlert,
          open: true,
          msg: data.message,
          msgType: 'success'
        });
        setOpenDialog(false);
      }

    }).catch((err) => {

      setOpenAlert({
        ...openAlert,
        open: true,
        msg: err.data.message,
        msgType: 'error'
      });
    })
  };
  const handleUpdate = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      department: values.department,
      salary: values.salary,
      project_name: values.project_name

    }

    const id = values.id;
    await updateEmployee({ id, data }).unwrap().then((data) => {
      if (!isUpdating) {
        setOpenAlert({
          ...openAlert,
          open: true,
          msg: data.message,
          msgType: 'success'
        });
        setOpenDialogUpdate(false);
      }

    }).catch((err) => {

      setOpenAlert({
        ...openAlert,
        open: true,
        msg: err.data.message,
        msgType: 'error'
      });
    })
  };
  const handleUpdateEmployee = (id) => {
    setUserId(id)
    setOpenDialogUpdate(true)
  }
  const handleClickOpen = () => {
    setOpenDialog(true);
  };


  const handleDeleteEmployee = async (id) => {
    await deleteEmployee(id).unwrap().then((data) => {
      if (!isDeleteing) {
        setOpenAlert({
          ...openAlert,
          open: true,
          msg: data.message,
          msgType: 'success'
        });
      }
    }).catch((err) => {
      console.log(err)
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: err.data.message,
        msgType: 'error'
      });
    })
  }
  useEffect(() => {
    setApiData(data?.data)
  }, [data])
  return (
    <div className="App">
      <CustomSnackbar openAlert={openAlert} setOpenAlert={setOpenAlert} />
      <Stack justifyContent="center" alignItems="center " padding={4} spacing={2}>
        <Button variant='contained' onClick={handleClickOpen}>Add Empolyee</Button>

        <CustomDataGrid data={apiData} handleDeleteEmployee={handleDeleteEmployee} handleUpdateEmployee={handleUpdateEmployee} isDeleteing={isDeleteing} isLoading={isLoading} />

        <DialogBox setOpenDialog={setOpenDialog} openDialog={openDialog} validationSchema={validationSchema} initialValues={initialValues} handleSubmit={handleSubmit} isDeleteing={isDeleteing} isCreateing={isCreateing} />
        <UpdateDialog setOpenDialogUpdate={setOpenDialogUpdate} openDialogUpdate={openDialogUpdate} validationSchema={validationSchema} handleUpdate={handleUpdate} userId={userId} isUpdating={isUpdating} />
      </Stack>
    </div>
  )
}