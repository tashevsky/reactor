import { Container, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { Home, ArrowBack } from '@mui/icons-material';
import NotFoundAnimation from '../../animations/404.json';

const NotFoundPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          textAlign: 'center',
          py: 8
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ position: 'relative', mb: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: isMobile ? '8rem' : '12rem',
                fontWeight: 900,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                userSelect: 'none'
              }}
            >
              404
            </Typography>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? 150 : 250
            }}>
              <Lottie options={defaultOptions} />
            </Box>
          </Box>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.text.primary
            }}
          >
            Lost in Space?
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.2rem',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              color: theme.palette.text.secondary
            }}
          >
            The page you're looking for seems to have drifted off into the cosmic void. 
            Don't worry, our team of digital astronauts is on the case!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Home />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: 3,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease'
              }}
            >
              Return to Home
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<ArrowBack />}
              onClick={() => window.history.back()}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Go Back
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default NotFoundPage;