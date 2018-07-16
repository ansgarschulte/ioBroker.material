import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import AddIcon from 'react-icons/lib/md/add';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    line: {
        width: 'calc(100% - 6px)',
        display: 'flow-root'
    },
    inputLine: {
        width: 'calc(100% - 6px)',
    },
    label: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.54)'
    },
    chips: {
        width: 'calc(100% - 110px)'
    },
    input: {
        width: 'calc(100% - 48px)',
    },
    button: {
        marginLeft: 8
    },
    icon: {
        height: 20,
        marginRight: 10
    }
});

class ChipsControl extends Component {
    static propTypes = {
        classes:        PropTypes.object.isRequired,
        label:          PropTypes.string.isRequired,
        value:          PropTypes.object.isRequired,
        onChange:       PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.type = this.props.type || (typeof this.props.value === 'number' ? 'number' : 'text');
        let chips = (this.props.value || '').split(/[,;]/).map(word => word.trim());
        this.state = {
            chips: chips,
            add: ''
        }
    }

    onAdd() {
        const chips = JSON.parse(JSON.stringify(this.state.chips));
        chips.push(this.state.add);
        chips.sort();
        this.setState({chips, add: ''});
        this.props.onChange(chips.join(','));
    }
    onKeyDown(e) {
        if (e.keyCode === 13 || e.keyCode === 9) {
            this.onAdd();
        }
    }
    handleDelete(word) {
        const chips = JSON.parse(JSON.stringify(this.state.chips));
        chips.splice(chips.indexOf(word), 1);
        this.setState({chips});
        this.props.onChange && this.props.onChange(chips.join(','));
    }

    render() {
        const {classes, label} = this.props;

        return (
            <div className={classes.line}>
                <div className={classes.label}>{label}</div>
                <div className={classes.chips}>
                    {
                        this.state.chips.map(word => (<Chip
                            key={word}
                            label={word}
                            onDelete={() => this.handleDelete(word)}
                            className={classes.chip}
                        />))
                    }
                </div>
                <div className={classes.inputLine}>
                    <TextField
                        tabIndex="0"
                        className={classes.input}
                        type={this.type}
                        label={this.props.textAdd || 'Add word'}
                        value={this.state.add}
                        onKeyDown={this.onKeyDown.bind(this)}
                        onChange={event => this.setState({add: event.target.value})}
                        margin="normal"
                    />
                    <Button variant="fab" mini disabled={!this.state.add}
                            color="secondary"
                            onClick={this.onAdd.bind(this)}
                            aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ChipsControl);