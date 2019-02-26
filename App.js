import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';

export default class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {},
    activity: {}
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _normal = () => {
    Accelerometer.setUpdateInterval(100); 
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {

    let sum = 0;
    let avg = 0;

    if(data_table.length == row_limit)
      data_table.splice(0, 1);

    data_table.push(new DataRow(this.state.accelerometerData));

    for(let i = 0; i < data_table.length; i++)
    {
      sum += data_table[i].acceleration.total;
    }

    avg = sum / data_table.length;

    if(avg < rest.max)
      this.state.activity = rest;

    if(avg > walk.min && avg < walk.max)
      this.state.activity = walk;
      
    if(avg > run.min)
      this.state.activity = run;
      
    return (
      <View style={{backgroundColor: this.state.activity.color, flex: 1}}>
        <View style={styles.sensor}>

          <Text>Acceleration: {avg}</Text>              

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._normal} style={[styles.button]}>
              <Text>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._fast} style={styles.button}>
              <Text>Fast</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.centerText}>{this.state.activity.text}</Text>
        </View>
      </View>
    );
  }
}

const row_limit = 20;

const rest = {
  max: 1.025,
  color: "red",
  text: "Resting"
}

const walk = {
  min: 1.025,
  max: 1.15,
  color: "orange",
  text: "Walking"
}

const run = {
  min: 1.15,
  color: "green",
  text: "Running"
}

let data_table = [];

function DataRow(accelerationData)
{
  this.acceleration = {
    x: accelerationData.x,
    y: accelerationData.y,
    z: accelerationData.z,
    total: Math.sqrt( (accelerationData.x*accelerationData.x)+
                      (accelerationData.y*accelerationData.y)+
                      (accelerationData.z*accelerationData.z))
  }
  
  if(this.acceleration.total < 1)
    this.acceleration.total = 1;
}

acceleration = {
  x: 0,
  y: 0,
  z: 0,
  total: 0
}

previous_acceleration = {
  x: 0,
  y: 0,
  z: 0,
  total: 0
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  centerText: {
    textAlign: 'center',
    fontSize: 100
  }
});