
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Sample song
const song = 'song';

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = 'Let Her Go X Choo Lo (Slowed and Reverb).mp3';
    cover.src = 'path/to/your-image-file.jpg';
}

// Initially load song details into DOM
loadSong(song);

// Play song
function playSong() {
    document.getElementById('music-container').classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause song
function pauseSong() {
    document.getElementById('music-container').classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = document.getElementById('music-container').classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Update progress bar
audio.addEventListener('timeupdate', (e) => {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

// Set progress bar
progressContainer.addEventListener('click', (e) => {
    const totalWidth = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / totalWidth) * duration;
});

// Change song
prevBtn.addEventListener('click', () => {
    // Change to the previous song
});

nextBtn.addEventListener('click', () => {
    // Change to the next song
});
