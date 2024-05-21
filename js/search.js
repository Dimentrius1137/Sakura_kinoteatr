const filter__bar = document.querySelector('.selector_menu');
const select__windows = document.querySelectorAll('.selector');
const range = document.getElementById('range');
const slider_range = document.querySelectorAll('.slider-range');
filter__bar.addEventListener('click', (el)=> {
    const switch__el = el.target.parentElement;
    if(switch__el.classList.contains('open') && el.target.tagName == "SPAN")
    {
        switch__el.classList.remove('open');
    }
    else if(!switch__el.classList.contains('open')  && el.target.tagName == "SPAN")
    {
        select__windows.forEach((content)=> { content.classList.remove('open'); })
        switch__el.classList.add('open');
    }
}) 

const search = document.querySelector('.main__search__field');
function Search_focus(){
    search.focus();
}
//создание карточек
const catalog = document.querySelector('#cat');
let cardClass = 'card';
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


const search__url = "https://api.kinopoisk.dev/v1.4/movie/search?&query";
const _none_poster = "interface_items/none_pic.png";
search.addEventListener('input', async (field) => {
    catalog.innerHTML = "";

    const data = await fetch(`${search__url}=${field.target.value}`, 
    {headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' }});
    const elements = await data.json();
    console.log(elements)
    SearchResult(elements.docs.length, elements.docs)
    if(field.target.value === "") {
        catalog.innerHTML = "";
    }
});


const filtersContainer = document.querySelector('.tags');
let filtersArray = [];
let queryArray = [];
let queryString = '';
let filteredQuery = `https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name`;
filter__bar.addEventListener('change', (el) => {


            filtersContainer.innerHTML = "";
            const filter = el.target.parentElement.innerText;
            let currentQueries = [];
            let withoutCheckedEl = [];
            if(el.target.checked == true)
                {
                    filtersArray.push(filter);
                    queryArray.push(`type=${el.target.id}`)
                }
                else{
                withoutCheckedEl = filtersArray.filter((unchecked) => {       
                        return unchecked != filter
                    })
                    filtersArray = withoutCheckedEl;
            
                currentQueries = queryArray.filter((query) => {
                        return query != `type=${el.target.id}`
                    })
                    queryArray = currentQueries;
                }
            
                filtersArray.forEach((tag) => {
                    filtersContainer.innerHTML += `<span class="tag">${tag}<img class="remove" src="interface_items/cancel.svg"><span>`;
                })
                queryString = queryArray.join('&')
            
                filteredQuery = `https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&${queryString}&year=${slider_range[0].value}-${slider_range[1].value}`;
            
        

  
})

filtersContainer.addEventListener('click', (tag) => {
    if(tag.target.classList.contains('remove'))
        {
            const name__tag = tag.target.parentElement;
            const checkboxes = document.querySelectorAll('input[type="checkbox"]') 
       
            checkboxes.forEach((checkbox) => {
                if(checkbox.parentElement.innerText == name__tag.innerText)
                {
                    withoutCheckedEl = filtersArray.filter((unchecked) => {       
                        return unchecked != name__tag.innerText
                    })
                    filtersArray = withoutCheckedEl;
            
                    currentQueries = queryArray.filter((query) => {
                        return query != `type=${checkbox.id}`
                    })
                    queryArray = currentQueries;
                    checkbox.checked = false;
                }
            })

            queryString = queryArray.join('&')

            name__tag.remove();
            filteredQuery = `https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&${queryString}&year=${slider_range[0].value}-${slider_range[1].value}`;
        }

    })


    async function SearchResult(titleCount, title){
        for(let i = 0; i < titleCount; i++)
            {
                CreateCards();
            }
            const card = document.querySelectorAll(`.${cardClass}`);
    
            for(let i = 0; i < titleCount; i++)
                {
                    try{
                        let el = title[i];
                        card[i].children[0].children[0].src = el.poster.url || el.poster.previewUrl;
                        if(el.poster.url == null && el.poster.previewUrl == null)
                        {
                            card[i].children[0].children[0].src = _none_poster;
                        }
            
                        if(el.name != '')
                        {
                            card[i].children[1].innerHTML = el.name;
                            card[i].children[1].href = `page.html?name=${el.name}`;
                        }
                        else{
                            card[i].children[1].innerHTML = el.alternativeName;
                            card[i].children[1].href = `page.html?name=${el.alternativeName}`;
                        }
                        card[i].children[2].innerHTML = el.description;
                       if (title.status == 403)
                       {
                           throw "Ошибка"
                       }
                    }
                    catch(err){
                        card[i].children[0].children[0].src = _none_poster;
                        card[i].children[1].innerHTML = "none";
                        card[i].children[1].href = 'page.html?error';
                        card[i].children[2].innerHTML = "Каждый из нас понимает очевидную вещь: консультация с широким активом не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Следует отметить, что высокотехнологичная концепция общественного уклада требует от нас анализа своевременного выполнения сверхзадачи. И нет сомнений, что некоторые особенности внутренней политики будут представлены в исключительно положительном свете. Не следует, однако, забывать, что внедрение современных методик способствует повышению качества экономической целесообразности принимаемых решений. Однозначно, многие известные личности объединены в целые кластеры себе подобных. Также как реализация намеченных плановых заданий способствует подготовке и реализации благоприятных перспектив. В целом, конечно, укрепление и развитие внутренней структуры обеспечивает актуальность инновационных методов управления процессами.";
                        console.log(err)
                    }
                }
    }

let itemsCount = 6;
let iterator = 0;
if(window.innerWidth > 1600)
{
    itemsCount = 8;
}

const searchBtn = document.querySelector('.button_cont');
searchBtn.addEventListener('click', async function() {
    catalog.innerHTML = "";
    const array_data = [];
    console.log(filteredQuery)
    for(let i = 0; i < itemsCount; i++)
    {
        const res = await fetch(filteredQuery, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } })
        const data = await res.json();
        console.log(data)
        array_data.push(data);
    }
    SearchResult(itemsCount, array_data)
})

if(range)
{
    noUiSlider.create(range, {
        start: [2000, 2024],
        connect: true,
        range: {
            'min': 1895,
            'max': 2024
        },
        step: 1,
    });
}
range.noUiSlider.on('update', function (values, handle) {
    slider_range[handle].value = Math.floor(values[handle])
    filteredQuery = `https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&${queryString}&year=${slider_range[0].value}-${slider_range[1].value}`;
});



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
function Open()
{
    for(let i = 0; i < arguments.length; i++)
    {
        arguments[i].classList.toggle('open');
    }
}



//бургер меню
const loup = document.querySelector('.loup');
const switch_menu = document.querySelector('.switch_menu');
const drop_menu = document.querySelector('.drop_menu')

switch_menu.addEventListener('click', () => {
    Open(switch_menu, drop_menu);
    document.querySelector('header').style.background = "rgba(0, 0, 0, 0.9)";
})


function ScrollToStart()
{
    window.scrollTo({top:0, behavior:"smooth"});
}







