const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

/*music*/
const songs = [{
    name: 'element-1',
    displayName: 'Sample Song 1',
    artist: 'Artist 1',
},
    {
        name: 'element-2',
        displayName: 'Sample Song 2',
        artist: 'Artist 2',
    },
    {
        name: 'element-3',
        displayName: 'Sample Song 3',
        artist: 'Artist 3',
    },
    {
        name: 'element-4',
        displayName: 'Sample Song 4',
        artist: 'Artist 4',
    },]

/*checks if playing*/
let isPlaying = false;

/*play*/
const playSong = () => {
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');


}
/*pause*/
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();

}

/*play or pause event listener*/
playBtn.addEventListener('click',
    () => (isPlaying ? pauseSong() : playSong()));

/*DOM update*/
const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`;
}

/*current song*/
let songIndex = 0;

/*previous song function*/
const prevSong = () => {
    /*increments song list*/
    songIndex--;
    /*if statement starts song list over if user reaches end of song list*/
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

/*next song function*/
const nextSong = () => {
    /*increments song list*/
    songIndex++;
    /*if statement starts song list over if user reaches end of song list*/
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

/*on page load - selects first song*/
loadSong(songs[songIndex]);

/*updates time progress bar width to give perception of song progress*/
const updateProgressBar = (e) => {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        /*updates progress bar*/
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        /*calculates display for song duration in minutes*/
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        /*delays switching element to avoid NaN being displayed to user*/
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        /*calculates display for song current time in minutes*/
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        /*delays switching element to avoid NaN being displayed to user*/
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

/*set progress bar...skip forward and backward in song*/
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

/*event listeners*/
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
