import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function ConfirmHandler(props) {

  const [ loading, setLoading ] = useState(true);
  const [ confirmSuccess, setConfirmSuccess ] = useState(false);
  const [ confirmError, setConfirmError ] = useState('');
  const [ action, setAction ] = useState('');

  const tryConfirm = () => {
    const query = {};
    
    // получение параметров из адресной строки и их проверка
    try {
      let params = window.location.search;
      if (!params) document.location.href = '/';

      params = params.substr(1).split('&');
      if (params.length !== 3) document.location.href = '/';

      params.forEach(param => {
        param = param.split('=');
        query[param[0]] = param[1];
      });
      if (!query.action || !query.key || !query.code) document.location.href = '/';
    }
    catch (error) {
      document.location.href = '/';
    }

    props.onTryConfirm(
      query.action, 
      'mail', 
      query.key, 
      query.code,
      error => {
        setConfirmError(error);
        setLoading(false);
      },
      () => {    // onSuccess
        setAction(query.action);
        setConfirmSuccess(true);
        setLoading(false);
      },
    );
  }

  useEffect(() => {
    tryConfirm();
  }, []);   // eslint-disable-line

  return (
	  <section>
      <Container>
        
        <Row style={{ height : '90vh', }} className="align-items-center">
          <Col>
            {
              loading
              ?
              <div className="alert alert-info">
                <p className="my-3">Загрузка</p>
              </div>
              :
              <>
                {
                  confirmSuccess
                  &&
                  <>
                    {
                      action === 'register'
                      ?
                      <>
                        <h1>Адрес успешно подтвержден</h1>
                        <p className="pt-5">Ваш адрес электронной почты успешно подтвержден.</p>
                        <p className="pb-5">Теперь Вы можете войти на сайт, используя логин и пароль, указанные при регистрации.</p>
                      </>
                      :
                      <>
                        <h1>Доступ успешно восстановлен</h1>
                        <p className="pt-5">Доступ успешно восстановлен, Вы авторизованы!</p>
                        <p className="pb-5">Для смены пароля используйте кнопку "Изменить пароль" в форме авторизации.</p>
                      </>
                    }
                  </>
                }
                {
                  confirmError
                  &&
                  <>
                    <h1>Ошибка при подтверждении</h1>
                    <p className="pt-5 text-danger">{ confirmError }</p>
                    <p className="pb-5">Попробуйте повторить процедуру восстановления</p>
                  </>
                }
                <Button variant="outline-info" href="/auth">Перейти к форме авторизации</Button>
              </>
            }
          </Col>
        </Row>
        
      </Container>
	  </section>
  );
}

export default ConfirmHandler;
