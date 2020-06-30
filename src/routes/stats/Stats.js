import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import StatsExamplesContainer from './../../containers/StatsExamplesContainer';

// import DescriptionModal from '../../components/DescriptionModal';

function Stats() {
  
  return (
    <>	
      <section>
        <Container>
          <Row className="py-5 align-items-center">
            <Col md={ 4 } className="text-md-right">
              <h1>Статистики</h1>
            </Col>
            <Col md={{ span : 7, offset : 1, }} className="text-justify">
              <p>На этой странице приведены примеры отображения графиков и диаграмм, построенных 
                с использованием библиотеки react-chartjs-2.</p>
              <p>Данные для приведенных статистик получаются с помощью API из открытых источников, 
                также для каждого графика можно генерировать случайные данные для отображения.</p>
              <p>Для получения данных по API используется сервер на NodeJS, получающий от 
                front-end запрос на получение данных, и отправляющий запрос к API.</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section>
        <StatsExamplesContainer />
      </section>
    </>
  );
}

export default Stats;

//<DescriptionModal
//  buttonTitle="Подробное описание"
//  modalTitle="Описание раздела «Статистики»"
//  modalText="modal text"
///>