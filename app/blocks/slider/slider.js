import utils from '../../scripts/utils';
import $ from 'jquery';
import 'slick-carousel';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // sliders
  const parentSlider = document.querySelector(`[data-js='slider--parent']`);
  // const childSlidersCollection = utils.$$(`[data-js='slider'].slider--child`);

  // Slick' instances
  const parentSlick = {
    arrows: true
  };

  $(parentSlider).slick(parentSlick);
});
