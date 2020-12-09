

const showingResult = document.getElementById('result-section');

const gettingLyric = document.getElementById('lyric-result');
const apiUrl = 'https://api.lyrics.ovh';


//searching  song or artist
async function searchSong(term) {
    // fetch(`${apiUrl}/suggest/${term}`)
    //     .then(res => res.json())
    //     .then(data => showData(data))

    const res = await fetch(`${apiUrl}/suggest/${term}`);
    const data = await res.json();
    showData(data);
}

//showing data in result section
function showData(data) {
    showingResult.innerHTML =
        `
    <ul class = "songs">
    ${data.data
            .map(
                song => `<li> 
    <span><strong>${song.artist.name}</strong> -  
     ${song.title}</span>
    <button class ="btn btn-success"  data-artist = "${song.artist.name}"
    data-songTitle ="${song.title}">Get Lyrics</button>
    </li>`
            )
            .join(' ')}
     </ul>
 `;
}

//event listener
document.getElementById('searchBtn').addEventListener("click", event => {
    event.preventDefault();
    let mySong = document.getElementById('input').value.trim();
    if (!mySong) {
        alert('please type song name')
    }
    else {
        searchSong(mySong)
    }
})

//event Listener for get lyric button
showingResult.addEventListener('click', e => {
    const clickedElement = e.target
    // console.log(e.target); 
  
    if (clickedElement.tagName === 'BUTTON') {
      const artist = clickedElement.getAttribute('data-artist');
      const songTitle = clickedElement.getAttribute('data-songTitle');
  
      getLyrics(artist, songTitle);
    }
});

//getting lyric from song

async function getLyrics(artist, songTitle){
    const response = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await response.json();
    console.log(data);

    const lyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    gettingLyric.innerHTML = `<h2><strong>${artist}</strong> - 
    ${songTitle}</h2>
    <span>${lyric}</span>
    `;
    
    // if(data.error){
    //     gettingLyric.innerHTML =data.error;
    // }
    // else{
    //     gettingLyric.innerHTML =data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    // }
       
    

}
