// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
// import FlatListDemo from './FlatListDemo';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


// class App extends Component {
//   render() {
//     return (
//       // <View style={styles.container}>
//       //   <Text style={styles.welcome}>Welcome to React Native!</Text>
//       //   <Text style={styles.instructions}>To get started, edit App.js</Text>
//       //   <Text style={styles.instructions}>{instructions}</Text>
//       // </View>
//       <View>         
//         <FlatListDemo />
//      </View>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing
} from 'react-native';

class App extends Component {
  constructor () {
    super()
    this.spinValue = new Animated.Value(0);
    this.scrollY = new Animated.Value(0);
  }

  componentDidMount () {
    this.spin();
    this.slide()
  }
  
  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  slide () {
    this.scrollY.setValue(0)
    Animated.timing(
      this.scrollY,
      {
        toValue: 6,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.slide())
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    var headMov = this.scrollY.interpolate({
      inputRange: [0, 1,2],
      outputRange: [0, -180, -180]
    });
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      <Animated.Image
        style={{
          width: 227,
          height: 200,
          transform: [{rotate: spin}] }}
          source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
      />
      <View>
        <Text>Hello</Text>
      </View>
       <Animated.View
          style={{
            height: 50,
            width: 100,
            top: 0,
            backgroundColor: 'red',
            justifyContent: "flex-end",
            flexDirection: "column",
            transform: [{ translateX: headMov }]
          }}
        ></Animated.View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;

// AppRegistry.registerComponent('animations', () => animations);
