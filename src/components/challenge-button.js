import * as React from 'react'
import { StyleSheet } from 'react-native'

import Button from './button'
import Text from './text'
import { Tick, Lock } from './icons'

function ChallengeButton(props) {
  const onChallengePress = () => {
    props.onChallengePress(props.index)
  }

  return (
    <Button
      justifyContent="center"
      mt={50}
      width={350}
      height={51}
      borderRadius="full"
      bg={props.isPassed ? '#5648E3' : props.isLocked ? '#BA3EE3' : '#F433A0'}
      disabled={props.isDisabled}
      onPress={onChallengePress}
    >
      {props.isLocked ? (
        <Lock right={18} top={13} position="absolute" color="white" />
      ) : null}
      <Text style={styles.buttonText}>Challenge-{props.index}</Text>
      {props.isPassed ? (
        <Tick right={18} top={16} position="absolute" color="white" />
      ) : null}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default ChallengeButton
