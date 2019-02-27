import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import uuidv4 from 'uuid/v4';
import { newTimer } from './src/utils/TimerUtils';

import EditableTimer from './src/components/EditableTimer';
import ToggleableTimerForm from './src/components/ToggleableTimerForm';

export default class App extends React.Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House chores',
        id: uuidv4(),
        elapsed: 8986300,
        isRunning: true
      },
      {
        title: 'Bake squash',
        project: 'Kitchen chores',
        id: uuidv4(),
        elapsed: 3890985,
        isRunning: false
      }
    ]
  }

  handleCreateFormSubmit = (timer) => {
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers]
    });
  }

  render() {
    let timers = this.state.timers.map(({ title, project, id, elapsed, isRunning }) => {
      return (
        <EditableTimer
          key={id}
          id={id}
          title={title}
          project={project}
          elapsed={elapsed}
          isRunning={isRunning}
        />
      );
    });

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
          {timers}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timerList: {
    paddingBottom: 15
  }
});
