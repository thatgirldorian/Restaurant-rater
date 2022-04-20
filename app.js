//Use the axios library to make HTTP requests with a helper function to the API
const fetchData = async searchedAnime => {
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


    //show request and handle errors for when we we search for non-existent anime
    let animeData = response.data.data.documents 
        if (response.data.message === "Zero anime found") {
            return []
        } else
    return animeData
}

//set up widget autocomplete function 
const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Search for a new anime below:</b></label>
    <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
`


const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultsWrapper = document.querySelector('.results')


//Select the input element and add event listeners to find a show when text is added
const onInput = async event => {
        const animes = await fetchData(event.target.value)
        // close dropdown if our search does not show any show at all
        if (!event.target.value) {
            dropdown.classList.remove('is-active')
            return;
        }


        //handle broken images
        resultsWrapper.innerHTML = ' '
        //open up a dropdown to add movies
        dropdown.classList.add('is-active')
        // get each anime
        for (let anime of animes) {
            const animeOption = document.createElement('a')
            const imgSrc = anime.cover_image || anime.banner_image;

            animeOption.classList.add('dropdown-item')
            animeOption.innerHTML = `
            <img src="${imgSrc}" /> <br>
            ${anime.titles.en}
            `

            //handling anime selection
            animeOption.addEventListener('click', () => {
                dropdown.classList.remove('is-active')
                input.value = anime.titles.en
                //make a follow-up request to show anime info with a helper function
                onAnimeSelect(anime)
            })

            resultsWrapper.appendChild(animeOption)
        }
}
    //get the value of whatever is typed, but set timeout for unnecessary requests
    input.addEventListener('input', debounce(onInput, 500))

    //automatically close the dropdown 
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active')
        }
    })

    const onAnimeSelect = async anime => {
        const response = await axios.get("https://api.aniapi.com/v1/anime/", {
        headers: {
            'Authorization': 'Bearer ****',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params: {
            anilist_id: anime.anilist_id
        }
    })

    let animeInformation = response.data.data.documents
    console.log(animeInformation)

    //render our anime anime  information
    document.querySelector('#summary').innerHTML = animeTemplate(animeInformation[0]) 
    }
    

    //helper function to create out anime info on our web page
    const animeTemplate = animeDetail => {
        // const imgSrc = animeDetail.cover_image || animeDetail.banner_image;
        console.log(`This is ${animeDetail} `)
        return `
                <p class="image">
                    <img src="${animeDetail.cover_image}">
                </p>
        `
    }

    

