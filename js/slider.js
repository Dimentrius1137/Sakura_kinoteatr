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


  
const slides__url = "https://api.kinopoisk.dev/v1.4/movie/random?typeNumber=4";
async function GetData()
{
  _none_poster = "interface_items/none_pic.png"
    try{
        const data = await fetch(slides__url, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
        if (data.status == 403)
             {
                 throw "Ошибка"
             }
        const films = await data.json();
        slide_img.src = films.poster.url || films.poster.previewUrl;
        if(films.poster.url == null && films.poster.previewUrl == null)
        {
            slide_img.src = _none_poster;
        }
        slide_title.innerHTML = films.name;
    }
    catch (er){
        console.log(er);
        slide_img.src = _none_poster;
        slide_title.innerHTML = "Тут название";
    }
  }
  // GetData()