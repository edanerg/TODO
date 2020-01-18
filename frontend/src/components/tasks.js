import React, { Component } from 'react';
import { ListGroup, Container, ListGroupItem } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTasks } from '../actions/taskActions';
import Task from './task';
import PropTypes from 'prop-types';
import './tasks.css';

class Tasks extends Component {
    static propTypes = {
        getTasks: PropTypes.func.isRequired,
        tasks: PropTypes.array.isRequired,
        taskType: PropTypes.string.isRequired,
        currentUser: PropTypes.object
    }

    render() {
        if (this.props.currentUser) {
            return(
                <div className="tasks-container">
                        <Container>
                            <ListGroup>
                                <TransitionGroup>
                                    {this.props.tasks
                                    .filter(task => ((this.props.taskType === 'onGoing' && !task.completed) || ((this.props.taskType === 'completed' && task.completed))))
                                    .map(task =>
                                        (<CSSTransition key={task._id} timeout={200} classNames="taskCSS">
                                            <div className="list-container">
                                                <ListGroupItem className="list-item">
                                                    <Task task={task}/>
                                                </ListGroupItem>
                                            </div>
                                        </CSSTransition>)
                                    )}
                                </TransitionGroup>
                            </ListGroup>
                        </Container>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.taskStates.tasks,
        taskType: state.taskStates.taskType,
        currentUser: state.userStates.currentUser
    }
}

export default connect(mapStateToProps, {getTasks})(Tasks);