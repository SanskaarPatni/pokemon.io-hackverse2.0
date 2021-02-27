import React from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle, Container
} from 'reactstrap';

function PokeGame({ wildPokemonID, timeLeft, gameStarted, isLoading }) {
    return (
        <Container style={{color:"black"}}>
            {gameStarted ?
                <Card>
                    <CardBody>
                        <CardTitle className='text-center' style={{ fontSize: '18px' }}><strong>Guess the pokemon!</strong></CardTitle>
                        <CardSubtitle className='text-center'>{timeLeft}</CardSubtitle>
                    </CardBody>
                    {isLoading ? <img height="300px" src="./wobble.gif" alt="wobble" /> :
                        <CardImg height="300px" src={"https://pokeres.bastionbot.org/images/pokemon/" + wildPokemonID + ".png"} alt="Loading.." />
                    }
                </Card> :
                <Card>
                    <CardBody>
                        <CardTitle className='text-center' style={{ fontSize: '18px' }}><strong>Rules</strong></CardTitle>
                        <br></br>
                        <CardSubtitle className='text-center'>
                            <i>1. Minimum 2 players are required to play the game.</i>
                            <br></br>                      
                            <i>2. Do not use headphones. Audio still in development.</i>
                            <br></br>
                        
                            <i>3. The Host can choose the Generation, number of Pokemons and time for each round.</i>
                            <br></br>
                          
                            <i>4. Use the chat box to guess the Pokemon's name and to chat with other people in the room.</i>
                            <br></br>
                            
                            <i>5. Use hyphen to join words if Pokemon's name is more than 1 word.</i>
                            
                            <br></br>
                            <i>6. Use the cross button on the chat box to exit.</i>
                            <br></br>
                           
                            <i>7. Refresh the browser and you are kicked out!</i>

                        </CardSubtitle>
                    </CardBody>
                </Card>
            }
        </Container >
    );
}
export default PokeGame;
