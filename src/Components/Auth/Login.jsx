import { useContext, useState } from 'react';
import { Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || 'Authentication failed');
      }

      const data = await response.json();
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      ).toISOString();

      authCtx.login(data.idToken, expirationTime, data.email);
      toast.success('Login successful');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <section className="mt-5" style={{ minHeight: '350px' }}>
            <h1>Login</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Your Password</Form.Label>
                <Form.Control type="password" required />
              </Form.Group>
              <div className="mt-4">
                {!isLoading ? (
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                ) : (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </div>
            </Form>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
