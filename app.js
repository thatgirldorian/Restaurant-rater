//make autocomplete reusable
const autocompleteConfig = {
     //render an individual anime object
    renderAnimeOption(anime) {
        const imgSrc = anime.cover_image || anime.banner_image;
        return `
                    <img src="${imgSrc}" /> 
                    ${anime.titles.en} (${anime.season_year})
                    `
    },
    onOptionSelect(anime) {
        //hide tutorial/notification bar when anime show is selected
        document.querySelector('.tutorial').classList.add('is-hidden')
        onAnimeSelect(anime);
    }, 
    inputValue(anime) {
        return anime.titles.en
    }, 
    async fetchData(searchedAnime) {
            console.log('Start fetching data')
            //Use the axios library to make HTTP requests with a helper function to the API
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
}

//call the autocomplete function
createAutoComplete ({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
})

createAutoComplete ({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
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
        const imgSrc = animeDetail.cover_image || animeDetail.banner_image;
        const genres = animeDetail.genres.slice(0, 3)
        const animeDesc = animeDetail.descriptions.en

        console.log(`This is ${animeDetail} `)
        return `
        <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${imgSrc}">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${animeDetail.titles.en}</h1>
                <h4>${genres.join(', ')}</h4>
                <p>${animeDesc.substring(0, 100).concat('...')}</p>
            </div>
        </div>
    </article>

    <article class="notification is-primary">
        <p class="title">${animeDetail.score}</p>
        <p class="subtitle">Score</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${animeDetail.episodes_count}</p>
        <p class="subtitle">Episodes count</p>
    </article>
    
        `
    }

    

