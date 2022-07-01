import * as yup from 'yup';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { EquipmentInterface, EquipmentResponseInterface } from '../../interfaces';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react';

export default function Form() {
  const initialValues: EquipmentInterface = {
    equipmentNumber: 0,
    address: '',
    contractStartDate: new Date(),
    contractEndDate: new Date(),
    status: 'RUNNING',
  };

  const validationSchema = yup.object({
    equipmentNumber: yup
      .number()
      .min(10, 'Must be more than 4 characters')
      .required('Equipment Number is required')
      .required(),
    address: yup.string().required('Address is required'),
    contractStartDate: yup.date().required('Start date is required'),
    contractEndDate: yup.date(),
    status: yup.mixed().oneOf(['RUNNING', 'STOPPED']).required('Status is required'),
  });

  const [startDate, setStartDate] = useState<Date>(initialValues.contractStartDate);
  const [endDate, setEndDate] = useState<Date>(initialValues.contractEndDate);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (formValues) => {
      const postParams: EquipmentInterface = {
        equipmentNumber: Number(formValues.equipmentNumber),
        address: formValues.address,
        contractStartDate: formValues.contractStartDate,
        contractEndDate: formValues.contractEndDate,
        status: formValues.status,
      };

      axios.post<EquipmentResponseInterface>(`/equipment`, postParams).then((response) => {
        toast.success('Equiment added successfully!');
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
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

        <TextField
          label='Address'
          id='address'
          name='address'
          variant='outlined'
          fullWidth
          defaultValue={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.errors.address}
        />

        <DesktopDatePicker
          label='Contract Start Date'
          value={formik.values.contractStartDate}
          onChange={(newValue) => {
            if (newValue) {
              setStartDate(newValue);
              formik.values.contractStartDate = newValue;
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id='contractStartDate'
              name='contractStartDate'
              variant='outlined'
              fullWidth
              value={startDate}
              error={formik.touched.contractStartDate && Boolean(formik.errors.contractStartDate)}
              helperText={String(formik.errors.contractStartDate)}
            />
          )}
        />

        <DesktopDatePicker
          label='Contract End Date'
          value={formik.values.contractEndDate}
          onChange={(newValue) => {
            if (newValue) {
              setEndDate(newValue);
              formik.values.contractEndDate = newValue;
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id='contractEndDate'
              name='contractEndDate'
              variant='outlined'
              fullWidth
              value={endDate}
              error={formik.touched.contractEndDate && Boolean(formik.errors.contractEndDate)}
              helperText={String(formik.errors.contractEndDate)}
            />
          )}
        />

        <Select
          label='Status'
          id='status'
          name='status'
          fullWidth
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
        >
          <MenuItem value='RUNNING'>RUNNING</MenuItem>
          <MenuItem value='STOPPED'>STOPPED</MenuItem>
        </Select>

        <Box>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
