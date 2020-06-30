import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';

class WeatherLineExample extends React.Component {
  constructor(props) {
    super(props);

    const cur = new Date();
    const min = new Date(cur.getTime() - (60 * 60 * 24 * 5 * 1000));
    const date = cur.toLocaleDateString().split('.').reverse().join('-');
    const minDate = min.toLocaleDateString().split('.').reverse().join('-');
    const maxDate = date;

    const labels = [];
    const values = [];
    for (let i = 7; i <= 23; i++) {
      labels.push(i + ":00");
      values.push(0);
    }

    this.state = {
      dataset: {
        label: 'Температура',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
      labels,
      values,
      date,
      maxDate,
      minDate,
    };
  }

  componentDidMount () {
    this.getData();
  }

  getData () {
    this.props.onGetWeather(
      this.state.date,
      error => {
        console.log(error);
      },
      data => {
        this.setState({ labels : data.hours, values : data.temps, });
      }
    );
  }

  onDateInputChange (e) {
    const date = e.target.value;
    this.setState({ date }, () => {
      this.getData();
    });
  }
  
  render () {
    
    const { labels, dataset, values } = this.state;
    
    dataset.data = values;
    
    const lineData = {
      labels,
      datasets : [ dataset, ],
    };
    
    return (
      <div>
        <h2>Температура в Москве по часам</h2>
        <p>По данным API <a href="https://openweathermap.org/">https://openweathermap.org</a></p>

        <Container>
          <Row className="py-3 align-items-center">
            <Col xs={ 6 } md={{ span : 3, offset : 3, }} className="text-right">
              Выберите день
            </Col>
            <Col xs={ 6 } md={{ span : 3, }}>
              <input
                type="date"
                value={ this.state.date }
                max={ this.state.maxDate }
                min={ this.state.minDate }
                onChange={ e => this.onDateInputChange(e) }
                />
            </Col>
          </Row>
        </Container>

        <Line data={ lineData } />
        
        <small>* Из-за ограничений API данные доступны только за последние 5 дней</small>
      </div>
    );  
  }
}

WeatherLineExample.propTypes = {
  onGetWeather : PropTypes.func.isRequired,
};

export default WeatherLineExample;