import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

function Character(props) {
    
    const [ edit, setEdit ] = useState(false);
    const [ name, setName ] = useState(props.characterData.name);
    // const confirm = confirm("Are you sure you want to delete your character?");
    
    return (
            <div key={props.characterData.id}>
                {
                edit === false
                ?
                <div>
                    <li> {name} </li>
                    <Button onClick={() => setEdit(!edit)} content="Edit" />
                    <Button onClick={() => props.delete(props.characterData.id)} content="Delete" />
                </div>
                :
                <div>
                    {/* <li> Edit form here </li> */}
                    <Form.Input
                        onChange={(e) => setName(e.target.value)}
                        placeholder={`${name}`}
                    />
                    <Button onClick={() => setEdit(!edit)} content="Edit" />
                    <Button onClick={() => props.characterData.name === name ? alert("Name has not been changed") : props.edit(props.characterData.id, name)} content="Confirm" />
                    <Button onClick={() => props.delete(props.characterData.id)} content="Delete" />
                </div>
                }
            </div>
            )
        }

export default Character;