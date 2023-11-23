import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import Header from './components/Header';
import Layout from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route, Link } from 'react-router-dom';
import { CategoryList } from './features/categories/ListCategory';
import { CategoryCreate } from './features/categories/CreateCategory';
import { CategoryEdit } from './features/categories/EditCategory';
import { SnackbarProvider } from 'notistack'

function App() {
  return <ThemeProvider theme={appTheme}>
    <SnackbarProvider
      autoHideDuration={2000}
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"

      }}
    >

      <Box component="main"
        sx={{
          height: "100vh",
          backgroundColor: (theme) => theme.palette.grey[900],
        }}
      >
        <Header />
        <Layout>
          <Routes>
            <Route path='/' element={<CategoryList />}> </Route>
            <Route path='/categories' element={<CategoryList />}> </Route>
            <Route path='/categories/create' element={<CategoryCreate />}> </Route>
            <Route path='/categories/edit/:id' element={<CategoryEdit />}> </Route>
            <Route path='*'
              element={
                <Box sx={{ color: "white" }}>
                  <Typography variant='h1' > 404 </Typography>
                  <Typography variant='h2'>Page not found </Typography>
                </Box>
              }
            ></Route>
          </Routes>
        </Layout>
      </Box>
    </SnackbarProvider>
  </ThemeProvider>;
}

export default App;
