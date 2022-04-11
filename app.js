//Use the axios library to make HTTP requests with a helper function to the API
const fetchData = async () => {
    console.log('Start fetching data')
    const response = await axios.get("https://api.aniapi.com/v1/anime", {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1NzUiLCJuYmYiOjE2NDk1MzExMzYsImV4cCI6MTY1MjEyMzEzNiwiaWF0IjoxNjQ5NTMxMTM2fQ.6EnZs5eZcnThqtd6HUW7xM_Ysm-COK6ubyKyxzYdahw',
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