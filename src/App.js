import './App.css';

import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/layouts/Header';
import Login from './components/screens/auth/Login';
import Register from './components/screens/auth/Register';
import UserConfig from './components/screens/auth/UserConfig';
import Container from './components/screens/Container';
import Task from './components/screens/task/Tasks';

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

/* 
'#012E41'
'#024A59'
'#026773'
'#3CA6A6'
'#F3E3D4' 
*/

const ligthTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
      paper: '#3CA6A6',
    },
    action: {
      disabledBackground: '#026773',
      active: '#024A59',
      hover: '#026773',
      disabled: '#F3E3D4',
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
              <Route path="/register/" element={<Register />} />
              <Route path="/user-config/" element={<UserConfig />} />
            </Routes>

          </BrowserRouter>

        </Container>

      </div>

    </ThemeProvider>
  );
}

export default App;
