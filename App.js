import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

const { cond, eq, add, call, set, Value, event } = Animated;

export default function App() {
  const [dragX, setDragX] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [offsetX, setOffsetX] = useState(width / 2)
  const [offsetY, setOffsetY] = useState(100)
  const [gestureState, setGestureState] = useState(-1)
  const [onGestureEvent, setOnGestureEvent] = useState(event([{
    nativeEvent: {
      translationX: dragX,
      translationY: dragY,
      state: gestureState
    }
  }]))
  const [addY, setAddY] = useState(add(offsetY, dragY))
  const [addX, setAddX] = useState(add(offsetX, dragX))
  const [transX, setTransX] = useState(cond(
    eq(gestureState, State.ACTIVE),
    addX,
    set(offsetX, addX))
    )
  const [] = useState()

  return (
    <View style={styles.container}>
      <Animated.Code>
        {() =>
          cond(
            eq(this.gestureState, State.END),
            call([this.addX, this.addY], this.onDrop)
          )
        }
      </Animated.Code>
      <PanGestureHandler
        maxPointers={1}
        minDist={10}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onGestureEvent}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                {
                  translateX: this.transX,
                },
                {
                  translateY: this.transY,
                },
              ],
            },
          ]}
        />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
