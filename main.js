
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch('https://resource-ghibli-api.onrender.com/films')
        // tests if api is running correctly
        .then(res => {
            if(res.ok) {
                console.log('API loaded successfully')
                return res.json()
            } else {
                console.log('There was an issue loading the API')
            }
        })
        .then(data => {
            // Movie Selection
            let selectedMovie = ''
            const titles = document.querySelector('select')

            data.forEach(movie => {
                const option = document.createElement('option')
                option.textContent = movie.title
                option.value = movie.title
                titles.append(option)
                option.addEventListener('click', (event) => {
                    selectedMovie = event.target.value
                })
                })

                
            // Review Section (adding and resetting)
            const form = document.querySelector('form')
            const resetReviews = document.querySelector('button[id="reset-reviews"]')
            const reviews = document.querySelector('.movie-reviews ul')

            form.addEventListener('submit', (event) => {
                event.preventDefault()

                const reviewText = document.querySelector('form input[type="text"]')
                const newReview = document.createElement('li')
                const strong = document.createElement('strong')
                strong.textContent = selectedMovie

                newReview.textContent = reviewText.value
                newReview.append(strong)
                reviews.append(newReview)
                reviewText.value = ''
              })

            resetReviews.addEventListener('click', (event) => {
                reviews.innerHTML = ''
            })


            
       })
        .catch(error => console.log(error))
        
        // Movie Details

            

}



// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
