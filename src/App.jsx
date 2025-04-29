import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ThemeProvider from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppContent from './components/AppContent';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
              <AuthProvider>
                  <ThemeProvider>
                      <AppContent/>
                  </ThemeProvider>
              </AuthProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;