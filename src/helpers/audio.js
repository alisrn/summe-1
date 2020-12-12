import Sound from 'react-native-sound'

Sound.setCategory('Ambient', true)

const talePress = new Sound(require('../assets/musics/on_click_tale'), error =>
  console.log(error)
)
export const playTalePress = () => {
  talePress.play(success => talePress.reset())
}

const sumTalePress = new Sound(
  require('../assets/musics/on_click_sum_tale'),
  error => console.log(error)
)
export const playSumTalePress = () => {
  sumTalePress.play(success => sumTalePress.reset())
}
