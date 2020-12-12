import * as React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Box from '../components/box'
import Button from '../components/button'
import SumList from '../components/sum-list'
import TaleList from '../components/tale-list'
import Text from '../components/text'
import theme from '../utils/theme'
import TimerCountDown from '../components/time-counter'
import { messageList } from '../messaging/messages'

import { levels } from '../helpers/levels'

import { Stopwatch } from '../components/icons'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstPressIndex: null,
      numList: [],
      sumList: [],
      isProblemSolved: false,
      timer: 100,
      configuredLevel: levels.find(
        x => x.level === this.props.route.params.data
      ),
      leftMoveCount: 20
    }
  }

  componentDidMount() {
    this.setNewListAndSumList(this.state.configuredLevel.levelNumbers)
    //this.generateNum()
    this.intervalId = null
    this.intervalId = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    )
    console.log('Start interval ' + this.intervalId)
  }

  onTalePress = index => {
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
      this.setNewListAndSumList(tempList)
      if (firstIndex !== secondIndex) {
        this.props.navigation.setOptions({
          title:
            this.state.leftMoveCount - 1 >= 0 ? this.state.leftMoveCount - 1 : 0
        })
        this.state.leftMoveCount -= 1
      }
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
      this.levelSuccess()
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
      this.setState(prevState => ({ timer: prevState.gamePoint + 100 }))
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
        timer: 100
      },
      () => {
        this.props.navigation.setOptions({ title: this.state.leftMoveCount })
        this.setNewListAndSumList(this.state.configuredLevel.levelNumbers)
        clearInterval(this.intervalId)
        clearInterval(this.moveCounter)
        this.intervalId = setInterval(() => {
          this.setState(prevState => ({ timer: prevState.timer - 1 }))
        }, 1000)
      }
    )
    this.leftMoveCount = 20
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
          columnCount={this.state.configuredLevel.colNum}
          taleNumList={this.state.numList}
          onTalePress={this.onTalePress}
          pressedIndex={this.state.firstPressIndex}
        />
      )
    })
    let message = messageList.find(x => x.code === '002')
    return (
      <Box flex={1} backgroundColor={theme.colors.background}>
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
          <Text style={styles.finish}>{message.tr}</Text>

          <Box>
            <Button
              justifyContent="center"
              mt={15}
              width={WINDOW_WIDTH / 2}
              height={50}
              borderRadius="full"
              bg="#F433A0"
              onPress={this.onNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Button>
          </Box>
        </Modal>
        <Box mt={10} flexDirection="row" alignItems="center">
          <Text fontSize={18} color={theme.colors.pink} ml={20} mr={15}>
            LEVEL {this.state.configuredLevel.level} -{' '}
            {this.state.configuredLevel.colNum} x{' '}
            {this.state.configuredLevel.rowNum}
          </Text>
        </Box>
        <Box
          mt={
            this.state.configuredLevel.rowNum >
            this.state.configuredLevel.colNum
              ? 30
              : 100
          }
        >
          <Box alignItems="center">{taleListObj}</Box>
        </Box>
        <Box
          alignSelf="center"
          borderWidth={2}
          borderColor={theme.colors.pink}
          width={WINDOW_WIDTH - 80}
          mt={25 - (this.state.configuredLevel.colNum - 3) * 5}
        />
        <Box ml={50}>
          <SumList
            sumList={this.state.sumList}
            columnCount={this.state.configuredLevel.colNum}
          />
        </Box>
        <Box
          flexDirection="row"
          top={WINDOW_HEIGHT - 200}
          left={WINDOW_WIDTH / 2 - 64}
          position="absolute"
        >
          <Box ml={40} alignItems="center">
            <Stopwatch />
            <TimerCountDown
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ fontSize: 18, color: theme.colors.pink, marginTop: 10 }}
              timer={this.state.timer > 0 ? this.state.timer : 0}
            />
          </Box>
        </Box>
      </Box>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  finish: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Starjedi'
  },
  nextProblemModal: {
    backgroundColor: 'white',
    height: WINDOW_HEIGHT / 2,
    maxHeight: WINDOW_HEIGHT / 2,
    width: (WINDOW_WIDTH * 5) / 6,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WINDOW_HEIGHT / 4,
    borderRadius: 20
  }
})
