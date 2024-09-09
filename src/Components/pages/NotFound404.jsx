import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <Row className="text-center">
                <Col>
                    <div className="mb-4">
                        <h1 className="display-1">404</h1>
                    </div>
                    <p className="lead mb-4">Oops! The page you are looking for does not exist.</p>
                    <Link to="/" className="btn btn-primary">Go Back to Home</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound404;
