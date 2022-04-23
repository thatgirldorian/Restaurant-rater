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
    onOptionSelect(anime) {
        //hide tutorial/notification bar when anime show is selected
        document.querySelector('.tutorial').classList.add('is-hidden')
        onAnimeSelect(anime, document.querySelector('#left-summary'), 'left');
    }
})

createAutoComplete ({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(anime) {
        //hide tutorial/notification bar when anime show is selected
        document.querySelector('.tutorial').classList.add('is-hidden')
        onAnimeSelect(anime, document.querySelector('#right-summary'), 'right');
    }
})

    //compare both anime shows
    let leftAnime
    let rightAnime
    const onAnimeSelect = async (anime, summaryElement, side) => {
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
    summaryElement.innerHTML = animeTemplate(animeInformation[0]) 
    //more anime comparison 
    if (side === 'left') {
        leftAnime = animeInformation
    } else {
        rightAnime = animeInformation
    }

    //run anime comparison
    if (leftAnime && rightAnime) {
        runComparison()
    }
}

const runComparison = () => {
    const leftHandStats = document.querySelectorAll('#left-summary .notification')
    const rightHandStats = document.querySelectorAll('#right-summary .notification')

    leftHandStats.forEach((leftStat, index) => {
        const rightStat = rightHandStats[index]
        //get the value on each side
        const leftHandValue = leftStat.dataset.value
        const rightHandValue = rightStat.dataset.value

        if (rightHandValue > leftHandValue) {
            leftStat.classList.remove('is-primary')
            leftStat.classList.add('is-warning')
        } else {
            rightStat.classList.remove('is-primary')
            rightStat.classList.add('is-warning')
        }
    })
};

    

    //helper function to create out anime info on our web page
    const animeTemplate = animeDetail => {
        //extract the score value and compare anime show scores
        const animeScore = animeDetail.score
        const episodeCount = animeDetail.episodes_count

        const imgSrc = animeDetail.cover_image || animeDetail.banner_image;
        const genres = animeDetail.genres.slice(0, 3)
        const animeDesc = animeDetail.descriptions.en
        const startDate = animeDetail.start_date.substring(0, 10);
        const endDate = animeDetail.end_date

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

    <article data-value=${animeScore} class="notification is-primary">
        <p class="title">${animeDetail.score}</p>
        <p class="subtitle">Score</p>
    </article>
    <article data-value=${episodeCount} class="notification is-primary">
        <p class="title">${animeDetail.episodes_count}</p>
        <p class="subtitle">Episodes count</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${startDate}</p>
        <p class="subtitle">Start Date</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${endDate}</p>
        <p class="subtitle">End Date</p>
    </article>
        `
    }

    

