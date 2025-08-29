import brave_beep from '../assets/audio/brave_beep.mp3'

export const loadBeep = () => {
  const audio = new Audio(brave_beep)
  audio.load()

  return () => {
    audio.currentTime = 0;
    audio.play()
  }
}