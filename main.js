let _none_poster = "interface_items/none_pic.png"
const catalog = document.querySelector('.catalog');
const moreBtn = document.querySelector('.more');
const navbar = document.querySelector('.navbar');
const navbarBtn = document.querySelector('.open_close_navbar');
const navbarCont = document.querySelector('.navbar-cont');
const arrow = document.querySelector('.top-arrow');
const dropMenu = document.querySelector('.list-hide');
const list_btn = document.querySelector('.display_mode');
const search_list = document.querySelector('.search_drop_list');
const search_field = document.querySelector('input');
const state_btn = document.querySelector('.button_state');
const h_elements = document.querySelector('.header_elements');

state_btn.addEventListener('click', (el) => {
    el.target.classList.toggle('open');
    h_elements.classList.toggle('open');
    // Сделать меню анимированным, покрасивше и стики
})

list_btn.addEventListener('click', () => {
    catalog.classList.toggle('catalog-list');
    catalog.classList.toggle('catalog');

    catalog.querySelectorAll('#newCard').forEach((el) => {
        el.classList.toggle(('card'));
        el.classList.toggle(('list_mode'));  
        if(el.classList.contains('list_mode'))
        {
            list_btn.src = "interface_items/grid.png"
            el.children[2].style.display = "block"
        }  
        else{
            list_btn.src = "interface_items/list.png"
            el.children[2].style.display = "none"
        }
})
    
})

//поиск
search_field.addEventListener('input', (field) => {
    
    search_list.style.display = "block";
    if(field.target.value == "")
    {
        search_list.style.display = "none";
    }
})

// async function findTtitles(value){
    
//     const search_url = `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=1&query=${value}`;
    
//     const data = await fetch(url, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
//     const films = await data.json();
    
//     const titles = [];
// }


//сделать через потомков динамического слайда
const slides = document.querySelectorAll('.swiper-slide');

const slide_img = document.querySelector('.dynamic_img');
const slide_title = document.querySelector('.title');

function Hide_DropMenu()
{
    dropMenu.classList.toggle("list");
    arrow.classList.toggle("top-arrow-up");
}




function CreateCards()
{    
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.id = "newCard";
    const newName = document.createElement('a');
    newName.classList.add('name_of_title');
    const newPoster = document.createElement('img');
    newPoster.classList.add('poster');
    const newDesc = document.createElement('div');
    newDesc.classList.add('desc');
    newCard.append(newPoster, newName, newDesc);
    catalog.appendChild(newCard);

}
let loadSpinner = document.createElement('div');
let spinner = document.createElement('div');
function Loading()
{

    loadSpinner.classList.add("loading");
    catalog.appendChild(loadSpinner);
    spinner.classList.add("spinner");
    loadSpinner.appendChild(spinner);
}

//будет задаваться функцией состояния окна в зависиости от разрешения
let itemsCount = 6;
let iterator = 0;
if(window.innerWidth > 1600)
{
    itemsCount = 8;
}
Loading()
document.addEventListener('DOMContentLoaded', function()
{

    for(let i = 0; i < itemsCount; i++)
    {
        CreateCards();
    }

    GetData();
    
})

let rows = 2;
function AddCards()
{
	iterator+= itemsCount;
    loadSpinner = document.createElement('div');
    
    Loading()
    if(window.innerWidth >= 1280 && document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 150)
    {
        rows+= 2;
        console.log(rows)
        catalog.style.gridTemplateRows = `repeat(${rows}, 400px)`
       for(let i = 0; i < itemsCount; i++)
        {
            CreateCards();
        }

        GetData();
    } 

    //Костыльная хуета
    else if(window.innerWidth < 1280 && document.documentElement.getBoundingClientRect().bottom > document.documentElement.clientHeight - 200)
    {
        
        rows+= 2;
        console.log(rows)
        catalog.style.gridTemplateRows = `repeat(${rows}, 160px)`
       for(let i = 0; i < itemsCount; i++)
        {
            CreateCards();
        }

        GetData();
    }
}


//навбар
function NavbarState()
{
    navbarCont.classList.toggle('navbar-cont-on');
}
navbarBtn.addEventListener('click', NavbarState)

function NavScroll()
{
    navbar.classList.add("if_page_scroll")
    if(window.scrollY == 0)
    {
        navbar.classList.remove("if_page_scroll")
    }
}
document.addEventListener('scroll', NavScroll)

//получение данных

const url = "https://api.kinopoisk.dev/v1.4/movie/random?typeNumber=4";
async function GetData()
{
    
    const card = document.querySelectorAll('.card');
    try{
        const data = await fetch(url, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
        const films = await data.json();
        console.log(films);
        //ТУТ
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
    
    for(let i = iterator; i < card.length; i++)
    {

        try
        {

            const data = await fetch(url, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
            const films = await data.json();
            console.log(films);

            card[i].children[0].src = films.poster.url || films.poster.previewUrl;
            if(films.poster.url == null && films.poster.previewUrl == null)
            {
                card[i].children[0].src = _none_poster;
            }

            if(films.name != null)
            {
                card[i].children[1].innerHTML = films.name;
				card[i].children[1].href = `page.html?name=${films.name}`;
            }
            else{
                card[i].children[1].innerHTML = films.alternativeName;
				card[i].children[1].href = `page.html?name=${films.alternativeName}`;
            }
            card[i].children[2].innerHTML = films.description;
        }
        catch(er){
            card[i].children[0].src = _none_poster;
            card[i].children[1].innerHTML = "none";
            card[i].children[1].href = 'page.html?error';
            card[i].children[2].innerHTML = "Тут описание";
            console.log(`error: ${er}`)
        }
    }
    loadSpinner.remove();
    
}


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