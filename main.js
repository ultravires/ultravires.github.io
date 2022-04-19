import config from '../config.js';
import { Carousel, CarouselItem } from './components/carousel.js';
import { Menu, MenuItem } from './components/menu.js';
import { Post } from './components/post.js';
import './libs/markdown-it.min.js';

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

async function getPosts(category) {
  return fetch(`https://api.github.com/repos/Honye/notes/contents/${category}`, {
    method: 'GET'
  }).then((res) => {
    return res.json();
  });
}
getPosts('Android').then((res) => {
  for (let i = 0, len = res.length; i < len; ++i) {
    const post = new Post(res[i]);
    document.getElementById('posts').append(post);
    post.addEventListener('click', () => {
      window.open(res[i].html_url);
    });
  }
});

async function getMarkdown(URL) {
  return fetch(URL, {
    method: 'GET'
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      const markdown = markdownit();
      const result = markdown.render(res);
      return result;
    });
}
getMarkdown(
  'https://raw.githubusercontent.com/Honye/notes/vuepress/Android/Android%20%E5%AD%A6%E4%B9%A0%E8%B5%84%E6%BA%90.md'
).then((html) => {
  console.log(html);
});
