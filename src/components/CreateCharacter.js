import React, {useState} from 'react';
import { Form, Button } from 'semantic-ui-react';

function CreateCharacter(props) {

    const [ name, setName ] = useState("");

    return ( 
        // console.log(name),
    
        <div>
            <p> Enter character name: </p>
            <Form.Input
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
            />
            <Button onClick={() => props.create(name)} content="Confirm" />

        </div>
    
        );
}

export default CreateCharacter;