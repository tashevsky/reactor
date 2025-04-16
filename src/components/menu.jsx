import { ListGroup } from 'react-bootstrap';
import { ThemeContext } from './theme'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

export const Menu = ({ tasks, onSelect }) => {
    const { theme, _ } = useContext(ThemeContext);

    const listTasks = tasks.map((task) =>
        // React requires unique ids for these components, thus we use embedded task ids.
        <ListGroup.Item action key={task.id} onClick={_ => onSelect(task.id)}>
            {task.title}
        </ListGroup.Item>
    )

    return (
        <Routes>
            <Route path='/' element={
                <ListGroup data-bs-theme={theme}>
                    {listTasks}
                </ListGroup>
            }

            />
            <Route path='/redux' element={
                <>
                </>
            }
            />
        </Routes>
    );
};
