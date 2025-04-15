import { Fragment } from 'react';
import { Card } from 'react-bootstrap';

// TaskContent has better naming tho
export const Content = ({ task }) => {
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
        <Card>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text /* Force div container */ as='div'>{drawer(task.content)}</Card.Text>
            </Card.Body>
        </Card>
    );
};
