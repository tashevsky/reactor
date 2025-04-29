import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../../redux/actions';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import * as Yup from 'yup';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  message: Yup.string().required('Required field'),
});

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(addFeedback(values));
    resetForm();
    setSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Feedback
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please send your feedback:
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Feedback sent successfully!
        </Alert>
      )}

      <Formik
        initialValues={{ name: '', message: '' }}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <Field
              as={TextField}
              name="message"
              label="Message"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={touched.message && !!errors.message}
              helperText={touched.message && errors.message}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FeedbackForm;