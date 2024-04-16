import React, { useState } from 'react';
import { Button, TextField, DialogTitle, Stack, DialogContent, DialogActions, Dialog } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
function DialogBox({ setOpenDialog, openDialog,validationSchema,initialValues,handleSubmit,isCreateing }) {
    const handleClose = () => {
        setOpenDialog(false);
      };
  return (
    <Dialog fullWidth maxWidth="xs" open={openDialog} onClose={handleClose}>
      <DialogTitle>Create Employee details</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
                <LoadingButton loading={isCreateing} type="submit" variant='contained' autoFocus>
                  Create
                </LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
