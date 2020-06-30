import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import WeatherLineExample from './WeatherLineExample';
import SpaceXBarExample from './SpaceXBarExample';
// import HorizontalBarExample from './HorizontalBarExample';

function StatsExamples (props) {
  return (
    <>	
      <Container className="py-5">
        <WeatherLineExample
          onGetWeather={ props.onGetWeather }
        />
      </Container>
      
      <Container className="py-5">
        <SpaceXBarExample
          onGetLaunches={ props.onGetLaunches }
        />
      </Container>      
    </>
  );
}

StatsExamples.propTypes = {
  onGetLaunches : PropTypes.func.isRequired,
  onGetWeather : PropTypes.func.isRequired,
}

export default StatsExamples;
