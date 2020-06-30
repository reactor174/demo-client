import axios from 'axios';

export const getSpaceXLaunches = (year, onError, onSuccess) => {
  axios.post('/api/stat/space', { year })
    .then(result => {
      if (result.data.status === 'ok') {
        onSuccess(result.data.data);
      }
      else {
        onError(result.data.message);
      }        
    })
    .catch (error => {
      onError(error);
    });
}

export const getWeatherData = (date, onError, onSuccess) => {
  axios.post('/api/stat/weather', { date })
    .then(result => {
      if (result.data.status === 'ok') {
        onSuccess(result.data.data);
      }
      else {
        onError(result.data.message);
      }        
    })
    .catch (error => {
      onError(error);
    });
}