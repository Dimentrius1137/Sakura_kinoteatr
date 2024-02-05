let _none_poster = "interface items/none_pic.png"
const catalog = document.querySelector('.catalog');
const moreBtn = document.querySelector('.more');
const navbar = document.querySelector('.navbar');
const navbarBtn = document.querySelector('.open_close_navbar');
const navbarCont = document.querySelector('.navbar-cont');
const arrow = document.querySelector('.top-arrow');
const dropMenu = document.querySelector('.list-hide');

//сделать через потомков динамического слайда
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
    const newPoster = document.createElement('img');
    newPoster.classList.add('poster');
    const newName = document.createElement('p');
    newCard.append(newPoster, newName);
    catalog.appendChild(newCard);

}

//будет задаваться функцией состояния окна в зависиости от разрешения
let itemsCount = 6;
if(window.innerWidth > 1600)
{
    itemsCount = 8;
}
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
    
    if(window.innerWidth >= 1280 && document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 150)
    {
        rows+= 2;
        console.log(rows)
        catalog.style.gridTemplateRows = `repeat(${rows}, 400px)`
       for(let i = 0; i < itemsCount; i++)
        {
            CreateCards();
        }

        // GetData();
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

        // GetData();
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

const url = "https://api.kinopoisk.dev/v1.4/movie/random?typeNumber=4&year=2014";
async function GetData()
{
    const card = document.querySelectorAll('.card');
    try{
        const data = await fetch(url, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
        const films = await data.json();
        slide_img.src = films.poster.url;
        slide_title.innerHTML = films.name;
    }
    catch{
        slide_img.src = _none_poster;
        slide_title.innerHTML = "Тут название";
    }
    
    for(let i = 0; i < card.length; i++)
    {

        try
        {
            const data = await fetch(url, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
            const films = await data.json();
            console.log(films);
            if(films.poster.url != null)
            {
                card[i].children[0].src = films.poster.url;
                
            }
            else{
                card[i].children[0].src = _none_poster;
                slide_img.src = _none_poster;
            }
            if(films.name != null)
            {
                card[i].children[1].innerHTML = films.name;
            }
            else{
                card[i].children[1].innerHTML = films.alternativeName;
            }

        }
        catch(er){
            card[i].children[0].src = _none_poster;
            card[i].children[1].innerHTML = "none";
            console.log(`error: ${er}`)
        }
    }
    
}

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  

  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    pagination: {
        el: '.swiper-pagination',
      },
  });
