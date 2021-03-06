import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import Heatmap from '../Figures/Novel/HeatMap';
import Spiral from '../Figures/Novel/Spiral';
import CustomStackedBar from '../Figures/Novel/CustomStackedBar';

import Bar from '../Figures/Conventional/Bar';
import Line from '../Figures/Conventional/Line';
import StackedArea from '../Figures/Conventional/StackedArea';

import Questionnaire from '../Questionnaire';
import SurveyHeader from '../SurveyHeader';
import questionnaireQuestions from '../../../res/survey_info';
import { descriptions } from '../../../res/figures_description';

class FiguresScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    chartNumber: 0,
    startTime: Math.floor(Date.now() / 1000), // Unix timestamp.
  };
  nextChart = () => {
    this.setState({
      chartNumber: this.state.chartNumber + 1,
      startTime: Math.floor(Date.now() / 1000),
    });
  };
  render() {
    // console.log(this.props.navigation)
    let figures = {};
    if (global.isNovel == true)
      figures = {
        heatmap: <Heatmap />,
        spiral: <Spiral />,
        stackedBar: <CustomStackedBar />,
      };
    else if (global.isNovel == false)
      figures = {
        stackedArea: <StackedArea />,
        bar: <Bar />,
        line: <Line />,
      };
    else
      this.props.navigation.navigate('Empty');

    const figuresNames = Object.keys(figures);
    const surveys = [];
    for (let s = 0; s < figuresNames.length; s++) {
      surveys.push(
        <Questionnaire
          key={s}
          chartName={figuresNames[s]}
          surveyQs={[...questionnaireQuestions.figsQs, ...questionnaireQuestions[figuresNames[s] + 'Qs']]}
          nextDestination={s == figuresNames.length - 1 ? 'Thanks' : ''}
          navigation={s == figuresNames.length - 1 ? this.props.navigation : {}}
          chartNumber={this.state.chartNumber}
          nextChart={this.nextChart}
          startTime={this.state.startTime}
        />,
      );
    }
    return (
      <>
        <SurveyHeader style={styles.header} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {figures[figuresNames[this.state.chartNumber]]}
          </View>
          <Text style={styles.tip}>
            Tip: {descriptions[figuresNames[this.state.chartNumber]]}
          </Text>
          <View style={styles.surveyContainer}>
            {surveys[this.state.chartNumber]}
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
  },
  container: {
    flex: 1.2,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginTop: 15,
  },
  plotBody: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    height: '50%',
  },
  surveyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  tip: {
    fontSize: 12,
    marginLeft: 20,
    marginRight: 15,
    marginTop: 10,
  }
});

export default FiguresScreen;
