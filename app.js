//Use the axios library to make HTTP requests with a helper function to the API
const fetchData = async (searchedAnime) => {
    console.log('Start fetching data')
    const response = await axios.get("https://api.aniapi.com/v1/anime", {
        headers: {
            'Authorization': 'Bearer ****',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params: {
            title: searchedAnime
        }
    })

    //error handling for when we search for non-existent anime
    // if (animeData)

    //show request
    let animeData = response.data.data.documents 
    return animeData
}

//set up widget autocomplete function 
const root = document.querySelector('.autocomplete')
root,innerHTML = `
    <label><b>Search for a new anime below</b></label>
    <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
`


const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const input = document.querySelector('.results')

//Select the input element and add event listeners to find a show when text is added
const onInput = async event => {
        const animes = await fetchData(event.target.value)
        console.log(animes)

        // get each anime
        for (let anime of animes) {
            const div = document.createElement('div')

            div.innerHTML = `
            <img src="${anime.banner_image}" />
            <h2>${anime.titles.en}</h2>
            <p>${anime.descriptions.en}</p>
            `
            document.querySelector('#target').appendChild(div)
        }
}
    //get the value of whatever is typed, but set timeout for unnecessary requests
    input.addEventListener('input', debounce(onInput, 500))
