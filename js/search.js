const filter__bar = document.querySelector('.filters__bar');
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


const filtersContainer = document.querySelector('.tags');
let filtersArray = [];
let queryArray = [];
let queryString = '';
filter__bar.addEventListener('change', (el) => {
    filtersContainer.innerHTML = "";
    const filter = el.target.parentElement.innerText;
    
    if(el.target.checked == true)
    {
        filtersArray.push(filter);
        queryArray.push(`type=${el.target.id}`)
    }
    else{
        const withoutCheckedEl = filtersArray.filter((unchecked) => {
            return unchecked != filter
        })
        filtersArray = withoutCheckedEl;
        const currentQueries = queryArray.filter((query) => {
            return query != `type=${el.target.id}`
        })
        queryArray = currentQueries;
    }
    filtersArray.forEach((tag) => {
        filtersContainer.innerHTML += tag;
    })
    
        queryString = queryArray.join('&')

    
    console.log(queryString)

    const filteredQuery = `https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&${queryString}&year=${slider_range[0].value}-${slider_range[1].value}`;
    for(let i = 0; i < 3; i++)
    {
        fetch(filteredQuery, { headers: { 'X-API-KEY': 'WR46T4C-A2MMNGP-MX8DMH3-A160B0X' } }).then((el) => {
            el.json().then((data) => {
                
                console.log(data);
            })
        })
        
    }

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

});