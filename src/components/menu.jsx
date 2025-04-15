import { ListGroup } from 'react-bootstrap';

export const Menu = ({ tasks, onSelect }) => {
    const listTasks = tasks.map((task) =>
        // React requires unique ids for these components, thus we use embedded task ids.
        <ListGroup.Item action key={task.id} onClick={_ => onSelect(task.id)}>
            {task.title}
        </ListGroup.Item>
    )

    return (
        <ListGroup>
            {listTasks}
        </ListGroup>
    );
};
