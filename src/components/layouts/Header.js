import { useNavigate } from 'react-router-dom';
import { BsCalendarCheck } from "react-icons/bs";
import { IconButton, Popover, Typography } from '@mui/material';
import { BsFillMoonStarsFill, BsFillSunFill, BsPersonCircle } from "react-icons/bs";
import { useState } from 'react';

function Header({ themeSystem, setThemeSystem }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <header className="App-header">

            <a style={{ textDecoration: 'none', color: themeSystem ? '#fff' : '#000' }} href='/'>
                <BsCalendarCheck />
                <span>Task</span>
            </a>

            <div>

                <IconButton onClick={handleClick}>

                    <BsPersonCircle style={{ textAlign: 'center' }} />

                </IconButton>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >

                    <Typography sx={{ p: 2 }}>
                        
                        <IconButton onClick={()=>navigate('/user-config/')}>
                        User config
                        </IconButton>
                    </Typography>

                </Popover>

                <IconButton
                    onClick={() => {
                        setThemeSystem(!themeSystem)
                    }}
                >

                    {themeSystem ? <BsFillMoonStarsFill /> : <BsFillSunFill />}

                </IconButton>

            </div>

        </header>
    );
}

export default Header;