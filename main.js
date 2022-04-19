import config from '../config.js';
import { Carousel, CarouselItem } from './components/carousel.js';
import { Menu, MenuItem } from './components/menu.js';
import { Post } from './components/post.js';

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
  image.loading = 'eager';
  image.src = config.banner[i].image;
  carouselItem.append(image);
  carousel.append(carouselItem);
}
document.getElementById('banner').append(carousel);

async function getPosts(category) {
  return fetch(
    `https://api.github.com/repos/${config.github.user}/${config.github.user}.github.io/contents/${category}`,
    {
      method: 'GET'
    }
  ).then((res) => {
    return res.json();
  });
}
getPosts('articles').then((res) => {
  for (let i = 0, len = res.length; i < len; ++i) {
    const post = new Post(res[i]);
    document.getElementById('posts').append(post);
    post.addEventListener('click', () => {
      window.open(`/article?download_url=${encodeURIComponent(res[i].download_url)}`);
    });
  }
});
