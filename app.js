//Use the axios library to make HTTP requests with a helper function to the API
const fetchData = async () => {
    const response = await axios.get('https://api.aniapi.com')

    //show request
    console.log(response.data)
}

//Call helper function
fetchData()