import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@mui/material';
import { BsFillTrashFill } from "react-icons/bs";
import { deleteTask } from '../../../services/TaskService';
import React, { useState } from 'react';

function TaskRemove({ id, refresh, taskName }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function removeTask() {
        await deleteTask(id)
        await refresh()
        handleClose()
    }

    return (

        <div>

            <IconButton edge="end" onClick={handleClickOpen} aria-label="delete">
                <BsFillTrashFill />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Realmente deseja deletar a tarefa {taskName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={removeTask} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    );
}

export default TaskRemove;