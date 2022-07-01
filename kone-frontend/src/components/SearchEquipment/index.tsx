import * as yup from 'yup';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from 'moment';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import styles from './styles/SearchEquipment.module.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { EquipmentResponseInterface } from '../../interfaces';
import { useFormik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchEquipment() {
  const [equipment, setEquipment] = useState<EquipmentResponseInterface>();

  const formik = useFormik({
    initialValues: { equipmentNumber: 0 },
    validationSchema: yup.object({
      equipmentNumber: yup.number(),
    }),
    onSubmit: (formValues) => {
      axios
        .get<EquipmentResponseInterface>(`/equipment/${formValues.equipmentNumber}`)
        .then((response) => {
          setEquipment(response.data);
        })
        .catch(() => setEquipment(undefined));
    },
  });

  return (
    <Box>
      <Typography variant='h4' component='div' gutterBottom>
        Search equipment
      </Typography>

      <Stack spacing={5}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={1}>
            <TextField
              label='Equipment Number'
              id='equipmentNumber'
              name='equipmentNumber'
              variant='outlined'
              fullWidth
              defaultValue={formik.values.equipmentNumber}
              onChange={formik.handleChange}
              error={formik.touched.equipmentNumber && Boolean(formik.errors.equipmentNumber)}
              helperText={formik.errors.equipmentNumber}
            />
            <Button variant='contained' type='submit' endIcon={<SearchIcon />}>
              Search Equipment
            </Button>
          </Stack>
        </form>

        <Card className={styles.card}>
          <CardContent>
            <Typography variant='h6' component='span'>
              Equipment Number:
            </Typography>
            <Typography>{equipment?.equipmentNumber}</Typography>

            <Typography variant='h6'>Address:</Typography>
            <Typography>{equipment?.address}</Typography>

            <Typography variant='h6'>Contract Start Date:</Typography>
            <Typography>{moment(equipment?.contractStartDate).format('DD.MM.YYYY')}</Typography>

            <Typography variant='h6'>Address:</Typography>
            <Typography>{moment(equipment?.contractEndDate).format('DD.MM.YYYY')}</Typography>

            <Typography variant='h6'>Status:</Typography>
            <Typography>{equipment?.status}</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
