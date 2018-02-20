/**
 * Contains async actions relating to Clarifai API.
*/

import {
  PREDICT_IMAGE
} from './constants';
import clarifai from 'clarifai';

const app = new clarifai.App({
 apiKey: 'YOUR_API_KEY'
});

export const receivePrediction = (concepts) => ({
  type: PREDICT_IMAGE,
  payload: concepts
});

export const predictImage = (url) => dispatch => {
  app.models.predict(clarifai.GENERAL_MODEL, url).then(
    function(response) {
      let concepts = response.outputs[0].data.concepts;
      dispatch(receivePrediction(concepts));
    },
    function(err) {
      console.error(err);
    }
  );
};
