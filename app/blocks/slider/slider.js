import Swiper from 'swiper';

export default window.addEventListener(`DOMContentLoaded`, () => {
  // sliders
  const parentSlider = document.querySelector(`[data-js='slider--parent']`);

  // Enable sliders by default
  /*eslint-disable */
  const swiper = new Swiper(parentSlider);
  /*eslint-enable */
});
