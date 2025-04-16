import { Fragment } from 'react'
import { Card } from 'react-bootstrap'
import { ThemeContext } from './theme'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Counter } from './reduxCounter'

// TaskContent has better naming tho
export const Content = ({ task }) => {
    const { theme, _ } = useContext(ThemeContext);

    const drawer = (nested) => {
        switch (typeof nested) {
            case 'string':
                return <li>{nested}</li>
            case 'object':
                return <ul> {Object.keys(nested).map((element, index) => {
                    // <> ... </> sugar for Fragment won't work here due to *key* requirement.
                    return <Fragment key={index}>{drawer(nested[element])}</Fragment>;
                })} </ul>
            default:
                return null
        }
    }

    return (
        <Routes>
            <Route path='/' element={
                <Card data-bs-theme={theme}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text /* Force div container */ as='div'>{drawer(task.content)}</Card.Text>
                    </Card.Body>
                </Card>
            }
            />

            <Route path='/redux' element={
                <Counter />
            }
            />
        </Routes>
    );
};
