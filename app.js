//Use the axios library to make HTTP requests with a helper function to the API
const fetchData = async () => {
    console.log('Start fetching data')
    const response = await axios.get("https://api.aniapi.com/v1/anime", {
        headers: {
            'Authorization': 'Bearer ****',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params: {
            title: "immortal king"
        }
    })
    //show request
    console.log(response.data)
}

//Call helper function
fetchData()
