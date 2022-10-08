import './App.css';
import Task from './components/screens/task/Tasks';
import Login from './components/screens/auth/Login';
import Container from './components/screens/Container';
import Register from './components/screens/auth/Register';
import UserConfig from './components/screens/auth/UserConfig';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BsCalendarCheck } from "react-icons/bs";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, IconButton, Popover, Typography } from '@mui/material';
import { BsFillMoonStarsFill, BsFillSunFill, BsPersonCircle } from "react-icons/bs";
import { useState } from 'react';
import Header from './components/layouts/Header';

/* https://color.adobe.com/pt/explore */
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#012E40',
      paper: '#024959',
    },
  },
});

const ligthTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
      paper: '#3CA6A6',
    },
    action: {
      disabledBackground: '#024959',
      active: '#024959',
      hover: '#024959',
      disabled: '#024959',
    },
    primary: {
      main: '#024959',
    },
    secondary: {
      main: '#F3E3D4',
    },

  },
});

function App() {

  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const [themeSystem, setThemeSystem] = useState(darkThemeMq.matches)

  return (

    <ThemeProvider theme={themeSystem ? darkTheme : ligthTheme}>

      <CssBaseline />

      <div className="App">

        <Container>

          <BrowserRouter>

            <Header themeSystem={themeSystem} setThemeSystem={setThemeSystem} />

            <Routes>
              <Route path='*' element={<h1> 404 - Pagina não encontrada</h1>} />
              <Route path="/" element={<Task />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/registro/" element={<Register />} />
              <Route path="/user-config/" element={<UserConfig />} />
            </Routes>

          </BrowserRouter>

        </Container>

      </div>

    </ThemeProvider>
  );
}

export default App;
