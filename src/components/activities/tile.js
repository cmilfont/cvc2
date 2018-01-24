import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { GridListTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import AddIcon from 'material-ui-icons/Add';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography/Typography';
import { TimePicker, DatePicker } from 'material-ui-pickers'
import uuid from 'uuid';
import classNames from 'classnames';
import moment from 'moment';

import actions from 'api/actions';

const styles = theme => ({
  tileSubtitle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: theme.spacing.unit,
    position: 'absolute',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
  },
  subtitleWrap: {
    margin: theme.spacing.unit,
  },
  infoButton: {
    float: 'right',
    color: 'rgba(255, 255, 255, 0.54)',
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
  },
  chipsWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  chipOn: {
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.grey[400],
  },
  inputWrapper: {
    display: 'flex',
    marginTop: theme.spacing.unit,
    flexDirection: 'row',
    '& > :not(:first-child)': {
      marginLeft: theme.spacing.unit,
    },
  },
  input: {
    color: 'white',
    height: theme.spacing.unit * 4,
    alignItems: 'center',
    '& > div': {
      color: 'white',
    },
  },
  picker: {
    flex: '1 auto',
    '& > div': { // Picker Input
      color: 'white',
      '& > div > button': { // Picker Icon
        color: 'inherit',
      },
    },
  },
});

class Tile extends React.Component {

  state = {
    descriptionText: '',
    loggedAt: moment(),
  }

  descriptionHasTag = (tag) => this.state.descriptionText.indexOf(tag) >= 0;

  toggleDescriptionText = (tagText) => {
    const { descriptionText } = this.state;
    const newDescription = descriptionText.indexOf(tagText) < 0
    ? descriptionText.concat(` ${tagText}`)
    : descriptionText.replace(tagText, '');

    this.setState({
      descriptionText: newDescription.split(" ").filter(tag => tag.length).join(" ")
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({descriptionText: event.target.value});
  }

  handleDateChange = (date) => {
    const { loggedAt } = this.state;
    loggedAt.set({
      year:   date.get('year'),
      month: date.get('month'),
      day: date.get('day'),
    });
    this.setState({loggedAt: moment(loggedAt)});
  }

  handleTimeChange = (time) => {
    const { loggedAt } = this.state;
    loggedAt.set({
      hour:   time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second'),
    });
    this.setState({loggedAt: moment(loggedAt)});
  }

  save = () => {
    const activity = this.state;
    const { kind, createActivity } = this.props;
    createActivity(
      {
        description: activity.descriptionText,
        loggedAt: activity.loggedAt,
        kind,
      }
    );
  }

  render() {
    const { descriptionText, loggedAt } = this.state;    
    const {
      classes,
      description,
      tags,
      style,
    } = this.props;

    return (
      <GridListTile style={style}>
        <div className={classes.tileSubtitle}>
          <div className={classes.subtitleWrap}>
            <Typography type="subheading" color="inherit">
              {description}              
              <IconButton
                color="contrast"
                aria-label="add"
                className={classes.infoButton}
              >
                <AddIcon onClick={this.save} />
              </IconButton>
            </Typography>
            <div className={classes.chipsWrapper}>
              {tags
                .split(' ')
                .filter(tag => tag.length > 0)
                .map(tag => (
                  <Chip
                    key={uuid()}
                    className={classNames(
                      classes.chip,
                      this.descriptionHasTag(tag) && classes.chipOn
                    )}
                    label={tag}
                    onClick={() => this.toggleDescriptionText(tag)}
                  />
                ))
              }
            </div>
            <div className={classes.inputWrapper}>
              <Input
                className={classes.input}
                placeholder="Descrição"
                fullWidth
                value={descriptionText}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className={classes.inputWrapper}>
              <DatePicker
                className={classes.picker}
                placeholder="31/12/2018"
                clearable
                keyboard
                format="DD/MM/YYYY"
                value={loggedAt}
                onChange={this.handleDateChange}
              />
              <TimePicker
                className={classes.picker}
                keyboard
                mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                placeholder="08:00 AM"
                value={loggedAt}
                onChange={this.handleTimeChange}
              />
            </div>
          </div>
        </div>
      </GridListTile>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createActivity: (payload) => dispatch({
    type: actions.CREATE_ACTIVITY,
    payload,
  }),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(Tile));
