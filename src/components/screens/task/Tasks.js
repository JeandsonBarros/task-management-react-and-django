import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Divider,
    IconButton,
    LinearProgress,
    TextField,
    Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { BsArrowRepeat, BsCheckCircle, BsChevronDown, BsCircle, BsFillPlusCircleFill } from 'react-icons/bs';

import { getTasks, postTask, putTask } from '../../../services/TaskService';
import ModalTask from '../../layouts/ModalTask';
import styles from './Task.module.css';
import TaskRemove from './TaskRemove';
import TaskUpdate from './TaskUpdate';

export default function CustomizeDayPicker() {

    const date = new Date()
    const [valueDate, setValueDate] = useState(dayjs(date));

    const [open, setOpen] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('')
    const [searchParam, setSearchParam] = useState('')

    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(0)

    const [value, setValue] = useState(new Date());

    const [progress, setProgress] = useState(false)

    useEffect(() => {

        listTasks()

        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };

    }, [])

    async function listTasks(offsetParam = 0, searchParam = '', bySearchParam = 'name') {

        setProgress(true)

        const data = await getTasks(offsetParam, searchParam, bySearchParam)
        setCount(data.count)

        if (offsetParam === 0)
            setTasks(data.results)
        else
            setTasks(tasks.concat(data.results))

        setProgress(false)
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
        listTasks(offset + 10, search, searchParam)
        setOffset(offset + 10)
    }

    async function refresh() {
        listTasks()
        setOffset(0)
    }

    async function selectByDate(dateParam) {

        setValueDate(dateParam);

        const newDate = new Date(dateParam);
        let dataFormatada = (newDate.getFullYear() + "-" + ((newDate.getMonth() + 1)) + "-" + (newDate.getDate()));

        setSearch(dataFormatada)
        setSearchParam('date')

        listTasks(0, dataFormatada, 'date')
        setOffset(0)

        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        })


    }

    function tasksList() {
        if (tasks.length > 0) {
            return (<>
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
            </>
            )
        }
        else {
            return 'No tasks'
        }
    }

    return (
        <section className={styles.container}>

            {progress && <LinearProgress />}

            <div className={styles.containerTask}>

                <Card className={styles.divFilter}>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            value={valueDate}
                            onChange={selectByDate}
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

                <h1 style={{ margin: '20px 0 10px 10px' }}>

                    {search ? `Task search by: ${search}` : `All tasks`}

                    <IconButton title='All tasks' onClick={() => {
                        listTasks()
                        setOffset(0)
                        setSearch('')
                        setSearchParam('')
                    }}>
                        <BsArrowRepeat />
                    </IconButton>

                </h1>

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

                    {tasksList()}

                    {(count !== tasks.length && count > 0) &&
                        <Button onClick={pagination} >

                            Show more
                            <BsFillPlusCircleFill style={{ marginLeft: 5, fontSize: 20 }} />

                        </Button>}

                    {progress && <CircularProgress sx={{ m: 'auto' }} />}

                </div>

            </div>

            <ModalTask
                action={saveTask}
                open={open}
                setOpen={setOpen}
                title='Save' />

            <IconButton
                hover='false'
                title="New task"
                onClick={() => setOpen(true)}
                sx={{
                    position: 'fixed',
                    right: 20,
                    bottom: 20,
                    hover: 'false',
                    backgroundColor: '#20b2aa'
                }}>
                <BsFillPlusCircleFill style={{ fontSize: 60 }} />
            </IconButton>

        </section>
    );
}
