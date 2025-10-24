const Base_URL=`https://www.omdbapi.com/?apikey=6bf4ecec&t=`

const form=document.getElementById('searchForm')
const input=document.getElementById('searchInput')
const movieContainer=document.querySelector('.movieplayer')
const icon = document.querySelector('.icon')

form.addEventListener('submit', async (evt)=>{
    evt.preventDefault()
    form.style.marginLeft="90px"
    icon.style.marginLeft="120px"

    const movieName=input.value.trim()
    if(!movieName)
        return ;

    movieContainer.innerHTML='<p>Loading....<p>'

    try{
        const response= await fetch(`${Base_URL}${movieName}`)
        const data = await response.json()
        if(data.Response==="False"){
            movieContainer.innerHTML='<h2>Movie not Available!<h2>'
            return;
        }

        movieContainer.innerHTML=''

        const movieCard=document.createElement('div')
        movieCard.classList.add('movie-card')

        const poster = document.createElement('img')
        poster.src=data.Poster
        poster.alt='Poster'

        poster.style.marginTop="25px"
        poster.style.marginLeft="80px"

        const title= document.createElement('h2')
        title.textContent=`${data.Title} (${data.Year})`

        const genre = document.createElement('p')
        genre.innerHTML=`<strong>Genre</strong>: ${data.Genre}`

        const director=document.createElement('p')
        director.innerHTML=`<strong>Director</strong>: ${data.Director}`

        const writer=document.createElement('p')
        writer.innerHTML=`<strong>Writer</strong>: ${data.Writer}`

        const cast=document.createElement('p')
        cast.innerHTML=`<strong>Cast</strong>: ${data.Actors}`

        const plot= document.createElement('p')
        plot.innerHTML=`<strong>Plot</strong>: ${data.Plot}`

        const rating= document.createElement('p')
        rating.innerHTML=`<strong>IMDB Rating</strong>: ${data.imdbRating}`

        const movieDetails = document.createElement('div')
        movieDetails.classList.add('movie-details')

        movieDetails.append(title, genre, director, writer, cast, plot, rating)
        movieCard.append(poster, movieDetails)
        movieContainer.appendChild(movieCard)

    }
    catch(error){
        console.error("Error fetching the data", error)
        movieContainer.innerHTML='<p>Something went wrong, Try Again later!!<p>'
    }
})

