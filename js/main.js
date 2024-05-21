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


const search__url = "https://api.kinopoisk.dev/v1.4/movie/search?&query";
search_field.addEventListener('input', async (field) => {
    search_list.style.display = "block";
    search_list.innerHTML = "";
    let item;
    let link;
        try {
            const element =
             await fetch(`${search__url}=${field.target.value}`, 
             {headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' }});
             if (element.status == 403)
             {
                 throw "Ошибка"
             }
            const text = await element.json();
            let titles = new Set();
            text.docs.forEach((currName) => {
                titles.add(currName.name);
            })
            for(title of titles)
            {
                item = document.createElement('li');
                link = document.createElement('a');
                link.innerHTML = title;
                link.href = `page.html?name=${title}`
                item.appendChild(link);
                search_list.appendChild(item);
            }


        } 
        catch (err) {
            console.error(err);
            item = document.createElement('li');
            item.innerHTML = "Ничего не найдено";
            search_list.appendChild(item);
        }
        
    

    if(field.target.value === "") {
        search_list.style.display = "none";
    }
});

function ScrollToStart()
{
    window.scrollTo({top:0, behavior:"smooth"});
}



//бургер меню
function Open()
{
    for(let i = 0; i < arguments.length; i++)
    {
        arguments[i].classList.toggle('open');
    }
}

switch_menu.addEventListener('click', () => {
    Open(switch_menu, drop_menu);
    document.querySelector('header').style.background = "rgba(0, 0, 0, 0.9)";
})
loup.addEventListener('click', () => {
    Open(search_field) 
})  




//режим списком
let _none_poster = "interface_items/none_pic.png"
const catalog = document.querySelector('#cat');
const moreBtn = document.querySelector('.more');
const menu_content = document.querySelector('.menu_content');
const list_btn = document.querySelector('.display_mode');

let cardClass = 'card';
list_btn.addEventListener('click', () => {
    catalog.classList.toggle('catalog-list-mode');
    catalog.classList.toggle('catalog');
    if(catalog.classList.contains('catalog-list-mode'))
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

//создание карточек
function CreateCards()
{    
    const newCard = document.createElement('div');
    newCard.classList.add(cardClass);
    newCard.id = "newCard";
    const newName = document.createElement('a');
    newName.classList.add('name_of_title');
    const posterContainer = document.createElement('div');
    posterContainer.classList.add('poster');
    const newPoster = document.createElement('img');
    posterContainer.appendChild(newPoster);
    const newDesc = document.createElement('div');
    newDesc.classList.add('desc');
    if(catalog.classList.contains('catalog-list-mode'))
    {
        newDesc.style.display = "block";
    }

    newCard.append(posterContainer, newName, newDesc);
    catalog.appendChild(newCard);
}



    //загрузка
    let loadSpinner = document.createElement('div');
    let spinner = document.createElement('div');
    function Loading()
    {
        leaf__fall.style.zIndex = "4";
        if(catalog.classList.contains('catalog-list-mode'))
        {
            loadSpinner.style.height = 1920 + 'px'
        }
        loadSpinner.classList.add("loading");
        catalog.appendChild(loadSpinner);
        spinner.classList.add("spinner");
        loadSpinner.appendChild(spinner);

    }

    //размер сетки
    let itemsCount = 6;
    let iterator = 0;
    if(window.innerWidth > 1600)
    {
        itemsCount = 8;
    }

    window.addEventListener('load', function()
    {
        Loading();
        for(let i = 0; i < itemsCount; i++)
        {
            CreateCards()
        }
        GetData();
        
    })
    
    let rows = 2;
    //добавление карточек
    function AddCards()
    {
    
    
        iterator+= itemsCount;
        loadSpinner = document.createElement('div');
        let cardHeight;
        Loading()
        if(window.innerWidth >= 1280)
        {
            cardHeight = 400
            rows+= 2;
            catalog.style.gridTemplateRows = `repeat(${rows}, ${cardHeight}px)`
        } 
        else if(window.innerWidth < 1280)
        {
            
            cardHeight = 160;
            rows+= 2;
            catalog.style.gridTemplateRows = `repeat(${rows}, ${cardHeight}px)`
        }
    

       for(let i = 0; i < itemsCount; i++)
        {
            CreateCards();
        }
        GetData();
    }


//получение данных
const url = "https://api.kinopoisk.dev/v1.4/movie/random?typeNumber=4";
async function GetData()
{
    const card = document.querySelectorAll(`.${cardClass}`);
    for(let i = iterator; i < card.length; i++)
    {
        try
        {
            const data = await fetch(url, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } });
            const films = await data.json();
            // console.log(films);

            card[i].children[0].children[0].src = films.poster.url || films.poster.previewUrl;
            if(films.poster.url == null && films.poster.previewUrl == null)
            {
                card[i].children[0].children[0].src = _none_poster;
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
            if (data.status == 403)
            {
                throw "Ошибка"
            }

        }
        catch(er){
            
            card[i].children[0].children[0].src = _none_poster;
            card[i].children[1].innerHTML = "none";
            card[i].children[1].href = 'page.html?error';
            card[i].children[2].innerHTML = "Каждый из нас понимает очевидную вещь: консультация с широким активом не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Следует отметить, что высокотехнологичная концепция общественного уклада требует от нас анализа своевременного выполнения сверхзадачи. И нет сомнений, что некоторые особенности внутренней политики будут представлены в исключительно положительном свете. Не следует, однако, забывать, что внедрение современных методик способствует повышению качества экономической целесообразности принимаемых решений. Однозначно, многие известные личности объединены в целые кластеры себе подобных. Также как реализация намеченных плановых заданий способствует подготовке и реализации благоприятных перспектив. В целом, конечно, укрепление и развитие внутренней структуры обеспечивает актуальность инновационных методов управления процессами.";
            console.log(`error: ${er}`)

        }
        
    }
    loadSpinner.remove();
    leaf__fall.style.zIndex = "0";
}

//header
document.addEventListener('scroll', () => {
    document.querySelector('header').style.background = "linear-gradient(rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.3) 100%)";
    if(window.innerWidth < 1280 )
    {
        document.querySelector('header').style.background = "rgba(0, 0, 0, 0.9)"
    }
    if(window.scrollY == 0)
    {
        document.querySelector('header').style.background = "rgba(0, 0, 0, 0)"
    }
})

