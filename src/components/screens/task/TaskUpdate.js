import { IconButton } from '@mui/material';
import { BsFillTrashFill } from "react-icons/bs";
import { putTask } from '../../../services/TaskService';
import React, { useState } from 'react';
import ModalTask from '../../layouts/ModalTask';
import { BsFillPencilFill } from "react-icons/bs";

function TaskUpdate({ id, refresh, task }) {

    const [open, setOpen] = useState(false);

    async function updateTask(updatedTask) {
        await putTask(updatedTask, id)
        await refresh()
        setOpen(false)
    }

    return (

        <div>

            <IconButton edge="end" onClick={()=> setOpen(true)} aria-label="delete">
                <BsFillPencilFill />
            </IconButton>

            <ModalTask
                open={open}
                setOpen={setOpen}
                action={updateTask}
                title="Update"
                taskUpdate={task}
            />

        </div>

    );
}

export default TaskUpdate;