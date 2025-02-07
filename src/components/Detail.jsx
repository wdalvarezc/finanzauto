import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router";
import React from 'react';
import axios from 'axios';


export default function Detail() {

    const params = useParams();
    const id = params.id


    const [user, setUser] = React.useState({});
    const API_KEY = '63473330c1927d386ca6a3a5';

    //llamado a la api con id seleccionado cuando carga el componente 
    React.useEffect(() => {
        axios.get(`https://dummyapi.io/data/v1/user/${id}`, {
            headers: {
                'app-id': API_KEY
            }
        })
            .then(response => {
                console.log(response)
                setUser(response.data)
            })
            .catch(error => console.error('Error:', error));
    }, [id])
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.picture} />
            <Card.Body>
                <Card.Title>{`${user.title}. ${user.firstName}`}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>{`Nombre: ${user.firstName}`}</ListGroup.Item>
                <ListGroup.Item>{`Apellido: ${user.lastName}`}</ListGroup.Item>
                <ListGroup.Item>{`Género: ${user.gender}`}</ListGroup.Item>
                <ListGroup.Item>{`Telefono: ${user.phone}`}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Link to='/'>
                    <Button>
                        volver
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

