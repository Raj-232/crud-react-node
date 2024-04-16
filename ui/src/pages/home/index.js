import React, { useEffect, useState } from 'react'
import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetAllEmployeeQuery, useUpdateEmployeeMutation } from '../../services/employeeApi'
import EmployeeTable from './EmployeeTable'
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DialogBox from './DialogBox';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import CustomSnackbar from '../../componants/CustomSnackbar';
import { CircularProgress } from '@mui/material';
import UpdateDialog from './UpdateDialog';
import { createProjectApi, getAllProjectApi } from '../../services/projectApi';
import ProjectTable from './ProjectsTable';
import { chnageTaskStatus, createTaskApi, getAllTaskApi } from '../../services/taskApi';
import TaskTable from './TaskTable';
import { TaskDialog } from './TaskDialog';
import { ProjectDialog } from './ProjectDialog';
// Define validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  salary: Yup.number().required('Salary is required').positive('Salary must be a positive number'),
  department: Yup.string().required('Department is required'),
});
export default function Home() {
  const { userId } = useParams();
  const [apiData, setApiData] = useState([]);
  const Naviagte=useNavigate()
  const [apiProjectData, setApiProjectData] = useState([]);
  const [apiTaskData, setApiTaskData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState({});
  const [employeeId, setEmployeeId] = useState()
  const [taskDialog, setTaskDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [projectDialog, setProjectDialog] = useState(false)
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [projectDatas, setProjectDatas] = useState({
    project_name: '',
    description: '',
  });
  const [taskDatas, setTaskDatas] = useState({
    taskname: '',
    description: '',
    deadline: null,
    status: 'todo',
    projectName: null,
    employeeName: null
  });
  const [openAlert, setOpenAlert] = useState({
    open: false,
    msg: "",
    msgType: ""
  });
  const { data, error, isLoading } = useGetAllEmployeeQuery(userId);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [createEmployee, { isLoading: isCreateing }] = useCreateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeleteing }] = useDeleteEmployeeMutation();
 

  const initialValues = {
    name: '',
    email: '',
    salary: '',
    department: '',
  };

  const handleSubmit = async (values) => {
    const format = {
      name: values.name,
      email: values.email,
      salary: values.salary,
      department: values.department,
      userId: userId
    };
    await createEmployee(format).unwrap().then((data) => {
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
      project_name: values.project_name,
      userId: userId

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
    setEmployeeId(id)
    setOpenDialogUpdate(true)
  }



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
  const handleDeleteProject = (id) => {

  }
  const handleUpdateProject = () => {

  }
  const handleAddProject = async () => {
    const format = {
      project_name: projectDatas.project_name,
      description: projectDatas.description,
      userId: userId
    }
    const { data, error } = await createProjectApi(format)
    if (data) {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: data.message,
        msgType: 'success'
      });
   
      setProjectDialog(false)
      getProjectData()
    }
    else {
     
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error.data.message,
        msgType: 'error'
      });
    }
  }
  const handleDeleteTask = (id) => {

  }
  const handleUpdateTask = () => {

  }
  const handleAddTask = async () => {
    const Formatdata = {
      name: taskDatas.taskname,
      description: taskDatas.description,
      status: taskDatas.status,
      deadline: taskDatas.deadline,
      projectId: taskDatas.projectName?.projectId,
      id: taskDatas.employeeName?.id,
      userId: userId
    }
    const { data, error } = await createTaskApi(Formatdata)
    if (data) {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: data.message,
        msgType: 'success'
      });
    
      setTaskDialog(false)
      setTaskDatas({})
      getTaskData()
    }
    else {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error.data.message,
        msgType: 'error'
      });
    }
  };

  const handleTaskStatus = async (value, TaskID) => {
    const format = {
      status: value
    }

    const { data, error } = await chnageTaskStatus(TaskID, format)
    if (data) {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: data.message,
        msgType: 'success'
      });
      
      setAnchorEl({ ...anchorEl, [TaskID]: null });
      getTaskData()
    }
    else {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error.data.message,
        msgType: 'error'
      });
     
    }

  };
  const getProjectData = async () => {
    setLoading(true)
    const { data, error } = await getAllProjectApi(userId);
    if (data) {
      setLoading(true)
      setApiProjectData(data.data)
    } else {
      console.log(error)
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error?.message,
        msgType: 'error'
      });
      if(error?.statusCode==403){
        setTimeout(()=>{
          Naviagte('/login')
        },[2000])
      }
    }
    setLoading(false)
  }
  const getTaskData = async () => {
    setLoading(true)
    const { data, error } = await getAllTaskApi(userId);
    if (data) {
     
      setApiTaskData(data.data)
    } else {
      console.log(error)
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error?.message,
        msgType: 'error'
      });
      if(error?.statusCode==403){
        setTimeout(()=>{
          Naviagte('/login')
        },[2000])
      }
    }
    setLoading(false)
  }
  useEffect(()=>{
    if(error){
      console.log(error)
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error?.message,
        msgType: 'error'
      });
      if(error?.statusCode==403){
        setTimeout(()=>{
          Naviagte('/login')
        },[2000])
      }
    }
  },[error])

  useEffect(() => {

    getProjectData()
    getTaskData()
  }, [])
  useEffect(() => {
    setApiData(data?.data)
  }, [data])
  return (
    <div className="App">{
      loading &&
      <CircularProgress sx={{ position:"fixed", top: "50%", left: "50%", zIndex:999 }} />
    }
      <CustomSnackbar openAlert={openAlert} setOpenAlert={setOpenAlert} />
      <ProjectDialog projectDialog={projectDialog} setProjectDialog={setProjectDialog} handleAddProject={handleAddProject} projectDatas={projectDatas} setProjectDatas={setProjectDatas} />
      <TaskDialog taskDialog={taskDialog} setTaskDialog={setTaskDialog} employeeData={apiData} apiProjectData={apiProjectData} taskDatas={taskDatas} setTaskDatas={setTaskDatas} handleAddTask={handleAddTask} />
      <Stack justifyContent="center" alignItems="center " padding={4} spacing={2}>
        <Button variant='contained' onClick={() => setTaskDialog(true)}>Add Task</Button>
        <TaskTable
          data={apiTaskData}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleTaskStatus={handleTaskStatus}
          loading={loading}


        />

        <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
          <Button variant='contained' onClick={() => setProjectDialog(true)}>Add Project</Button>
          <Button variant='contained' onClick={() => setOpenDialog(true)}>Add Empolyee</Button>

        </Stack>
        <Stack direction="row" spacing={2}>
          <ProjectTable data={apiProjectData} handleDeleteProject={handleDeleteProject} handleUpdateProject={handleUpdateProject}  loading={loading}/>
          <EmployeeTable data={apiData} handleDeleteEmployee={handleDeleteEmployee} handleUpdateEmployee={handleUpdateEmployee} isDeleteing={isDeleteing} isLoading={isLoading} />

        </Stack>

        <DialogBox setOpenDialog={setOpenDialog} openDialog={openDialog} validationSchema={validationSchema} initialValues={initialValues} handleSubmit={handleSubmit} isDeleteing={isDeleteing} isCreateing={isCreateing} />
        <UpdateDialog setOpenDialogUpdate={setOpenDialogUpdate} openDialogUpdate={openDialogUpdate} validationSchema={validationSchema} handleUpdate={handleUpdate} employeeId={employeeId} isUpdating={isUpdating} />
      </Stack>
    </div>
  )
}