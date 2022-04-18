import config from '../config.js';
import { Carousel, CarouselItem } from './components/carousel.js';
import { Menu, MenuItem } from './components/menu.js';

const menu = new Menu();
for (let i = 0, len = config.menu.length; i < len; ++i) {
  const menuItem = new MenuItem(config.menu[i]);
  menu.append(menuItem);
}
document.getElementById('mainNavigation').append(menu);

const carousel = new Carousel();
for (let i = 0, len = config.banner.length; i < len; ++i) {
  const carouselItem = new CarouselItem();
  const image = document.createElement('img');
  image.src = config.banner[i].image;
  carouselItem.append(image);
  carousel.append(carouselItem);
}
document.getElementById('banner').append(carousel);
