const slides = document.querySelectorAll('.swiper-slide');
const slide_img = document.querySelector('.dynamic_img');
const slide_title = document.querySelector('.title');
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    
    pagination: {
        el: '.swiper-pagination',
      },
      slidesPerView: 1.5,
      centeredSlides: true


  });
  swiper.on('slideChange', function () {
    slides.forEach((slide) => {
        slide.style.transition = ".2s linear"
    })
  });