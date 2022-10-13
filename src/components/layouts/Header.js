import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    BsCalendarCheck,
    BsFillDoorOpenFill,
    BsFillMoonStarsFill,
    BsFillSunFill,
    BsGearFill,
    BsPersonCircle,
} from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { logout } from '../../services/AuthService';
import { getToken } from '../../services/TokenService';

function Header({ themeSystem, setThemeSystem }) {

    const location = useLocation()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {

        if (location.pathname === '/login/' || location.pathname === '/register/')
            setMenuVisible(false)

        else if (getToken())
            setMenuVisible(true)

        else
            navigate('/login/')

    }, [location, navigate])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <header className="App-header">

            <Link style={{ textDecoration: 'none', color: themeSystem ? '#fff' : '#024959' }} to='/'>
                <BsCalendarCheck />
                <span>Task</span>
            </Link>

            <div>

                {menuVisible && <IconButton onClick={handleClick}>

                    <BsPersonCircle style={{ textAlign: 'center' }} />

                </IconButton>}

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={() => {
                        handleClose()
                        navigate('/user-config/')
                    }}>
                        <BsGearFill /> <Typography sx={{ ml: 1 }}>User config</Typography>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            handleClose()
                            logout()
                            navigate('/login/'
                            )
                        }}>
                        <BsFillDoorOpenFill /> <Typography sx={{ ml: 1 }}> Logout </Typography>
                    </MenuItem>
                </Menu>

                <IconButton
                    onClick={() => {
                        setThemeSystem(!themeSystem)
                    }}
                >

                    {themeSystem ? <BsFillMoonStarsFill /> : <BsFillSunFill />}

                </IconButton>

            </div>

        </header >
    );
}

export default Header;