//create a reusable autocomplete function
const createAutoComplete = ({ 
    //destructure out the separate functions
    root, 
    renderAnimeOption, 
    onOptionSelect, 
    inputValue, 
    fetchData }) => {
    //set up widget autocomplete function 
        root.innerHTML = `
            <label><b>Search</b></label>
            <input class="input" />
                <div class="dropdown">
                    <div class="dropdown-menu">
                        <div class="dropdown-content results"></div>
                    </div>
                </div>
        `


        const input = root.querySelector('input')
        const dropdown = root.querySelector('.dropdown')
        const resultsWrapper = root.querySelector('.results')


        //Select the input element and add event listeners to find a show when text is added
        const onInput = async event => {
                const items = await fetchData(event.target.value)
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
                for (let item of items) {
                    const itemOption = document.createElement('a')
                    

                    itemOption.classList.add('dropdown-item')
                    itemOption.innerHTML = renderAnimeOption(item)

                    //handling anime selection
                    itemOption.addEventListener('click', () => {
                        dropdown.classList.remove('is-active')
                        input.value = inputValue(item)
                        //make a follow-up request to show anime info with a helper function
                        onOptionSelect(item)
                    })

                    resultsWrapper.appendChild(itemOption)
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

}