import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email').required('Required field'),
});

const ProfileEditForm = ({ initialValues, onSubmit }) => {
  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: 'auto' }}>
      <h3>Edit profile</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              fullWidth
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileEditForm;