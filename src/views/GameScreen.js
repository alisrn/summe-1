/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView
} from 'react-native'
import Modal from 'react-native-modal'
import Box from '../components/box'
import Button from '../components/button'
import SumList from '../components/sum-list'
import TaleList from '../components/tale-list'
import Text from '../components/text'
import Score from '../components/score'
import Textbg from '../components/textbg'
import Hint from '../components/hint'
import Sound from '../components/sound'
import theme from '../utils/theme'
import TimerCountDown from '../components/time-counter'
import { messageList } from '../messaging/messages'
import { playTalePress, playSumTalePress } from '../helpers/audio'
import { levels } from '../helpers/levels2'
import { helpMeOnThisOne } from '../helpers/helpme'

import { TouchableOpacity } from 'react-native'
import { marginTop } from 'styled-system'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
//var _that
export default class GameScreen extends React.Component {
  constructor(props) {
    super(props)
    //_that = this
    this.state = {
      firstPressIndex: null,
      numList: [],
      sumList: [],
      isProblemSolved: false,
      timer: 100,
      configuredLevel: levels.find(
        x => x.level === this.props.route.params.data
      ),
      leftMoveCount: 20,
      gamePoint: 0,
      targetTale: [-1, -1],
      replacedTale: [-1, -1],
      sound: global.userPreferences.sound
    }
  }

  componentDidMount() {
    let levelNumbers = this.state.configuredLevel.levelNumbers.flat(1)
    this.shuffle(levelNumbers)
    this.setNewListAndSumList(levelNumbers)
    //this.generateNum()
    this.intervalId = null
    this.intervalId = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    )
    console.log('Start interval ' + this.intervalId)
  }

  componentWillUnmount() {
    if (this.intervalId && this.intervalId != null) {
      clearInterval(this.intervalId)
    }
    if (this.moveCounter && this.moveCounter != null) {
      clearInterval(this.moveCounter)
    }
    if (this.timeCounter && this.timeCounter != null) {
      clearInterval(this.timeCounter)
    }
  }
  shuffle = array => {
    array.sort(() => Math.random() - 0.5)
  }

  onTalePress = index => {
    this.setState({ targetTale: [-1, -1], replacedTale: [-1, -1] })
    if (global.userPreferences.sound) {
      playTalePress()
    }
    if (
      this.state.firstPressIndex === undefined ||
      this.state.firstPressIndex == null
    ) {
      this.setState({ firstPressIndex: index })
    } else {
      let tempList = this.state.numList
      let firstIndex =
        this.state.firstPressIndex[0] * this.state.configuredLevel.colNum +
        this.state.firstPressIndex[1]
      let secondIndex = index[0] * this.state.configuredLevel.colNum + index[1]
      let temp1 = tempList[firstIndex]
      tempList[firstIndex] = tempList[secondIndex]
      tempList[secondIndex] = temp1
      if (firstIndex !== secondIndex) {
        this.props.navigation.setOptions({
          title:
            this.state.leftMoveCount - 1 >= 0 ? this.state.leftMoveCount - 1 : 0
        })
        this.state.leftMoveCount -= 1
      }
      this.setNewListAndSumList(tempList)
    }
  }

  allEqual = arr => arr.every(v => v === arr[0])

  setNewListAndSumList = defList => {
    let forSumList = []
    for (
      let i = 0;
      i < this.state.configuredLevel.colNum * this.state.configuredLevel.rowNum;
      i++
    ) {
      if (i < this.state.configuredLevel.colNum) {
        forSumList.push(defList[i])
      } else {
        forSumList[i % this.state.configuredLevel.colNum] += defList[i]
      }
    }
    this.setState({
      sumList: forSumList,
      numList: defList,
      firstPressIndex: null
    })

    if (this.allEqual(forSumList)) {
      if (this.state.leftMoveCount >= 20) {
        console.log('reshuffling!')
        this.shuffle(defList)
        this.setNewListAndSumList(defList)
      } else {
        this.levelSuccess()
      }
    }
  }

  levelSuccess() {
    this.leftMoveCount = this.state.leftMoveCount
    console.log('clear interval ' + this.intervalId)
    clearInterval(this.intervalId)
    this.intervalId = null

    this.props.route.params.updateUserLevel(
      this.state.configuredLevel.level + 1,
      this.state.leftMoveCount * 100
    )
    this.setState({
      isProblemSolved: true
    })
  }

  onSuccessOpen() {
    if (this.intervalId && this.intervalId != null) {
      clearInterval(this.intervalId)
    }
    if (this.moveCounter && this.moveCounter != null) {
      clearInterval(this.moveCounter)
    }
    if (this.timeCounter && this.timeCounter != null) {
      clearInterval(this.timeCounter)
    }
    this.moveCounter = setInterval(() => {
      this.leftMoveCount -= 1
      this.props.navigation.setOptions({
        title: this.leftMoveCount > 0 ? this.leftMoveCount : 0
      })
      this.setState(prevState => ({ gamePoint: prevState.gamePoint + 100 }))
    }, 100)
  }

  onNext = () => {
    this.props.route.params.data = this.state.configuredLevel.level + 1
    this.setState(
      {
        configuredLevel: levels.find(
          x => x.level === this.props.route.params.data
        ),
        isProblemSolved: false,
        leftMoveCount: 20,
        timer: 100,
        gamePoint: 0
      },
      () => {
        this.props.navigation.setOptions({ title: this.state.leftMoveCount })
        let levelNumbers = this.state.configuredLevel.levelNumbers.flat(1)
        this.shuffle(levelNumbers)
        this.setNewListAndSumList(levelNumbers)
        clearInterval(this.intervalId)
        clearInterval(this.moveCounter)
        this.intervalId = setInterval(() => {
          this.setState(prevState => ({ timer: prevState.timer - 1 }))
        }, 1000)
      }
    )
    this.leftMoveCount = 20
  }

  onHint() {
    let move = helpMeOnThisOne(this.state.configuredLevel, this.state.numList)
    this.setState({
      firstPressIndex: null,
      targetTale: move.indexToBeRetrieved,
      replacedTale: move.indexToBeReplaced
    })
  }

  onSoundChange() {
    global.userPreferences.sound = !global.userPreferences.sound
    this.setState(prevState => {
      return {
        ...prevState,
        sound: !prevState.sound
      }
    })
  }

  render() {
    var foo = []
    for (let i = 0; i < this.state.configuredLevel.rowNum; i++) {
      foo.push(i)
    }

    /*     if (this.timeCounter <= 0) {
      clearInterval(this.timeCounter)
      this.timeCounter == null
    } */

    if (this.leftMoveCount <= 0) {
      clearInterval(this.moveCounter)
    }

    const taleListObj = foo.map((x, index) => {
      return (
        <TaleList
          key={index}
          index={index}
          hintedTales={{
            target: this.state.targetTale,
            replaced: this.state.replacedTale
          }}
          columnCount={this.state.configuredLevel.colNum}
          taleNumList={this.state.numList}
          onTalePress={this.onTalePress}
          pressedIndex={this.state.firstPressIndex}
        />
      )
    })
    let message = messageList.find(x => x.code === '002')
    return (
      <Box style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/designs/Game_background.png')}
          style={styles.image}
        >
          <SafeAreaView barStyle="light-content" />
          <Modal
            props={this.props}
            onModalShow={this.onSuccessOpen.bind(this)}
            isVisible={this.state.isProblemSolved}
            animationIn="slideInUp"
            animationInTiming={700}
            animationOut="slideOutDown"
            animationOutTiming={700}
            style={styles.nextProblemModal}
          >
            <ImageBackground
              source={require('../assets/designs/Level_Complete_bg.png')}
              style={styles.imageModal}
            >
              <Box
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 180
                }}
              >
                <Text style={styles.finish}>level</Text>
                <Text style={styles.finish}>complete</Text>
                <Image
                  source={require('../assets/designs/Chest_item.png')}
                  style={{
                    height: 140,
                    resizeMode: 'contain',
                    marginTop: 20
                  }}
                />
                <Box
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center'
                  }}
                >
                  <Image
                    source={require('../assets/designs/Star_icon.png')}
                    style={{
                      height: 35,
                      resizeMode: 'contain'
                    }}
                  />
                  <Text style={styles.finish}>{this.state.gamePoint}</Text>
                </Box>
                <Box>
                  <Button style={styles.nextButton} onPress={this.onNext}>
                    <Text style={styles.buttonText}>Next</Text>
                  </Button>
                </Box>
              </Box>
            </ImageBackground>
          </Modal>
          <Box justifyContent="center" marginTop={20}>
            <Score
              point={this.state.gamePoint}
              style={{
                alignSelf: 'flex-start',
                position: 'absolute',
                marginLeft: 10
              }}
            />
            <Textbg
              text={'LEVEL'}
              level={this.state.configuredLevel.level}
              style={{ alignSelf: 'center' }}
            />
            <Image
              source={require('../assets/designs/Menu_button.png')}
              style={{
                height: 45,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
                position: 'absolute'
              }}
            />
          </Box>

          <Box marginTop={70}>
            <Textbg
              text={this.state.leftMoveCount}
              textStyle={{ fontSize: 30 }}
            />
          </Box>
          <Box
            mt={
              this.state.configuredLevel.rowNum >
              this.state.configuredLevel.colNum
                ? 30
                : 80
            }
          >
            <Box alignItems="center">{taleListObj}</Box>
          </Box>
          <Image
            source={require('../assets/designs/Line_item.png')}
            style={{
              alignSelf: 'center',
              width: WINDOW_WIDTH - 80,
              marginTop: 25 - (this.state.configuredLevel.colNum - 3) * 5
            }}
          />
          <Box ml={50}>
            <SumList
              sumList={this.state.sumList}
              columnCount={this.state.configuredLevel.colNum}
              onTalePress={index => {
                global.userPreferences.sound ? playSumTalePress() : null
              }}
            />
          </Box>

          <Box alignItems="center">
            <TimerCountDown
              style={{
                fontSize: 18,
                color: theme.colors.pink,
                marginTop: 40
              }}
              point={this.state.timer > 0 ? this.state.timer : 0}
            />
          </Box>
          <Box
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <Sound
              onPress={this.onSoundChange.bind(this)}
              soundOn={this.state.sound}
            />
            <Hint onPress={this.onHint.bind(this)} />
          </Box>
        </ImageBackground>
      </Box>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#3C7882',
    fontSize: 24,
    fontWeight: 'bold'
  },
  finish: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Starjedi'
  },
  hint: {
    margin: 40
  },
  nextProblemModal: {
    //backgroundColor: 'white',
    height: (WINDOW_HEIGHT * 4) / 5,
    maxHeight: WINDOW_HEIGHT / 2,
    //width: (WINDOW_WIDTH * 5) / 6,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WINDOW_HEIGHT / 8,
    borderRadius: 20
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  },
  imageModal: {
    flex: 1,
    height: (WINDOW_HEIGHT * 2) / 3,
    width: (WINDOW_WIDTH * 5) / 6,
    resizeMode: 'contain'
  },
  nextButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 80,
    width: WINDOW_WIDTH / 2,
    height: 50,
    borderRadius: 25,
    color: '#C73A1F'
  }
})
