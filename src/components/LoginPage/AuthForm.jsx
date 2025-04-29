import { Button, Typography, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const AuthForm = ({ isLogin, onSubmit }) => {
  // Conditional validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Required')
      .when('isLogin', () => {
        // Use dummy context to enable conditional
        return isLogin
          ? Yup.string() // No min length for login!
          : Yup.string().min(6, 'Minimum 6 characters');
      })
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, handleChange, values }) => (
        <Form>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          {/* Check for authentication errors */}
          {errors.submit && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.submit}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;