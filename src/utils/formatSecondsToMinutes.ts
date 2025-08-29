export const formatedSecondsToMinutes = (seconds: number) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secondsRemaining = String(Math.floor(seconds % 60)).padStart(2, '0')

  return `${minutes}:${secondsRemaining}`
}