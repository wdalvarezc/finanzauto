import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from "react-router";
import axios from 'axios';
import React from 'react'


export default function Users() {

    const navigate = useNavigate();

    const [users, setData] = React.useState([]);
    const API_KEY = '63473330c1927d386ca6a3a5';

    React.useEffect(() => {
        axios.get('https://dummyapi.io/data/v1/user', {
            headers: {
                'app-id': API_KEY
            }
        })
            .then(response => {
                console.log(response)
                setData(response.data.data)
            })
            .catch(error => console.error('Error:', error));
    }, [])

    //funcion para redireccionar
    function handleDelete(id) {
        axios.delete(`https://dummyapi.io/data/v1/user/${id}`, {
            headers: {
                'app-id': API_KEY
            }
        })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));

    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Table striped="columns">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre Completo</th>
                                <th>foto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((usr) => {
                                return (
                                    <tr>
                                        <td>{usr.id}</td>
                                        <td>{`${usr.firstName} ${usr.lastName}`}</td>
                                        <td>
                                            <Image src={usr.picture} style={{ width: '100%' }} roundedCircle />
                                        </td>
                                        <td>
                                            <Button variant="info" onClick={() => { navigate(`/detalle/${usr.id}`) }}>
                                                detalle
                                            </Button>
                                            <Button variant="success" onClick={() => { navigate(`/editar/${usr.id}`) }}>
                                                Editar
                                            </Button>
                                            <Button variant="danger" onClick={() => { handleDelete(usr.id) }}>
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                );

                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}