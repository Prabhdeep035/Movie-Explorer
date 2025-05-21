const but=document.querySelector("#but");
const loader=document.getElementById("loader");
// http://www.omdbapi.com/?i=tt3896198&apikey=9d7fc2f6
async function searchMovie(){
    const key="9d7fc2f6";
    const movie=document.getElementById("moviename").value;
    const url=`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${key}`;
    loader.style.display = "flex";
    try{
        const res = await fetch(url);
        const data = await res.json();

        const container=document.getElementById("content");

        if(data.Response=="True"){
            container.innerHTML=`
            <img src="${data.Poster}" alt="Movie Poster">
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>`;
        }
        else{
            container.innerHTML='<p class="error">❌ Movie not found.</p>';
        }
    }
    catch(error){
        console.error("Error Fetching:",error);
    }
    finally{
        loader.style.display = "none";
    }
}

but.addEventListener('click',searchMovie);
document.getElementById("moviename").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchMovie();
    }
});