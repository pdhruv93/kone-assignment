import '../../axios/interceptor';
import 'react-toastify/dist/ReactToastify.css';
import AddFormDrawer from '../AddFormDrawer';
import Box from '@mui/material/Box';
import DateAdapter from '@mui/lab/AdapterMoment';
import Navbar from '../Navbar';
import React from 'react';
import SearchEquipment from '../SearchEquipment';
import Stack from '@mui/material/Stack';
import styles from './styles/App.module.css';
import TableView from '../TableView';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Navbar />
      <Box className={styles.container}>
        <AddFormDrawer />
        <Stack direction='row' spacing={20}>
          <SearchEquipment />
          <TableView />
        </Stack>
        <ToastContainer position='bottom-left' newestOnTop={false} limit={1} />
      </Box>
    </LocalizationProvider>
  );
}

export default App;
