const but=document.querySelector("#but");
const loader=document.getElementById("loader");
const theme=document.querySelector("#dark");
const body=document.body;
const inp =document.getElementById('moviename');
const container=document.getElementById("content");

let th="light";
async function searchMovie(){
    const key="9d7fc2f6";
    const movie=document.getElementById("moviename").value;
    const url=`https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${key}`;
    loader.style.display = "flex";
    try{
        const res = await fetch(url);
        const data = await res.json();

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

function changeTheme(){
    if(th==="light"){
        body.style.backgroundImage="url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')";
        th="dark";
        theme.innerText="Light Theme";
        inp.style.color='white';
        inp.style.backgroundColor='black';
        but.style.color='white';
        but.style.backgroundColor='black';
        container.style.color='white';
        container.style.backgroundColor='black';
    }
    else{
        th="light";
        body.style.backgroundImage="url('images/background.avif')";
        theme.innerText="Dark Theme";
        inp.style.color='black';
        inp.style.backgroundColor='white';
        but.style.color='black';
        but.style.backgroundColor='white';
        container.style.color='black';
        container.style.backgroundColor='white';
    }
}

but.addEventListener('click',searchMovie);
document.getElementById("moviename").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchMovie();
    }
});
theme.addEventListener('click',changeTheme);