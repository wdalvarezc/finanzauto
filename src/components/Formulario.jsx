import Form from 'react-bootstrap/Form';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';



export default function Formulario() {
    const navigate = useNavigate()

    const params = useParams();
    const id = params.id


    const [user, setUser] = React.useState({});
    const API_KEY = '63473330c1927d386ca6a3a5';

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

    //opciones para los select 
    const titulo = ['mr', 'ms', 'mrs', 'miss', 'dr'];
    const genero = ['male', 'female', 'other'];

    //datos de envio para el formulario
    const [data, setData] = React.useState({});

    //control de cambio en el formulario
    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    //envio de datos 
    function handleSubmit(e) {
        e.preventDefault()
        if (id) {
            axios.put(`https://dummyapi.io/data/v1/user/${id}`, data, {
                headers: {
                    'app-id': API_KEY
                }
            })
                .then(response => {
                    console.log(response)
                    navigate(`/detalle/${response.data.id}`)
                })
                .catch(error => console.error('Error:', error));

        } else {
            axios.post(`https://dummyapi.io/data/v1/user/create`, data, {
                headers: {
                    'app-id': API_KEY
                }
            })
                .then(response => {
                    console.log(response.data.id)
                    navigate(`/detalle/${response.data.id}`)
                })
                .catch(error => console.error('Error:', error));
        }

    }
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        {user.id ?
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" placeholder="1" defaultValue={user.id} />
                            </Form.Group>
                            : ''}
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Select name='title' onChange={handleChange} defaultValue={user.title}>
                                <option disabled>seleccione</option>
                                {titulo.map((tit) => {
                                    return <option>{tit}</option>

                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control name='firstName' defaultValue={user.firstName} type="text" onChange={handleChange} placeholder="Nombres" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text" name='lastName' defaultValue={user.lastName} onChange={handleChange} placeholder="Apellidos" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="text" name='picture' defaultValue={user.picture} onChange={handleChange} placeholder="link foto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Género</Form.Label>
                            <Form.Select name='gender' onChange={handleChange} defaultValue={user.gender}>
                                <option disabled>seleccione</option>
                                {genero.map((tit) => {
                                    return <option>{tit}</option>

                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='email' defaultValue={user.email} onChange={handleChange} placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="number" name='phone' defaultValue={user.phone} onChange={handleChange} placeholder="3001112233" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}