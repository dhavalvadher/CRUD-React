import React from 'react';
import {
  Button, TextField, Typography, Container, Box, Checkbox, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

let d = new Date();
d.setDate(new Date().getDate() - 1);

const getExtension = (filename) => {
  return filename ? filename.split('.').pop().toLowerCase() : '';
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be between 2 and 30 characters')
    .max(30, 'Name must be between 2 and 30 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  phone_no: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(10, 'Phone number must be exactly 10 digits')
    .max(10, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  age: Yup.number()
    .min(18, 'Age must be at least 18 years')
    .required('Age is required'),
  appointment_date: Yup.date()
    .min(d, 'Appointment date must be today or later')
    .required('Appointment date is required'),
  message: Yup.string()
    .required('Message is required')
    .test("message extra space", "Please add only one space in your message", (value) => {
      return !value.includes("  ");
    })
    .test("message trim", "Message must be at least 5 words long", (value) => {
      return value ? value.trim().split(" ").length >= 5 : false;
    }),
  file: Yup.mixed()
    .required('File is required')
    .test('fileFormat', 'File must be a jpeg, png, svg or pdf image', (value) => {
      return value && ['image/jpeg', 'image/png', 'application/pdf', 'image/svg'].includes(value.type);
    })
    .test('fileSize', 'Please upload file size less than 2 mb', (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    }),
  gender: Yup.string()
    .required('Gender is required'),
  hobbies: Yup.array()
    .min(1, 'Please select at least one hobby')
    .required('Hobbies are required')
});

function Form() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      phone_no: '',
      age: '',
      appointment_date: '',
      message: '',
      file: null,
      gender: '',
      hobbies: []
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted successfully!', values);
    },
  });

  const { handleSubmit, handleChange, handleBlur, setFieldValue, errors, values, touched } = formik;

  const handleHobbiesChange = (event) => {
    const value = event.target.value;
    const newHobbies = values.hobbies.includes(value)
      ? values.hobbies.filter(hobby => hobby !== value)
      : [...values.hobbies, value];
    setFieldValue('hobbies', newHobbies);
  };

  const hobbiesList = ["music", "singing"];

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Form Validation
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            margin="normal"
          />
          <TextField
            fullWidth
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirm_password && Boolean(errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
            margin="normal"
          />
          <TextField
            fullWidth
            id="phone_no"
            name="phone_no"
            label="Phone Number"
            value={values.phone_no}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone_no && Boolean(errors.phone_no)}
            helperText={touched.phone_no && errors.phone_no}
            margin="normal"
          />
          <TextField
            fullWidth
            id="age"
            name="age"
            label="Age"
            type="number"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.age && Boolean(errors.age)}
            helperText={touched.age && errors.age}
            margin="normal"
          />
          <TextField
            fullWidth
            id="appointment_date"
            name="appointment_date"
            label="Appointment Date"
            type="date"
            value={values.appointment_date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.appointment_date && Boolean(errors.appointment_date)}
            helperText={touched.appointment_date && errors.appointment_date}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            id="message"
            name="message"
            label="Message"
            multiline
            rows={4}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.message && Boolean(errors.message)}
            helperText={touched.message && errors.message}
            margin="normal"
          />
          <input
            id="file"
            name="file"
            type="file"
            onBlur={handleBlur}
            onChange={(event) => {
              setFieldValue('file', event.currentTarget.files[0]);
            }}
          />
          {touched.file && errors.file && (
            <div>{errors.file}</div>
          )}

          <FormControl
            margin="dense"
            fullWidth
            error={touched.gender && Boolean(errors.gender)}
          >
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            {touched.gender && (
              <FormHelperText>{errors.gender}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            margin="dense"
            fullWidth
            error={touched.hobbies && Boolean(errors.hobbies)}
          >
            <FormLabel>Hobbies</FormLabel>
            {hobbiesList.map((hobby) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={hobby}
                    checked={values.hobbies.includes(hobby)}
                    onChange={handleHobbiesChange}
                    onBlur={handleBlur}
                  />
                }
                label={hobby}
                key={hobby}
              />
            ))}
            {touched.hobbies && (
              <FormHelperText>{errors.hobbies}</FormHelperText>
            )}
          </FormControl>
          <Box mt={2}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Form;

