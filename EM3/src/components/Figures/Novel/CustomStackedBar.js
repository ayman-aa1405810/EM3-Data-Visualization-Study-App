import React from 'react';
import {
  StackedBarChart,
  StackedAreaChart,
  YAxis,
  XAxis,
} from 'react-native-svg-charts';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  YellowBox,
  Dimensions,
} from 'react-native';
import ListItem from './ListItem';
import { Text, Svg } from 'react-native-svg';
import * as scale from 'd3-scale';
import { Icon } from 'react-native-elements';
import * as data from '../../../../res/energy_data';
import Legends from './Legends';

// TODO needs to be removed later
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation']);

const spacingInner = 0.5;
const spacingOuter = 0.6;
const contentInset = { top: 20 };

const Labels = props => {
  const { x, y, data } = props;
  return data.map((value, index) => {
    let sum = 0;
    for (var key in value) {
      if (key !== 'date') {
        sum += value[key];
      }
    }
    const pX = x(index) + x.bandwidth() / 2;
    const pY = y(sum) - 10;
    return (
      <Text
        key={index}
        x={pX}
        y={pY}
        fontSize={13}
        fill="red"
        alignmentBaseline={'middle'}
        textAnchor={'middle'}>
        {sum.toString() + 'W'}
      </Text>
    );
  });
};

class CustomStackedBar extends React.Component {
  state = {
    appliance: data.lamp,
    selectedApplianceId: 'lamp',
  };
  onPress = id => {
    // console.warn(data[id]);
    this.setState({
      appliance: data[id],
      selectedApplianceId: id,
    });
    this.scrollViewRef.scrollTo({ x: 0, animated: false });
  };

  DATA = [
    {
      id: 'lamp',
      onPressAction: this.onPress,
      title: 'Lamp',
      imageName: 'lamp',
    },
    {
      id: 'boiler',
      onPressAction: this.onPress,
      title: 'Boiler',
      imageName: 'boiler',
    },
    {
      id: 'television',
      onPressAction: this.onPress,
      title: 'Television',
      imageName: 'television',
    },
    {
      id: 'fan',
      onPressAction: this.onPress,
      title: 'Fan',
      imageName: 'fan',
    },
    {
      id: 'gaming_console',
      onPressAction: this.onPress,
      title: 'Gaming Console',
      imageName: 'gaming_console',
    },
    {
      id: 'oven',
      onPressAction: this.onPress,
      title: 'Oven',
      imageName: 'oven',
    },
    {
      id: 'computer',
      onPressAction: this.onPress,
      title: 'Computer',
      imageName: 'computer',
    },
  ];

  render() {
    return (
      <>
        <View style={styles.stackedBarChartContainer}>
          <View style={styles.list}>
            <TouchableOpacity style={styles.caret}>
              <Icon
                name="caret-up"
                type="font-awesome"
                color="#000"
                size={15}
                onPress={() =>
                  this.flatListRef.scrollToIndex({
                    index: 0,
                    animated: true,
                  })
                }
              />
            </TouchableOpacity>
            <FlatList
              ref={ref => {
                this.flatListRef = ref;
              }}
              style={styles.appliancesList}
              data={this.DATA}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ListItem
                  style={styles.listItem}
                  id={item.id}
                  title={item.title}
                  type={item.type}
                  imageName={item.imageName}
                  selectedKey={this.state.selectedApplianceId}
                  onPressAction={item.onPressAction}
                />
              )}
            />
            <TouchableOpacity style={styles.caret}>
              <Icon
                name="caret-down"
                type="font-awesome"
                color="#000"
                size={15}
                onPress={() =>
                  this.flatListRef.scrollToIndex({
                    index: this.DATA.length - 1,
                    animated: true,
                  })
                }
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            persistentScrollbar={true}
            horizontal={true}
            ref={ref => {
              this.scrollViewRef = ref;
            }}>
            <View style={styles.chart}>
              <StackedBarChart
                style={{
                  flex: 1,
                  width: 100 * this.state.appliance.expenseData.length,
                }}
                keys={this.state.appliance.keys}
                colors={this.state.appliance.colors}
                data={this.state.appliance.expenseData}
                spacingInner={spacingInner}
                spacingOuter={spacingOuter}
                contentInset={contentInset}>
                <Labels />
              </StackedBarChart>
              <YAxis
                style={{ position: 'absolute', left: -10, top: 0, bottom: 0 }}
                data={StackedAreaChart.extractDataPoints(
                  this.state.appliance.expenseData,
                  this.state.appliance.keys,
                )}
                contentInset={{ top: 20, bottom: 15 }}
                spacingInner={spacingInner}
                spacingOuter={spacingOuter}
                svg={{
                  fontSize: 10,
                  fill: 'black',
                  stroke: 'black',
                  strokeWidth: 0.1,
                  alignmentBaseline: 'baseline',
                  baselineShift: '3',
                }}
              />
              <XAxis
                style={{
                  marginTop: 3,
                  width: 100 * this.state.appliance.expenseData.length,
                }}
                data={this.state.appliance.expenseData}
                formatLabel={(value, index) =>
                  this.state.appliance.expenseData[index].date.format('HH:mm')
                }
                scale={scale.scaleBand}
                spacingInner={spacingInner}
                spacingOuter={spacingOuter}
                contentInset={contentInset}
                svg={{
                  fontSize: 13,
                  fill: 'black',
                }}
              />
              {/* <XAxis
              style={{ width: 100 * this.state.appliance.expenseData.length }}
              data={this.state.appliance.expenseData}
              formatLabel={(value, index) =>
                this.state.appliance.expenseData[index].date.format('D/M')
              }
              scale={scale.scaleBand}
              spacingInner={spacingInner}
              spacingOuter={spacingOuter}
              contentInset={contentInset}
              svg={{
                fontSize: 13,
                fill: 'black',
              }}
            /> */}
              {/* XAxis Label */}
            </View>
          </ScrollView>
          <View styles={styles.legendsContainer}>
            <Legends data={data[this.state.selectedApplianceId]} />
          </View>
        </View>
        <Svg
          key={'xlabelTitle'}
          height={25}
          width={Dimensions.get('window').width}>
          <Text
            fill="black"
            stroke="black"
            fontSize="15"
            fontWeight="lighter"
            x={Dimensions.get('window').width/1.7}
            y={20}
            textAnchor="middle">
            {this.state.appliance.expenseData[0].date.format('MMM Do YYYY')}
          </Text>
        </Svg>
      </>
    );
  }
}

const styles = StyleSheet.create({
  stackedBarChartContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 350,
  },
  caret: {
    height: 14,
    borderWidth: 0.5,
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    height: '95%',
    //   borderColor: '#000',
    //   borderWidth: 0.5,
  },
  listItem: {
    fontSize: 10,
  },
  chart: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    width: '70%',
  },
  legendsContainer: {
    fontSize: 50,
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default CustomStackedBar;
