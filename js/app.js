const app = function () {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.vid-container video')
    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button')
    //time display
    const timeDisplay = document.querySelector('.time-display')
    const timeSelects = document.querySelectorAll('.time-select button')

    //outline
    let outlineLength = outline.getTotalLength()
    //song Duration
    let Duration = 60

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    //play sound
    play.addEventListener('click', () => {
        checkPlay(song)
    })

    sounds.forEach(sound => {

        sound.addEventListener('click', function () {
            
            song.src = sound.getAttribute('data-sound')
            video.src = sound.getAttribute('data-video')
            checkPlay(song)
        })
    })

    timeSelects.forEach(option => {
        option.addEventListener('click', () => {
            Duration += parseInt(option.dataset.time)
        })
    })
    const checkPlay = (song) => {
        if (song.paused) {
            song.play()
            play.src = './svg/pause.svg'
            video.play()
        } else {
            song.pause()
            play.src = './svg/play.svg'
            video.pause()
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsed = Duration - currentTime
        let seconds = Math.floor(elapsed % 60) < 10 ? '0' + Math.floor(elapsed % 60) : Math.floor(elapsed % 60)
        let minutes = Math.floor(elapsed / 60) < 10 ? '0' + Math.floor(elapsed / 60) : Math.floor(elapsed / 60)

        let progress = outlineLength - (currentTime / Duration) * outlineLength
        outline.style.strokeDashoffset = progress
        timeDisplay.textContent = `${minutes} : ${seconds}`

        if (currentTime >= Duration) {
            song.pause()
            video.pause()
            song.currentTime = 0
            video.currentTime = 0
            play.src = './svg/play.svg'
        }
    }
}
app()
