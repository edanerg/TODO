import React, { Component } from 'react';
import { getTasks, addTask, deleteAllTasks, toggleTaskType } from '../actions/taskActions';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { logIn } from '../actions/userActions';
import PropTypes from 'prop-types';
import { clientId } from '../config';
import './userCard.css';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardHeader
} from 'reactstrap';

class UserCard extends Component {
    static propTypes = {
        addTask: PropTypes.func.isRequired,
        getTasks: PropTypes.func.isRequired,
        deleteAllTasks: PropTypes.func.isRequired,
        toggleTaskType: PropTypes.func.isRequired,
        currentUser: PropTypes.object,
        taskType: PropTypes.string.isRequired,
        logIn: PropTypes.func.isRequired
    }

    onAddTask = () => {
        const newTask = {
            title: "",
            description: ""
        }
        this.props.addTask(newTask);
        window.scrollTo(0, 0);
    }

    onDeleteAllTasks = () => {
        this.props.deleteAllTasks();
    }

    onToggleVisibility = () => {
        this.props.toggleTaskType();
    }

    onGoogleLogInSuccess = response => {
        this.props.logIn(response);
        this.props.getTasks();
    }

    onGoogleLogInFail = response => {
        console.log('err', response);
    }

    render() {
        return (
            <div className="user-card-container">
                {this.props.currentUser ?
                    (<Card className="user-card">
                        <CardHeader className="user-card-header">
                            <CardImg className="user-card-img" src={this.props.currentUser.profileObj.imageUrl}></CardImg>
                            <span className="user-card-name">{this.props.currentUser.profileObj.name}</span>
                        </CardHeader>
                        <CardBody>
                            <div className="user-card-body">
                                <Button color="info" onClick={this.onAddTask} style={{marginTop: "10px"}}>Add Task</Button>
                                <Button color="info" onClick={this.onDeleteAllTasks} style={{marginTop: "10px"}}>Delete All</Button>
                                <Button color="info" onClick={this.onToggleVisibility} style={{marginTop: "10px"}}>
                                    {this.props.taskType === 'onGoing' ? 'Completed Tasks' : 'Ongoing Tasks'}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>) :
                    (<Card className="log-in-container">
                        <CardBody className="log-in-body">
                            <span style={{marginBottom: "20px", fontSize: "25px"}}>Hello, welcome to TODOS</span>
                            <span style={{marginBottom: "30px", color: "grey"}}>Log in to get started</span>
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Log in with Google"
                                onSuccess={this.onGoogleLogInSuccess}
                                onFailure={this.onGoogleLogInFail}
                                cookiePolicy={'single_host_origin'}
                            />
                        </CardBody>
                    </Card>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.userStates.currentUser,
    taskType: state.taskStates.taskType
})

export default connect(mapStateToProps, {addTask, getTasks, deleteAllTasks, toggleTaskType, logIn})(UserCard);