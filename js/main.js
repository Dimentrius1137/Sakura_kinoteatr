let _none_poster = "interface_items/none_pic.png"
const catalog = document.querySelector('#cat');
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
const menu_content = document.querySelector('.menu_content');

state_btn.addEventListener('click', (el) => {
    el.target.classList.toggle('open');
    menu_content.style.display = "flex";
    if(!el.target.classList.contains('open'))
    {
        menu_content.style.display = "none";
    }

    // Сделать меню анимированным, покрасивше и стики
})
let cardClass = 'card';
list_btn.addEventListener('click', () => {
    catalog.classList.toggle('catalog-list');
    catalog.classList.toggle('catalog');
    if(catalog.classList.contains('catalog-list'))
    {
        cardClass = 'list_mode';
    }
    else{
        cardClass = 'card'
    }
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
//конструктором
// function CreateCards1(newname, newposter, newdesc)
// {
//     const newCard = document.createElement('div');
//     newCard.classList.add(cardClass);
//     newCard.id = "newCard";

//     this.newname = newname;
//     this.newposter = newposter;
//     this.newdesc = newdesc;

//     newCard.innerHTML = `<img class='poster' href=${newposter}>
//                         <a class='name_of_title' href="page.html?name=${newname}">${newname}</a>
//                         <div class='desc'></div>`;
//     return newCard;
// }   

function CreateCards()
{    
    const newCard = document.createElement('div');
    newCard.classList.add(cardClass);
    newCard.id = "newCard";
    const newName = document.createElement('a');
    newName.classList.add('name_of_title');
    const newPoster = document.createElement('img');
    newPoster.classList.add('poster');
    const newDesc = document.createElement('div');
    newDesc.classList.add('desc');
    if(catalog.classList.contains('catalog-list'))
    {
        newDesc.style.display = "block";
    }

    newCard.append(newPoster, newName, newDesc);
    catalog.appendChild(newCard);
   

}
//поиск
search_field.addEventListener('input', (field) => {
    
    search_list.style.display = "block";
    if(field.target.value == "")
    {
        search_list.style.display = "none";
    }
})




//сделать через потомков динамического слайда
const slides = document.querySelectorAll('.swiper-slide');

const slide_img = document.querySelector('.dynamic_img');
const slide_title = document.querySelector('.title');

function Hide_DropMenu()
{
    dropMenu.classList.toggle("list");
    arrow.classList.toggle("top-arrow-up");
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
        CreateCards()
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
        // console.log(rows)
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
        // console.log(rows)
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