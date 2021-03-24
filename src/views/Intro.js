import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image
} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { TouchableOpacity } from 'react-native-gesture-handler'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const data = [
  {
    image: require('../assets/designs/tutor/sims1.png')
  },
  {
    image: require('../assets/designs/tutor/sims2.png')
  },
  {
    image: require('../assets/designs/tutor/sims3.png')
  },
  {
    image: require('../assets/designs/tutor/sims4.png')
  },
  {
    image: require('../assets/designs/tutor/sims5.png')
  },
  {
    image: require('../assets/designs/tutor/sims6.png')
  }
]

const ratio = 1710 / 828

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  image: {
    //width: 320,
    // 1636 x 828,
    height: WINDOW_HEIGHT * 0.9,
    width: WINDOW_HEIGHT * 0.9 / ratio,
    

    //marginVertical: 32
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center'
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center'
  },
  buttonCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class Intro extends React.Component {
  constructor(props) {
    super(props)
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image} />
      </View>
    )
  }

  _keyExtractor = item => item.title

  _renderNextButton = () => {
    return (
      <TouchableOpacity style={styles.buttonCircle}>
        <Text style={styles.title}>Next</Text>
      </TouchableOpacity>
    )
  }

  _renderDoneButton = () => {
    return (
      <TouchableOpacity style={styles.buttonCircle}>
        <Text style={styles.title}>Play</Text>
      </TouchableOpacity>
    )
  }

  onDone() {
    this.props.navigation.navigate('GameScreen', {
      ...this.props.route.params
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderItem={this._renderItem}
          onDone={this.onDone.bind(this)}
          data={data}
        />
      </View>
    )
  }
}
