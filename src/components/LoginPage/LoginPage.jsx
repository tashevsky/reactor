import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../redux/actions';
import { useLoginState } from '../../providers/AuthProvider';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import AuthForm from './AuthForm';

const LoginPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { login } = useLoginState();
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const action = isLogin ? loginUser(values, login) : registerUser(values);
            await dispatch(action).unwrap();
        } catch (error) {
            if (isLogin === true) {
                setErrors({ submit: "Authentication error: invalid password or login." })
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            p: 3,
            backgroundColor: theme.palette.background.default
        }}>
            <Paper elevation={3} sx={{
                width: '100%',
                maxWidth: 400,
                p: 4,
                borderRadius: 2
            }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Typography>

                <AuthForm 
                    isLogin={isLogin}
                    onSubmit={handleSubmit}
                />

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Button 
                        onClick={() => setIsLogin(!isLogin)}
                        color="primary"
                        variant="text"
                    >
                        {isLogin 
                            ? "Need an account? Register" 
                            : "Already have an account? Login"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default LoginPage;