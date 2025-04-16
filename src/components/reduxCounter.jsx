import { Button, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

export const Counter = () => {
    const count = useSelector((st) => st.count)
    const dispatch = useDispatch()

    return (
        <div /*class={props.className}*/>
            <h1>ST Redux Counter: {count}</h1>
            <Container className='d-flex gap-3'>
                <Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
                <Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
            </Container>
        </div>
    )
}