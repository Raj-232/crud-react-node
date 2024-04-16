import React, { useState } from 'react';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const sampleData = ['todo', 'in_progress', 'completed'];

export const TaskDialog = ({ taskDialog, setTaskDialog, employeeData, apiProjectData,taskDatas,setTaskDatas,handleAddTask }) => {


    const handleClose = () => {
        setTaskDialog(false);
    };

    const handleAutocompleteChange = (fieldName, value) => {
        setTaskDatas({
            ...taskDatas,
            [fieldName]: value
        });
    };



    return (
        <Dialog fullWidth maxWidth="sm" open={taskDialog} onClose={handleClose}>
            <DialogTitle>Create Task details</DialogTitle>
            <DialogContent>
                <Stack spacing={2} padding={2}>
                    <TextField
                        size='small'
                        id="outlined-basic"
                        label="Taskname"
                        variant="outlined"
                        fullWidth
                        value={taskDatas.taskname}
                        onChange={(e) => setTaskDatas({ ...taskDatas, taskname: e.target.value })}
                    />

                    <TextField
                        size='small'
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={4}
                        fullWidth
                        value={taskDatas.description}
                        onChange={(e) => setTaskDatas({ ...taskDatas, description: e.target.value })}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Deadline"
                            value={taskDatas.deadline}
                           
                            onChange={(value) => setTaskDatas({ ...taskDatas, deadline: value })}
                        />
                    </LocalizationProvider>
                    <Autocomplete
                        size='small'
                        options={sampleData}
                        getOptionLabel={(option) => option}
                        value={taskDatas.status}
                        onChange={(event, value) => handleAutocompleteChange('status', value)}
                        renderInput={(params) => <TextField {...params} label="Status" />}
                    />
                    <Autocomplete
                        size='small'
                        options={apiProjectData}
                        getOptionLabel={(option) => option.project_name}
                        value={taskDatas.projectName?.projectName}
                        onChange={(event, value) => handleAutocompleteChange('projectName', value
                    )}
                        renderInput={(params) => <TextField {...params} label="Project Name" />}
                    />
                    <Autocomplete
                        size='small'
                        options={employeeData}
                        getOptionLabel={(option) => option.name}
                        value={taskDatas.employeeName?.employeeName}
                        onChange={(event, value) => handleAutocompleteChange('employeeName', value)}
                        renderInput={(params) => <TextField {...params} label="Employee Name" />}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                        <Button onClick={handleAddTask} variant="contained">ADD TASK</Button>
                    </DialogActions>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
