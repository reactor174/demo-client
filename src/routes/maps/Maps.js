import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MapsEditor from './MapsEditor';

function Maps() {
  return (
    <>	
      <section>
        <Container>
          <Row className="pt-5 align-items-center">
            <Col md={4} className="text-md-right">
              <h1>Картография</h1>
            </Col>
            <Col md={{ span : 7, offset : 1, }} className="text-justify">
              <p>На этой странице предоставлена демонстрационная интерактивная карта, разработанная с 
                использованием библиотеке react-leaflet.</p>
              <p>Данная карта позволяет нанесение на неё элементов разметки, таких как точки, линии и 
                полигоны. Ранее нанесенные на карту могут быть отредактированы или удалены.</p>
              <p>Элементы, нанесенные пользователем на карту, сохраняются на сервере, в привязке 
                к идентификатору текущей сессии пользователя. Через сутки, после завершения 
                пользовательской сессии все данные автоматически удаляются.</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section>
        <Container>
          <Row className="py-5">
            <Col md={ 12 }>
              <MapsEditor  />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Maps;
