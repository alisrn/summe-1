/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity
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
import { playTalePress, playSumTalePress } from '../helpers/audio'
import { levels } from '../helpers/levels2'
import { helpMeOnThisOne } from '../helpers/helpme'

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
      userPoint: parseInt(this.props.route.params.userPoint, 10),
      leftMoveCount: this.setLevelMoveCount(
        levels.find(x => x.level === this.props.route.params.data).level
      ),
      gamePoint: 0,
      targetTale: [-1, -1],
      replacedTale: [-1, -1],
      sound: global.userPreferences.sound
    }
  }

  setLevelMoveCount(configuredLevel) {
    if (configuredLevel <= 30) {
      return 10
    } else if (configuredLevel <= 50) {
      return 15
    } else if (configuredLevel <= 100) {
      return 20
    } else if (configuredLevel <= 140) {
      return 30
    } else if (configuredLevel <= 200) {
      return 40
    }
    return 50
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
      if (
        this.state.leftMoveCount >=
        this.setLevelMoveCount(this.state.configuredLevel)
      ) {
        this.shuffle(defList)
        this.setNewListAndSumList(defList)
      } else {
        this.levelSuccess()
      }
    }
  }

  levelSuccess() {
    this.leftMoveCount = this.state.leftMoveCount
    this.totalUserPoint =
      this.state.userPoint +
      (this.state.leftMoveCount > 0 ? this.state.leftMoveCount * 100 : 0) +
      this.state.timer * 10
    clearInterval(this.intervalId)
    this.intervalId = null

    this.props.route.params.updateUserLevel(
      this.state.configuredLevel.level + 1,
      this.state.userPoint +
        (this.state.leftMoveCount > 0 ? this.state.leftMoveCount * 100 : 0) +
        this.state.timer * 10
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
      this.setState(prevState => ({
        gamePoint: prevState.gamePoint + 100,
        userPoint: prevState.userPoint + 100
      }))
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
        leftMoveCount: this.setLevelMoveCount(
          levels.find(x => x.level === this.props.route.params.data).level
        ),
        timer: 100,
        gamePoint: 0,
        userPoint: this.totalUserPoint,
        timerCountStarted: false
      },
      () => {
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
    this.leftMoveCount = this.setLevelMoveCount(
      levels.find(x => x.level === this.props.route.params.data).level
    )
  }

  onHint() {
    let move = helpMeOnThisOne(this.state.configuredLevel, this.state.numList)
    this.setState(prevState => {
      return {
        firstPressIndex: null,
        targetTale: move.indexToBeRetrieved,
        replacedTale: move.indexToBeReplaced,
        userPoint: prevState.userPoint - 100
      }
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

  startTimerPoints() {
    if (!this.state.timerCountStarted) {
      this.intervalId = setInterval(() => {
        this.setState(prevState => ({
          timer: prevState.timer - 1,
          gamePoint: prevState.gamePoint + 10,
          userPoint: prevState.userPoint + 10
        }))
      }, 30)
    } else {
      clearInterval(this.intervalId)
    }
  }

  onRateUs() {
    this.props.navigation.navigate('RateUs', {
      headerLeft: () => (
        <Button
          height="100%"
          onPress={() => this.props.navigation.navigate('GameScreen')}
        />
      )
    })
  }

  render() {
    var foo = []
    for (let i = 0; i < this.state.configuredLevel.rowNum; i++) {
      foo.push(i)
    }

    if (this.leftMoveCount <= 0) {
      clearInterval(this.moveCounter)
      if (this.state.timer > 0 && !this.state.timerCountStarted) {
        this.startTimerPoints()
        this.setState({ timerCountStarted: true })
      } else if (this.state.timer <= 0 && this.state.timerCountStarted) {
        clearInterval(this.intervalId)
      }
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
          rowCount={this.state.configuredLevel.rowNum}
          taleNumList={this.state.numList}
          onTalePress={this.onTalePress}
          pressedIndex={this.state.firstPressIndex}
        />
      )
    })
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
                  marginTop: WINDOW_HEIGHT / 4.97
                }}
              >
                <Text style={styles.finish}>level</Text>
                <Text style={styles.finish}>complete</Text>
                <Image
                  source={require('../assets/designs/Chest_item.png')}
                  style={{
                    height: WINDOW_HEIGHT / 6.4,
                    resizeMode: 'contain',
                    marginTop: WINDOW_HEIGHT / (6.4 * 7)
                  }}
                />
                <Box
                  style={{
                    flexDirection: 'row',
                    marginTop: WINDOW_HEIGHT / (6.4 * 7),
                    alignItems: 'space-between'
                  }}
                >
                  <Image
                    source={require('../assets/designs/Star_icon.png')}
                    style={{
                      height: WINDOW_HEIGHT / (6.4 * 4),
                      resizeMode: 'contain'
                    }}
                  />
                  <Box
                    style={{
                      minWidth: WINDOW_HEIGHT / (6.4 * 2)
                    }}
                  >
                    <Text style={styles.finish}>{this.state.gamePoint}</Text>
                  </Box>
                </Box>
                <Box>
                  <Button style={styles.nextButton} onPress={this.onNext}>
                    <Image
                      source={require('../assets/designs/Next_button.png')}
                      style={{
                        height: WINDOW_HEIGHT / 17.92,
                        resizeMode: 'contain',
                        position: 'absolute',
                        alignSelf: 'center'
                      }}
                    />
                    <Text style={styles.buttonText}>Next</Text>
                  </Button>
                </Box>
              </Box>
            </ImageBackground>
          </Modal>
          <Box style={{ flex: 1 }}>
            <Box justifyContent="center" marginTop={20}>
              <Score
                point={this.state.userPoint}
                style={{
                  alignSelf: 'flex-start',
                  position: 'absolute',
                  marginLeft: WINDOW_HEIGHT / (17.92 * 5)
                }}
              />
              <Textbg
                text={'LEVEL'}
                level={this.state.configuredLevel.level}
                style={{ alignSelf: 'center' }}
              />
              <TouchableOpacity
                onPress={this.onRateUs.bind(this)}
                style={{
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  height: WINDOW_HEIGHT / 17.92
                }}
              >
                <Image
                  source={require('../assets/designs/Rate_us_button.png')}
                  style={{
                    height: WINDOW_HEIGHT / 17.92,
                    resizeMode: 'contain'
                  }}
                />
              </TouchableOpacity>
            </Box>

            <Box marginTop={WINDOW_HEIGHT / (6.4 * 2)}>
              <Textbg
                text={this.state.leftMoveCount}
                textStyle={{ fontSize: 30 }}
              />
            </Box>
          </Box>
          <Box style={{ flex: 6, justifyContent: 'center' }}>
            <Box
              mt={
                this.state.configuredLevel.rowNum >
                this.state.configuredLevel.colNum
                  ? 0
                  : 0
              }
            >
              <Box alignItems="center">{taleListObj}</Box>
            </Box>
            <Image
              source={require('../assets/designs/Line_item.png')}
              style={{
                alignSelf: 'center',
                width: WINDOW_WIDTH - WINDOW_WIDTH / 5.175,
                marginTop:
                  WINDOW_HEIGHT / (17.92 * 2) -
                  (this.state.configuredLevel.colNum - 3) * 5
              }}
            />
            <Box alignItems="center">
              <SumList
                sumList={this.state.sumList}
                columnCount={this.state.configuredLevel.colNum}
                rowCount={this.state.configuredLevel.rowNum}
                onTalePress={index => {
                  global.userPreferences.sound ? playSumTalePress() : null
                }}
              />
            </Box>
          </Box>

          <Box alignItems="center" flex={1}>
            <TimerCountDown
              style={{
                fontSize: 18,
                color: theme.colors.pink,
                marginTop: WINDOW_HEIGHT / 17.92
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
              style={{
                height: WINDOW_WIDTH / 6.9,
                resizeMode: 'contain'
              }}
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
    fontFamily: 'Starjedi',
    alignSelf: 'center'
  },
  hint: {
    margin: WINDOW_HEIGHT / 22.4
  },
  nextProblemModal: {
    //backgroundColor: 'white',
    //height: (WINDOW_HEIGHT * 4) / 5,
    maxHeight: WINDOW_HEIGHT / 2,
    //width: (WINDOW_WIDTH * 5) / 6,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WINDOW_HEIGHT / 8,
    borderRadius: WINDOW_HEIGHT / 16
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
    marginTop: WINDOW_HEIGHT / 17.92,
    width: WINDOW_WIDTH / 2,
    height: WINDOW_HEIGHT / 17.92,
    borderRadius: WINDOW_HEIGHT / (17.92 * 2),
    color: '#C73A1F'
  }
})
