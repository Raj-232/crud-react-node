import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, Stack } from '@mui/material';
import { loginApi } from '../../services/authApi';
import CustomSnackbar from '../../componants/CustomSnackbar';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export const Login = () => {
    const Navigate=useNavigate();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        msg: "",
        msgType: ""
      });
    const handleSubmit = async (values) => {
        
       const {data,error}= await loginApi(values)
       if(data){

        localStorage.setItem('token',data.token)
        setOpenAlert({
            ...openAlert,
            open: true,
            msg: data.message,
            msgType: 'success'
          });
          setTimeout(()=>{
            window.location.href=`/${data?.data?.userId}`
          },[2000])
   
       }else{
        console.log(error)
        setOpenAlert({
            ...openAlert,
            open: true,
            msg: error.message,
            msgType: 'error'
          });
       }

    };

    return (
        <Stack direction="column" height="100vh" justifyContent="center" alignItems="center">
            <CustomSnackbar openAlert={openAlert} setOpenAlert={setOpenAlert} />
            <h1>Welcome </h1>
            <Card sx={{ boxShadow: 24,  width: 700, p: 8 }}>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Stack spacing={2} >
                                <div>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email"
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email ? errors.email : ''}
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        error={errors.password && touched.password}
                                        helperText={errors.password && touched.password ? errors.password : ''}
                                        fullWidth
                                    />
                                </div>
                                <Button type="submit" variant="contained" color="primary">
                                    Login
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Stack>
    );
};


