import React, { useState } from 'react';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';

export const ProjectDialog = ({projectDialog, setProjectDialog, handleAddProject,projectDatas,setProjectDatas}) => {
  
    const handleClose = () => {
        setProjectDialog(false);
    };
    return (
    <Dialog fullWidth maxWidth="sm" open={projectDialog} onClose={handleClose}>
    <DialogTitle>Create Project details</DialogTitle>
    <DialogContent>
        <Stack spacing={2} padding={2}>
            <TextField
                size='small'
                id="outlined-basic"
                label="Projectname"
                variant="outlined"
                value={projectDatas.project_name}
                onChange={(e) => setProjectDatas({ ...projectDatas, project_name: e.target.value })}
                fullWidth
            />

            <TextField
                size='small'
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                minRows={4}
                value={projectDatas.description}
                onChange={(e) => setProjectDatas({ ...projectDatas, description: e.target.value })}
                fullWidth
            />
           
            <DialogActions>
                <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                <Button onClick={handleAddProject} variant="contained">ADD Project</Button>
            </DialogActions>
        </Stack>
    </DialogContent>
</Dialog>
  )
}
