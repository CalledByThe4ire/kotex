import $ from 'jquery';
import 'slick-carousel';

export default window.addEventListener(`DOMContentLoaded`, () => {
  $(`[data-js='slider--parent']`).slick();
});
