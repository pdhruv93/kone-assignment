import * as yup from 'yup';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import styles from './styles/TableView.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { EquipmentResponseInterface } from '../../interfaces';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';

export default function TableView() {
  const [equipments, setEquipments] = useState<EquipmentResponseInterface[]>([]);
  const [limit, setLimit] = useState<Number>(5);

  const formik = useFormik({
    initialValues: { limit: limit },
    validationSchema: yup.object({
      limit: yup.number().min(1).max(100),
    }),
    onSubmit: (formValues) => {
      setLimit(formValues.limit);
    },
  });

  useEffect(() => {
    axios.get<EquipmentResponseInterface[]>(`/equipment/search?limit=${limit}`).then((response) => {
      setEquipments(response.data);
    });
  }, [limit]);

  return (
    <Box className={styles.container}>
      <Typography variant='h4' component='div' gutterBottom>
        List of Equipments
      </Typography>

      <Box className={styles.limitForm}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={1}>
            <TextField
              type='number'
              label='Limit'
              id='limit'
              name='limit'
              variant='outlined'
              fullWidth
              defaultValue={formik.values.limit}
              onChange={formik.handleChange}
              error={formik.touched.limit && Boolean(formik.errors.limit)}
              helperText={
                formik.touched.limit && Boolean(formik.errors.limit)
                  ? String(formik.errors.limit)
                  : ''
              }
            />
            <Button variant='contained' type='submit' endIcon={<SearchIcon />}>
              Fetch
            </Button>
          </Stack>
        </form>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>EqNumber</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipments.map((equipment) => (
              <TableRow key={equipment._id} data-testid='equipment-row'>
                <TableCell>{equipment.equipmentNumber}</TableCell>
                <TableCell>{equipment.address}</TableCell>
                <TableCell>{moment(equipment.contractStartDate).format('DD.MM.YYYY')}</TableCell>
                <TableCell>{moment(equipment.contractEndDate).format('DD.MM.YYYY')}</TableCell>
                <TableCell>
                  {equipment.status}
                  {equipment.status === 'RUNNING' ? (
                    <CheckCircleIcon color='success' />
                  ) : (
                    <ErrorIcon color='error' />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
