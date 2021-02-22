import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { getRepLogs, deleteRepLogs, createRepLogs } from '../api/rep_log_api';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: '',
        };

        this.successMessageTimeoutHandle = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                })
            });
    }

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId})
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
        }

        this.setState({
            isSavingNewRepLog: true,
        })

        const newState = {
            isSavingNewRepLog: false,
        }

        createRepLogs(newRep)
            .then((repLog) => {
                 this.setState((prevState) => {
                     const newRepLogs = [...prevState.repLogs, repLog];

                     return {
                         ...newState,
                         repLogs: newRepLogs,
                         newRepLogValidationErrorMessage: ''
                     };

                     // return {
                     //     repLogs: newRepLogs,
                     //     isSavingNewRepLog: false,
                     //     newRepLogValidationErrorMessage: ''
                     // };
                 })

                this.setSuccessMessage('Rep Log Saved!')
            })
            .catch(error => {
                error.response.json()
                    .then(errorsData => {
                        const errors = errorsData.errors;
                        const firstError = errors[Object.keys(errors)[0]];

                        this.setState(Object.assign({
                            newRepLogValidationErrorMessage: firstError,
                            isSavingNewRepLog: false,
                        }, newState));
                    });
            });
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        })

        clearTimeout(this.successMessageHandle);
        this.successMessageHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            })

            this.successMessageHandle = 0;
        }, 3000);
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        })
    }

    handleDeleteRepLog(id) {
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id){
                        return repLog;
                    }

                    return Object.assign({},repLog,{isDeleting: true})
                })
            }
        })

        deleteRepLogs(id)
            .then(() => {
                this.setState((prevState) => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    };
                })

                this.setSuccessMessage('Item was Un-lifted!');
            });

        // this.setState((prevState) => {
        //     return {
        //         repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
        //     };
        // })
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                handleAddRepLog={this.handleAddRepLog}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        )
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
    itemOptions: PropTypes.array,
}

RepLogApp.defaultProps = {
    itemOptions: []
}