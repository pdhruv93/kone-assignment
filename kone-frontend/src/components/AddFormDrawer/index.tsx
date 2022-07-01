import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Form from './Form';
import Stack from '@mui/material/Stack';
import styles from './styles/AddFormDrawer.module.css';
import Typography from '@mui/material/Typography';
import { KeyboardEvent, MouseEvent, useState } from 'react';

export default function AddFormDrawer(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Box className={styles.addButton}>
        <Button variant='contained' endIcon={<AddIcon />} onClick={toggleDrawer()}>
          Add New Equipment
        </Button>
      </Box>

      <Drawer anchor='right' open={isOpen} onClose={toggleDrawer()}>
        <Box className={styles.drawerContainer} sx={{ p: 5 }} role='presentation'>
          <Typography variant='h5' sx={{ mb: 2 }} gutterBottom component='div'>
            Add new Equipment
          </Typography>

          <Stack className={styles.profileOptionsStack} spacing={6}>
            <Form />
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
