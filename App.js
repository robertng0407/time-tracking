import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView
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

  componentDidMount() {
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          };
        })
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers]
    });
  }

  handleFormSubmit = attrs => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;

          return {
            ...timer,
            title,
            project
          };
        };

        return timer;
      })
    })
  }

  handleRemovePress = timerId => {
    const { timers } = this.state;

    this.setState({
      timers: timers.filter(t => t.id !== timerId)
    });
  }

  toggleTimer = timerId => {
    this.setState(prevState => {
      const { timers } = prevState;

      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer;

          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning
            };
          };

          return timer;
        })
      };
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
          onFormSubmit={this.handleFormSubmit}
          onRemovePress={this.handleRemovePress}
          onStartPress={this.toggleTimer}
          onStopPress={this.toggleTimer}
        />
      );
    });

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm
              onFormSubmit={this.handleCreateFormSubmit}
            />
            {timers}
          </ScrollView>
        </KeyboardAvoidingView>
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
  },
  timerListContainer: {
    flex: 1
  }
});
