import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AuthFormContainer from './../../containers/AuthFormContainer';

const Auth = () => {
  return (
    <>
      <section>
        <Container>
          <Row className="py-5 align-items-center">
            <Col md={4} className="text-md-right">
              <h1>Авторизация</h1>
            </Col>
            <Col md={{ span : 7, offset : 1, }} className="text-justify">
              <p>С помощью данной формы Вы можете войти или зарегистрироваться в проекте по номеру 
                телефона или адресу электроной почты.</p>
              <p>При регистрации номер телефона или e-mali необходимо подтвердить. Для подтверждения 
                номера телефона необходимо будет ввести код подтверждения, который будет отправлен 
                по смс. Для подтверждения e-mail нужно будет перейти по ссылке в письме, отправленном 
                на указанную электронную почту.</p>
              <p>Персональные данные, указываемые в процессе регистрации, хранятся 72 часа после 
                регистрации и никак не используются.</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      <AuthFormContainer />
    </>
  );
}

export default Auth;
