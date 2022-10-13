import '../screens.css';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Checkbox,
    TextField,
    Divider,
    Typography,
    Button,
    Card,
} from '@mui/material';

import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { BsChevronDown, BsFillPlusCircleFill, BsCheckCircle, BsCircle } from 'react-icons/bs';

import { getTasks, postTask, putTask } from '../../../services/TaskService';
import ModalTask from '../../layouts/ModalTask';
import styles from './Task.module.css';
import TaskRemove from './TaskRemove';
import TaskUpdate from './TaskUpdate';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function CustomizeDayPicker() {

    const date = new Date()
    const [valueDate, setValueDate] = useState(dayjs(date));
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    const [search, setSearch] = useState('')
    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(0)

    const [value, setValue] = useState(new Date());


    useEffect(() => {
        listTasks()

        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };

    }, [])

    async function listTasks(offsetParam = 0, searchParam = '', bySearchParam = 'name') {
        const data = await getTasks(offsetParam, searchParam, bySearchParam)
        setCount(data.count)

        if (offsetParam === 0)
            setTasks(data.results)
        else
            setTasks(tasks.concat(data.results))
    }

    async function saveTask(task) {
        postTask(task)
        listTasks()
    }

    async function taskCompleted(updatedTask) {
        updatedTask['taskCompleted'] = !updatedTask['taskCompleted']
        await putTask(updatedTask, updatedTask.id)
        await listTasks()
    }

    async function pagination() {
        listTasks(offset + 10, search)
        setOffset(offset + 10)
    }

    async function refresh() {
        listTasks()
        setOffset(0)
    }

    return (
        <section className={styles.container}>

            <div className={styles.containerTask}>

                <Card className={styles.divFilter}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            value={valueDate}
                            onChange={(newValue) => {

                                const newDate = new Date(newValue);

                                setValueDate(newValue);
                                listTasks(0, newDate, 'date')
                                setOffset(0)
                               
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            dayOfWeekFormatter={(day) => `${day}.`}
                            toolbarFormat="ddd DD MMMM"
                            showToolbar
                        />
                    </LocalizationProvider>

                    <div className={styles.clock}>
                        <h1>{value.toLocaleTimeString()}</h1>
                    </div>

                </Card>

                <Divider sx={{ m: 1 }} />

                <h1 id='tasksTitle'>To-do List</h1>

                <div className={styles.listTasks}>

                    <div className={styles.searchContainer}>

                        <TextField
                            fullWidth
                            label="Search task by name"
                            variant="standard"
                            onChange={event => {
                                listTasks(0, event.target.value)
                                setSearch(event.target.value)
                                setOffset(0)
                            }}
                        />

                    </div>

                    {tasks.map((task) => {
                        return (

                            <Accordion key={task.id}>

                                <AccordionSummary expandIcon={<BsChevronDown />} >

                                    <Typography sx={{ width: '33%', flexShrink: 0, wordBreak: 'break-all' }}>

                                        <Checkbox
                                            checked={task.taskCompleted}
                                            icon={<BsCircle style={{ fontSize: 20 }} />}
                                            checkedIcon={<BsCheckCircle style={{ fontSize: 20 }} />}
                                            onChange={() => taskCompleted(task)}
                                        />

                                        {task.name}

                                    </Typography>

                                    <Typography sx={{ color: 'text.secondary' }}>

                                        {(() => {
                                            var date = new Date(task.taskDate);
                                            return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`
                                        })()}

                                    </Typography>

                                </AccordionSummary>

                                <AccordionDetails>

                                    <Typography sx={{ wordBreak: 'break-all', mb: 5 }}>
                                        {task.description}
                                    </Typography>

                                    <div className={styles.options}>
                                        <TaskUpdate
                                            id={task.id}
                                            task={task}
                                            refresh={refresh}
                                        />

                                        <TaskRemove
                                            id={task.id}
                                            taskName={task.name}
                                            refresh={refresh}
                                        />
                                    </div>

                                </AccordionDetails>

                            </Accordion>
                        )
                    })}


                    {(count !== tasks.length && count > 0) &&
                        <Button onClick={pagination} >

                            Mostrar mais
                            <BsFillPlusCircleFill style={{ marginLeft: 5, fontSize: 20 }} />

                        </Button>}

                </div>

            </div>

            <ModalTask
                action={saveTask}
                open={open}
                setOpen={setOpen}
                title='Salvar' />

            <IconButton
                title="New task"
                onClick={() => setOpen(true)}
                sx={{
                    position: 'fixed',
                    right: 20,
                    bottom: 20,
                }}>
                <BsFillPlusCircleFill style={{ fontSize: 60 }} />
            </IconButton>

        </section>
    );
}
