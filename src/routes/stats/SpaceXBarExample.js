import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

class SpaceXBarExample extends React.Component {

  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    const years = [];
    for (let y = year; y >= 2000; y--) {
      years.push(y);
    }
    this.state = {
      dataset: {
        label: 'Количество запусков',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },
      labels: [],
      values: [],
      year,
      years,
    };
  }

  componentDidMount () {
    this.getData();
  }
  
  getData () {
    this.props.onGetLaunches(
      this.state.year,
      error => {
        console.log(error);
      },
      data => {
        this.setState({ labels : data.months, values : data.launches, });
      }
    );
  }

  onYearSelectChange (e) {
    const year = e.target.value;
    this.setState({ year, }, () => {
      this.getData();
    });
  }
  
  render () {
    
    const { labels, dataset, values } = this.state;
    
    dataset.data = values;
    
    const barData = {
      labels,
      datasets : [ dataset, ],
    };
    
    return (
      <div>
        <h2>Запуски спутников SpaceX по месяцам</h2>
        <p>По данным API <a href="https://docs.spacexdata.com/?version=latest">https://docs.spacexdata.com/</a></p>

        <Container>
          <Row className="py-3 align-items-center">
            <Col xs={ 6 } md={{ span : 3, offset : 3, }} className="text-right">
              Выберите год
            </Col>
            <Col xs={ 6 } md={{ span : 3, }}>
              <Form.Control 
                as="select"
                value={ this.state.year }
                onChange={ e => this.onYearSelectChange(e) }
              >
                {
                  this.state.years.map(y => {
                    return <option key={ y } value={ y }>{ y }</option>;
                  })
                }
              </Form.Control>
            </Col>
          </Row>
        </Container>

        <Bar
          data={ barData }
          width={100}
          // height={100}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

SpaceXBarExample.propTypes = {
  onGetLaunches : PropTypes.func.isRequired,
}

export default SpaceXBarExample;