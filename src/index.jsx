// Fancy CSS from bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Menu } from './components/menu';
import { Content } from './components/content';
import { Container, Row, Col } from 'react-bootstrap';
import { tasks } from './tasks'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { counterReducer } from './store/counter.jsx'
import { ThemeProvider } from './components/theme';

const store = createStore(counterReducer)

export const App = () => {
  // ST: [Content]
  const [task, setTask] = useState(tasks[0]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Container className="mt-4 flex-grow-1">
            <Row>
              <Col md="auto">
                <Menu tasks={tasks} onSelect={(id) => setTask(tasks.find((task) => task.id === id))} />
              </Col>
              <Col>
                <Content task={task} />
              </Col>
            </Row>
          </Container>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}
