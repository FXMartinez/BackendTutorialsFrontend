import React, { Component } from 'react';
import Character from '../components/Character';
import { Menu, Button } from 'semantic-ui-react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Welcome from '../components/Welcome';
import CreateCharacter from '../components/CreateCharacter';


const characterApi = "https://localhost:5001/api/Character";

class Main extends Component {
    state = {
        characters: []
    }

    componentDidMount() {
        this.getCharacter();

        // old way
        // fetch("https://localhost:5001/api/Character")
        // .then(res => res.json())
        // .then( data => 
        //     this.setState({
        //         characters: [...data]
        //     }))
    }

    getCharacter = () => {
        fetch(characterApi)
        .then(res => res.json())
        .then( data => 
            this.setState(() => {
                return {
                    characters: [...data]
                };
            }
        ))
    }

    createCharacter = (name) => {
        fetch(characterApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                characters: [...this.state.characters, data]
            })
        })
        .catch(err => { alert("Character already exists with that name."); console.log(err) })
        // console.log(name)
    }

    editCharacter = (id, name) => {
        // make sure to add id to the body being sent for put request
        fetch(`${characterApi}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                id: id,
                name: name
            })
        })
        // trying to get a response and set state twice with filtering doesnt work like i thought
        // i have to look into it more but i got nothing back as far as a response. instead it ended up
        // being much easier to just run the method that loads the characters back into the state instead
        // of taking extra steps and setting state twice i the edit method

        // .then(resp => console.log(resp.json()))
        // .then(data => console.log(data))
        // .catch(err => console.log("in catch error", err))
        // .then(data => {
        //     this.setState({
        //         characters: this.editCharacter(id) // filter the array of the old object
        //     });
        //     this.setState({
        //         characters: [...this.state.characters, data] // add the new object to the state array of characters
        //     })
        // })
        this.getCharacter();
    }

    deleteCharacter = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(`${characterApi}/${id}`, {
                method: "DELETE"
            })
            .then( this.setState({
                characters: this.filterArray(id)
            }) )        
        }
    }

    editedFilter = (name, newObject) => {
        let newArray = this.state.characters.filter( e => {
            return e["name" != name]
        })
        newArray = [...newArray, newObject]
        return newArray
    }

    filterArray = (id) => {
        let newArray = this.state.characters.filter( e => {
            return e["id"] != id 
        })
        // console.log("in filter method", this.state.characters)
        return newArray
    }

    render() {

        console.log(this.state.characters);

        return  <div>
                    <div>
                        
                        <Link to="/">
                            <Button content="Home" />
                        </Link>

                        <br/>

                        <Link to="/Characters">
                            <Button content='Characters' />
                        </Link>

                        <Link to="/CreateCharacter">
                            <Button content="Create Character"/>   
                        </Link>

                        <Link to="/DeletedCharacters">
                        <Button content='Deleted Characters' />
                        </Link>
                
                    </div>

                    <br/>
                    <br/>

                    <div>

                        <Switch>

                            <Route exact path="/" render={ () => <Welcome /> } />

                            <Route exact path="/Characters" render={() => this.state.characters.map( character => {
                                return  <div key={character.id}>    <Character 
                                                                        edit={this.editCharacter} 
                                                                        delete={this.deleteCharacter} 
                                                                        characterData={character}/> 
                                                                    </div>     })  }  />

                            <Route exact path="/CreateCharacter" render={() =>  <CreateCharacter 
                                                                                    create={this.createCharacter} 
                                                                                />} />

                        </Switch>

                    </div>
                </div>

    } // end of render
} // end of Main

export default Main;