import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { deleteTask, editTask } from '../actions/taskActions';
import TextareaAutosize from 'react-autosize-textarea';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './task.css';


class Task extends Component {
    static propTypes = {
        deleteTask: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        task: PropTypes.object.isRequired
    }

    state = {
        expand: false,
        task: {
            titleDraft: this.props.task.title,
            descriptionDraft: this.props.task.description,
            completed: this.props.task.completed
        }
    }

    onDeleteTask = id => {
        this.props.deleteTask(id);
    }

    onSaveTitleDraft = event => {
        this.setState({
            task: {
                ...this.state.task,
                titleDraft: event.target.value
            }
        })
    }
    
    onSaveDescriptionDraft = event => {
        this.setState({
            task: {
                ...this.state.task,
                descriptionDraft: event.target.value
            }
        })
    }

    onSaveTitleDraft = event => {
        this.setState({
            task: {
                ...this.state.task,
                titleDraft: event.target.value
            }
        })
    }

    onEditTask = (task, id) => {
        const newTask = {
            title: task.titleDraft,
            description: task.descriptionDraft 
        }
        this.props.editTask(newTask, id);
        this.setState({
            expand: false
        })
    }

    onCollapse = () => {
        this.setState({
            expand: false
        })
    }

    onExpand = () => {
        this.setState({
            expand: true
        })
    }

    onCompleteTask = task => {
        const newTask = {
            title: task.title,
            description: task.draft,
            completed: true
        }
        this.props.editTask(newTask, task._id)
        this.setState({
            task: {
                ...this.state.task,
                completed: true
            }
        })
    }

    render() {
        return (
            <div className="task-container">
                    <div className="preview-container">
                        {!this.state.task.completed ? <input type="checkbox" className="right-margin" onChange={this.onCompleteTask.bind(this, this.props.task)}/> : null}
                        <div className="textarea-div" onClick={this.onExpand}>
                            <TextareaAutosize
                            className="title-input"
                            style={{cursor: this.state.expand ? "" : "pointer"}}
                            defaultValue={this.state.task.titleDraft}
                            placeholder="Task Name"
                            onChange={this.onSaveTitleDraft}
                            readOnly={!this.state.expand}
                            >
                            </TextareaAutosize>
                        </div>
                        <Button close onClick={this.onDeleteTask.bind(this, this.props.task._id)}/>
                    </div>
                    { this.state.expand ? 
                        <TextareaAutosize 
                        className="title-input description-input"
                        placeholder="Task Description"
                        defaultValue={this.state.task.descriptionDraft}
                        onChange={this.onSaveDescriptionDraft.bind(this)}>
                        </TextareaAutosize>
                        : null
                    }
                    { this.state.expand ? 
                        <div className="button-container">
                            <Button color="danger" onClick={this.onEditTask.bind(this, this.state.task, this.props.task._id)} className="right-margin">save</Button>
                            <Button color="warning" onClick={this.onCollapse}>collapse</Button>
                        </div>
                        : null
                    }
            </div>
        );
    }
}

export default connect(null, { editTask, deleteTask })(Task);