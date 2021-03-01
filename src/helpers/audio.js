import Sound from 'react-native-sound'

Sound.setCategory('Ambient', true)

const talePress = new Sound(
  require('../assets/musics/on_click_tale.mp3'),
  error => (error !== null ? console.log('audio' + error) : null)
)
export const playTalePress = () => {
  talePress.play(success => talePress.reset())
}

const sumTalePress = new Sound(
  require('../assets/musics/on_click_sum_tale.mp3'),
  error => (error !== null ? console.log('audio' + error) : null)
)
export const playSumTalePress = () => {
  sumTalePress.play(success => sumTalePress.reset())
}
