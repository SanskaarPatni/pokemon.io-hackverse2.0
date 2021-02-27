import React from 'react';
import { Table, Col, Container } from 'reactstrap';
const TextContainer = ({ users, winner }) => {
  return (
    <Container >
      <h3 className='text-center' style={{ fontFamily: "Roboto Condensed" }}>Scores</h3>
      {users ? (<Col>
        <Table striped className="table-font">
          <tbody>
            {users.map(({ name, score }) => (<tr>
              <td>{name}</td>
              <td>{score}</td>
            </tr>
            ))}
          </tbody>
        </Table>
        <br></br>
        <br></br>
        {winner !== '' ? <div><i>The winner is {winner}</i></div> : null}
      </Col>) : null
      }
    </Container>
  );
}

export default TextContainer;