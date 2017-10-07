import utils from '../../scripts/utils';
import $ from 'jquery';
import 'slick-carousel';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 767px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 768px)`);

  // sliders
  const parentSlider = document.querySelector(`[data-js='slider--parent']`);
  const childSlidersCollection = utils.$$(`[data-js='slider--child']`);

  // Slick' instances
  const parentSlick = {
    infinite: true,
    arrows: true
  };

  const childSlickForMobile = {
    infinite: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const childSlickForTabDesk = {
    infinite: true,
    arrows: false,
    dots: true,
    rows: 2,
    slidesPerRow: 3
  };

  // Enable parent (outer) slider
  $(parentSlider).slick(parentSlick);

  // Enable child (inners) sliders
  childSlidersCollection.forEach(slider => {
    $(slider).slick(childSlickForMobile);
  });

  /**
  * Enable / disable inner slider for different viewports
  */
  const matchMedia = () => {
    childSlidersCollection.forEach(slider => {
      if (mqlMobile.matches) {
        $(slider).slick(`unslick`);
        $(slider).slick(childSlickForMobile);
      }
      if (mqlDesktop.matches) {
        $(slider).slick(`unslick`);
        $(slider).slick(childSlickForTabDesk);
      }
    });
  };

  matchMedia();

  window.addEventListener(`resize`, () => {
    matchMedia();
  });

});
