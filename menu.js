const search_list = document.querySelector('.search__list');
const search_field = document.querySelector('input');
const state_btn = document.querySelector('.button_state');
const menu = document.querySelector('.menu');
const arrow = document.querySelector('.top-arrow');
const dropMenu = document.querySelector('.list');
const startBtn = document.querySelector('.scroll-to-start');
const loup = document.querySelector('.loup');
const switch_menu = document.querySelector('.switch_menu');
const drop_menu = document.querySelector('.drop_menu')
search_field.addEventListener('input', (field) => {
    getData(`"${field.target.value}"`)

})


async function getData(name)
{
    try{
        const data1 = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=1&query=${name}`, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
        const list = await data1.json();
        console.log(list.docs[0].name)
    }
    catch{
        console.log("Нет совпадений")
    }

}

function Hide_DropMenu()
{
    dropMenu.classList.toggle("list");
    arrow.classList.toggle("top-arrow-up");
}

function ScrollToStart()
{
    window.scrollTo({top:0, behavior:"smooth"});
}


//поиск
search_field.addEventListener('input', (field) => {
    search_list.style.display = "block";
    if(field.target.value == "")
    {
        search_list.style.display = "none";
    }
})

function Open(...el)
{
    for(let i = 0; i < [...el].length; i++)
    {
        el[i].classList.toggle('open');
    }
}

switch_menu.addEventListener('click', () => {
    Open(switch_menu, drop_menu);
})
loup.addEventListener('click', () => {
    Open(search_field) 
})  




