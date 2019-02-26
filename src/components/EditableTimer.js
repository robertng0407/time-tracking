import React, { Component } from 'react';

import Timer from './Timer';
import TimerForm from './TimerForm';

export default class EditableTimer extends Component {
    state = {
        editFormOpen: false
    }
    
    render() {
        const { id, title, project, elapsed, isRunning } = this.props;
        const { editFormOpen } = this.state;

        if (editFormOpen) {
            return <TimerForm 
                id={id} 
                title={title}
                project={project} />
        }

        return (
            <Timer
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRunning} />
        );
    }
}