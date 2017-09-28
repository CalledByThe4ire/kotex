
import utils from '../../scripts/utils';
import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 767px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 768px)`);

  // sliders
  const parentSlider = document.querySelector(`[data-js='slider'].slider--parent`);
  const childSlidersCollection = utils.$$(`[data-js='slider'].slider--child`);

  // Flickity' instances
  const parentFlkty = {
    cellSelector: `.slide--parent`,
    prevNextButtons: true,
    pageDots: false,
    wrapAround: true
  };

  const childFlkty = {
    cellSelector: `.slide--child`,
    prevNextButtons: true,
    pageDots: false,
    groupCells: 3,
    wrapAround: true
  };

  let flkty = [];

  /*eslint-disable */
  new Flickity(parentSlider, parentFlkty);
  /*eslint-enable */

  /**
  * Enable / disable inner slider for different viewports
  */
  const matchMedia = () => {
    childSlidersCollection.forEach((slider, index) => {
      if (mqlMobile.matches) {
        flkty[index] = new Flickity(slider, childFlkty);
      }
      if (mqlDesktop.matches) {
        if (flkty[index]) {
          flkty[index].destroy();
        }
      }
    });
  };

  matchMedia();

  window.addEventListener(`resize`, () => {
    matchMedia();
  });
});
