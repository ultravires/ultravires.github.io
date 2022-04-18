export class Carousel extends HTMLUListElement {
  constructor() {
    super();
    this.classList.add('gh-carousel');
  }
}
customElements.define('gh-carousel', Carousel, { extends: 'ul' });

export class CarouselItem extends HTMLLIElement {
  constructor() {
    super();
    this.classList.add('gh-carousel-item');
  }
}
customElements.define('gh-carousel-item', CarouselItem, { extends: 'li' });
