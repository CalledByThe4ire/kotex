
import utils from '../../scripts/utils';
import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  // const mqlMobile = window.matchMedia(`only screen and (max-width: 767px)`);
  // const mqlDesktop = window.matchMedia(`only screen and (min-width: 768px)`);

  // carousel
  const slidersCollection = utils.$$(`[data-js='slider']`);

  // Flickity' instances
  const parentFlickity = {
    cellSelector: `.slide--parent.slider__slide`,
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true
  };

  // const childFlickity = {
  //   cellSelector: `.slider__slide`,
  //   prevNextButtons: false,
  //   wrapAround: true
  // };

  slidersCollection.forEach(slider => {
    if (slider.classList.contains(`slider--parent`)) {
      /*eslint-disable */
      new Flickity(`.slider--parent`, parentFlickity);
      /*eslint-enable */
    }
  });
});

