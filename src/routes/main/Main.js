import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import sampleIcon from '../../images/sample-icon.png';

import logoReact from '../../images/vendors/react.png';
import logoRedux from '../../images/vendors/redux.png';
import logoNode from '../../images/vendors/nodejs.png';
import logoMaria from '../../images/vendors/mariadb.png';

function Main() {
  return (
	<>	
	  <section>
		  <Container className="py-5">
			<Row className="py-1 py-md-5 align-items-center">
			  <Col md={{ span : 6, }} className="text-md-right">
				<img 
					className="w-50 mr-md-5"
					src={ sampleIcon }
					alt="Example"
				/>
				<h1>Демонстрационный</h1>
				<h1>проект</h1>
			  </Col>
			  <Col md={{ span : 5, offset : 1, }} className="text-dark text-justify">
				<p>Данный проект был создан с целью демонстрации навыков по использованию 
				  инструментов web-разработки.</p>
				<p>Проект содержит несколько примеров, демонстрирующих решение ряда распространенных
					задач, часто встречающихся в современных веб-приложениях.</p>
			  </Col>
			</Row>
		  </Container>
	  </section>
	  
	  <section className="bg-light">
		  <Container className="py-5">
			<Row className="py-1 py-md-5">
			  <Col>
				<h1>Структура проекта</h1>
			  </Col>
			</Row>
			<Row className="pb-5">
				<Col lg={{ span : 8, offset : 2, }} className="text-justify">
					<p>Проект состоит из back-end на NodeJS и front-end на React созданного 
						при помощи create-react-app. Обмен данными между клиентом и сервером 
						осуществляется путём отправки клиентом AJAX-запросов к API сервера.</p>
					<p>Front-end построен с использованием библиотки react-bootstrap и адаптирован 
						для использования на устройствах с различными размерами экранов. Для управления
						данными, которые могут быть использованы в разных частях приложения, 
						используется redux.</p>
					<p>Сервер построен с использованием библиотеки express. Для хранения данных 
						используется БД MariaDb, также в качестве источников данных используются 
						некоторые сторонние API.</p>
				</Col>
			</Row>
		  </Container>
	  </section>
	  
	  <section>
		  <Container className="py-5">
			<Row className="py-1 py-md-5 align-items-center">
			  <Col md={{ span : 6, }} className="text-md-right">
				<h1>Окружение</h1>
			  </Col>
			  <Col md={{ span : 5, offset : 1, }} className="text-justify">
				<p>В качестве платформы выступает виртуальный выделенный сервере, с 
				  установленной на нём операцонной системой Linux CentOS 7.</p>
				<p>Для обработки HTTP-запросов на сервере установлен Nginx, а для шифрования 
				  соединения используются сертификаты Let's Encrypt, установленные при помощи 
				  утилиты certbot-auto.</p>
				<p>Для защиты сети на сервере была выполнена настройка файервола iptables</p>
			  </Col>
			</Row>
		  </Container>
	  </section>
	  
	  <section className="bg-light">
		  <Container className="py-5">
			<Row className="py-1 py-md-5">
			  <Col>
				<h1>Технологии</h1>
			  </Col>
			</Row>
			<Row className="pb-5">
				<Col xs="6" md="3">
					<img
						className="w-100"
						src={ logoReact }
						alt="React"
					/>
					<h4>React</h4>
				</Col>
				<Col xs="6" md="3">
					<img
						className="w-100"
						src={ logoRedux }
						alt="Redux"
						/>
					<h4>Redux</h4>
				</Col>
				<Col xs="6" md="3">
					<img
						className="w-100"
						src={ logoNode }
						alt="NodeJS"
					/>
					<h4>NodeJS</h4>
				</Col>
				<Col xs="6" md="3">
					<img
						className="w-100"
						src={ logoMaria }
						alt="MariaDB"
					/>
					<h4>MariaDB</h4>
				</Col>
			</Row>
		  </Container>
	  </section>
	  
	  <section>
		  <Container className="py-5">
			<Row className="py-1 py-md-5 align-items-center">
			  <Col md={{ span : 6, }} className="text-md-right">
				<h1>Разделы проекта</h1>
			  </Col>
			  <Col md={{ span : 5, offset : 1, }} className="text-justify">
				<p>
					<Link onClick={() => window.scrollTo(0,0)} to="/auth">Форма авторизации</Link> - 
           позволяет создать учётную запись, используя номер телефона или адрес электронной почты.
				</p>
				<p>
					<Link onClick={() => window.scrollTo(0,0)} to="/maps">Карта на Leaflet</Link> - интерактивная электронная карта с 
					  использованием библиотеки Leaflet и нескольких различных подложек. Позволяет 
					  наносить точки, линии и полигоны с помощью мыши.
				</p>
				<p>
					<Link onClick={() => window.scrollTo(0,0)} to="/stats">Статистики</Link> - Набор графиков и диаграм, строящихся на основе 
					  данных, получаемых из открытых API.
				</p>
			  </Col>
			</Row>
		  </Container>
	  </section>
	</>
  );
}

export default Main;
