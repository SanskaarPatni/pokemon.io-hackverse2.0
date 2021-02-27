import React from 'react';
import { Input, Form } from 'reactstrap'
const Inputt = ({ message, setMessage, sendMessage }) => (
    <Form>
        <Input type="text" placeholder="Type a message.."
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            value={message} />
    </Form>
)
export default Inputt;