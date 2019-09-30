import React from 'react';
import {View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import CONSTANTS from '../../res/constants';

const data = [
  50,
  10,
  40,
  95,
  -4,
  -24,
  85,
  91,
  35,
  53,
  -53,
  24,
  50,
  -20,
  -80,
  100,
  10,
];

const axesSvg = {fontSize: 10, fill: 'grey'};
const verticalContentInset = {top: 10, bottom: 10};
const xAxisHeight = 30;

import {Text} from 'react-native';
class Plot extends React.Component {
  render() {
    return (
      <View style={{flex: 1, padding: 20, flexDirection: 'row'}}>
        <YAxis
          data={CONSTANTS.data}
          style={{marginBottom: xAxisHeight}}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1}}
            data={CONSTANTS.data}
            contentInset={verticalContentInset}
            svg={{stroke: 'rgb(134, 65, 244)'}}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10, height: xAxisHeight}}
            data={data}
            formatLabel={(value, index) => index}
            contentInset={{left: 10, right: 10}}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}
export default Plot;
