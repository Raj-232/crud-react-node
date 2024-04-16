import React, { useState } from 'react';
import { Button, TextField, DialogTitle, Stack, DialogContent, DialogActions, Dialog } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useGetEmployeeQuery } from '../../services/employeeApi';
import LoadingButton from '@mui/lab/LoadingButton';
function UpdateDialog({ setOpenDialogUpdate, openDialogUpdate,validationSchema,handleUpdate,employeeId ,isUpdating}) {
    const handleClose = () => {
        setOpenDialogUpdate(false);
      };
    const { data, error, isLoading } = useGetEmployeeQuery(employeeId,{
        skip: openDialogUpdate?false:true,
        refetchOnMountOrArgChange: true,
    });
    if(isLoading){
        return(
            <div></div>
        )
    }
  return (
    <Dialog fullWidth maxWidth="xs" open={openDialogUpdate} onClose={handleClose}>
      <DialogTitle>Update Employee details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={data?.data}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ errors, touched }) => (
            <Form>
              <Stack spacing={2} paddingY={2}>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  size="small"
                  fullWidth
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  size="small"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <Field
                  name="salary"
                  as={TextField}
                  label="Salary"
                  size="small"
                  fullWidth
                  error={touched.salary && !!errors.salary}
                  helperText={touched.salary && errors.salary}
                />
                <Field
                  name="department"
                  as={TextField}
                  label="Department"
                  size="small"
                  fullWidth
                  error={touched.department && !!errors.department}
                  helperText={touched.department && errors.department}
                />

              </Stack>
              <DialogActions>
                <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                <LoadingButton loading={isUpdating}  endIcon type="submit" variant='contained' autoFocus>
                Update
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateDialog;
