import React from 'react'
import { Container, Button, Form, FormGroup, Input, Label } from 'reactstrap'

const GameSettings = ({ users, name, btn, start_game, showGameSettings, setRounds, setRegion, setMaxTime }) => {
    return (
        <Container>
            {users ? (
                name === users[0].name ? (<div className="text-center" >
                    {showGameSettings ? (
                        <Form >
                            <FormGroup>
                                <Label for="rounds">Number of Rounds</Label>
                                <Input type="select" name="rounds" id="rounds" onChange={(e) => { setRounds(e.target.value) }}>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </Input>
                                <Label for="maxTime">Time</Label>
                                <Input type="select" name="maxTime" id="maxTime" onChange={(e) => { setMaxTime(e.target.value) }}>
                                    <option>10</option>
                                    <option>15</option>
                                    <option>20</option>
                                </Input>
                                <Label for="genSelect">Select Generation</Label>
                                <Input type="select" name="genSelect" id="genSelect" onChange={(e) => { setRegion(e.target.value[4]) }}>
                                    <option>Gen 1</option>
                                    <option>Gen 2</option>
                                    <option>Gen 3</option>
                                    <option>Gen 4</option>
                                    <option>Gen 5</option>
                                    <option>Gen 6</option>
                                </Input>
                            </FormGroup>
                            <Button color="danger" size="lg" disabled={btn} onClick={(event) => { start_game() }}>Start Game</Button>
                        </Form>
                    ) : (null)}

                </div>) : null
            ) : null
            }
        </Container>
    )
}

export default GameSettings