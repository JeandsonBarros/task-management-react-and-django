import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

function ModalTask({ open, setOpen, title, taskUpdate, action }) {

    const date = new Date()
    const [task, setTask] = useState(taskUpdate || { taskDate: date })
    const [progress, setProgress] = useState(false)

    function setValuesTask(key, value) {

        let taskTemp = task
        taskTemp[key] = value

        setTask({ ...task })

    }

    return (

        <Dialog open={open} onClose={() => setOpen(false)}>
            {progress && <LinearProgress />}

            <DialogTitle sx={{ mb: 2 }}> {title} task</DialogTitle>

            <DialogContentText>
            </DialogContentText>

            <DialogContent >

                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                        label="Task day and time"
                        value={task.taskDate}
                        onChange={valueDate => setValuesTask('taskDate', valueDate)}
                        renderInput={(params) => <TextField {...params} />}
                    />

                </LocalizationProvider>

                <TextField
                    autoFocus
                    margin="dense"
                    label="Task name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={task.name || ''}
                    onChange={event => setValuesTask('name', event.target.value)}
                />

                <TextField
                    rows={4}
                    autoFocus
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={task.description || ''}
                    onChange={event => setValuesTask('description', event.target.value)}
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={() => {
                    setOpen(false)
                    setTask({ taskDate: date })
                }}>
                    Cancel
                </Button>

                <Button
                    onClick={async () => {
                        setProgress(true)

                        await action(task)

                        setProgress(false)
                        setOpen(false)

                        setTask({ taskDate: date })
                    }}>
                    {title}
                </Button>

            </DialogActions>

        </Dialog>

    );
}

export default ModalTask;