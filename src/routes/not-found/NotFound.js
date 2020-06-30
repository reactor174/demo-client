import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Maps() {
  return (
	  <section>
      <Container>
        
        <Row style={{ height : '90vh', }} className="align-items-center">
          <Col>
            <h1>Страница не существует</h1>
            <p className="py-5">Такой страницы не существует</p>
            <Button variant="outline-info" href="/">Перейти к описанию</Button>
          </Col>
        </Row>
        
      </Container>
	  </section>
  );
}

export default Maps;
