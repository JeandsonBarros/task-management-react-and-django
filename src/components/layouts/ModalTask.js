import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';

function ModalTask({ open, setOpen, title, taskUpdate, action }) {

    const date = new Date()
    const [task, setTask] = useState(taskUpdate || { taskDate: date })

    function setValuesTask(key, value) {

        let taskTemp = task
        taskTemp[key] = value

        setTask({...task})

    }

    return (

        <Dialog open={open} onClose={() => setOpen(false)}>

            <DialogTitle sx={{ mb: 2 }}> {title} tarefa</DialogTitle>

            <DialogContentText>
            </DialogContentText>

            <DialogContent >

                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DateTimePicker
                        label="Dia e hora da tarefa"
                        value={task.taskDate}
                        onChange={valueDate => setValuesTask('taskDate', valueDate)}
                        renderInput={(params) => <TextField {...params} />}
                    />

                </LocalizationProvider>

                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome da tarefa"
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
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={task.description || ''}
                    onChange={event => setValuesTask('description', event.target.value)}
                />

            </DialogContent>

            <DialogActions>

                <Button onClick={() => setOpen(false)}>Cancel</Button>

                <Button
                    onClick={() => {
                        action(task)
                        setOpen(false)
                    }}>
                    {title}
                </Button>

            </DialogActions>

        </Dialog>

    );
}

export default ModalTask;