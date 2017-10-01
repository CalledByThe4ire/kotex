
import utils from '../../scripts/utils';
import Flickity from 'flickity';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // media queries
  const mqlMobile = window.matchMedia(`only screen and (max-width: 767px)`);
  const mqlDesktop = window.matchMedia(`only screen and (min-width: 768px)`);

  // sliders
  const parentSlider = document.querySelector(`[data-js='slider--parent']`);
  const childSlidersCollection = utils.$$(`[data-js='slider--child']`);

  // slides
  const slidesCollection = utils.$$(`[data-js='slider--child'] [data-js='slide']`);
  const slidesWrappersCollection = utils.$$(`.slider__wrapper`);

  // Flickity' instances
  const parentFlkty = {
    cellSelector: `.slider__cell--parent`,
    prevNextButtons: true,
    pageDots: false,
    wrapAround: true
  };

  const childFlktyForMobile = {
    cellSelector: `.slider__cell--child`,
    prevNextButtons: true,
    pageDots: false,
    groupCells: 3,
    wrapAround: true
  };

  const childFlktyForDesktop = {
    cellSelector: `.slider__cell--child`,
    prevNextButtons: false,
    pageDots: true,
    wrapAround: true
  };

  let flkty = [];

  // Enable sliders by default
  /*eslint-disable */
  new Flickity(parentSlider, parentFlkty);
  /*eslint-enable */

  childSlidersCollection.forEach((slider, index) => {
    flkty[index] = new Flickity(slider, childFlktyForMobile);
  });

  /**
   * Conditionally assign inner slider' properties
   */
  const transformInnerSlider = () => {
    childSlidersCollection.forEach((slider, index) => {
      if (mqlMobile.matches) {
        flkty[index].destroy();
        flkty[index] = new Flickity(slider, childFlktyForMobile);
      }
      if (mqlDesktop.matches) {
        if (flkty[index]) {
          flkty[index].destroy();
          flkty[index] = new Flickity(slider, childFlktyForDesktop);
        }
      }
    });
  };

  /**
 * Conditionally change inner slider' cell
 */
  const changeSliderCell = () => {
    // slides
    slidesCollection.forEach((slide) => {
      if (mqlMobile.matches) {
        if (!slide.classList.contains(`slider__cell`)) {
          slide.classList.add(`slider__cell`, `slider__cell--child`);
        }
      }
      if (mqlDesktop.matches) {
        if (slide.classList.contains(`slider__cell`)) {
          slide.classList.remove(`slider__cell`, `slider__cell--child`);
        }
      }
    });

    // wrappers
    slidesWrappersCollection.forEach((wrapper) => {
      if (mqlMobile.matches) {
        if (wrapper.classList.contains(`slider__cell`)) {
          wrapper.classList.remove(`slider__cell`, `slider__cell--child`);
        }
      }
      if (mqlDesktop.matches) {
        if (!wrapper.classList.contains(`slider__cell`)) {
          wrapper.classList.add(`slider__cell`, `slider__cell--child`);
        }
      }
    });
  };

  /**
  * Control sliders' behaviour for different viewports
  */
  const matchMedia = () => {
    transformInnerSlider();
    changeSliderCell();
  };

  matchMedia();

  window.addEventListener(`resize`, () => {
    matchMedia();
  });
});
