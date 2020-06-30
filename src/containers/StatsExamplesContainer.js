import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StatsExamples from './../routes/stats/StatsExamples';

import { getSpaceXLaunches, getWeatherData } from './../actions/statsActions';

const StatsExamplesContainer = () => {

  return (
    <StatsExamples
      onGetLaunches={ getSpaceXLaunches }
      onGetWeather={ getWeatherData }
    />
  );
}

StatsExamples.propTypes = {
  onGetLaunches : PropTypes.func.isRequired,
  onGetWeather : PropTypes.func.isRequired,
}

export default StatsExamplesContainer;