import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../logo.svg';

function Footer() {
  return (
    <footer className="bg-dark">
      <Container className="py-3">
        <Row className="align-items-center">
          <Col md={ 10 } className="text-left text-white">
            <p>Данный проект является демонстрационным, и не несет никаких других целей, кроме 
              презентации навыков разработчика по использованию ряда инструментов для front-end и 
              back-end разработки.</p>
            <p>Все имена и события, использованные в проекте, являются вымышленными. Любые совпадения 
              с реальныи людьми и событиями - чистая случайность :).</p>
            <p>В проекте используются файлы cookie, их данные хранятся только в пределах проекта, и 
              далее никуда не распространяются и нигде не используются.</p>
          </Col>
          <Col md={2} className="text-center">
            <img
              src={ logo }
              width="70"
              height="70"
              className="app-logo d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <br />
            <Button href="https://github.com/reactor174" target="_blank" variant="outline-secondary">Github</Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
