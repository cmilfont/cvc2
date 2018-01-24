import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import { TimePicker } from 'material-ui-pickers'
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import red from 'material-ui/colors/red';
import blue from 'material-ui/colors/blue';
import ismobile from 'ismobilejs';
import moment from 'moment';

import actions from 'api/actions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#607d8b',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    '& a': {
      color: blue[500],
    }
  },
  column: {
    flexBasis: '33.3%',
    display: 'flex',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary[500],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    backgroundColor: red[900],
  },
  bar: {
    height: '100%',
    width: 10,
    marginRight: 5,
  },
  kind: {
    marginRight: 5,
  }
});

class Activity extends React.Component {

  pattern = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig

  replaceStringToURL = url => (`<a target="_blank" href="${url}">${url}</a>`)

  transformLink = description => {
    return description && description.replace(this.pattern, this.replaceStringToURL);
  }

  handleTimeChange = (date) => {
    this.props.onChange({loggedAt: date.format()});
  }

  handleDescriptionChange = (event) => {
    const description = event.target.value;
    this.props.onChange({description});
  }

  save = () => {
    const { id, description, loggedAt } = this.props.activityForm;
    this.props.saveEditActivity({ id, description, loggedAt });
  }

  textShortenerWhenMobile = (text, length) => (
    ismobile.phone && text.length > length
    ? `${text.substring(0, length)}...`
    : text
  );

  render() {
    const {
      activityForm: { description, loggedAt },
      kind,
      classes,
    } = this.props;
    const shortDescription = this.textShortenerWhenMobile(description, 20);
    const formattedDescription = this.transformLink(description);
    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <div className={classes.bar} style={{backgroundColor: kind.color}} />
              <TimePicker
                value={loggedAt}
                onChange={this.handleTimeChange}
              />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {shortDescription}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography type="title" className={classes.kind}>
            {kind.description}
          </Typography>
          <Input
            type="caption"
            value={formattedDescription}
            onChange={this.handleDescriptionChange}
          />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            raised
            dense
            color="accent"
            className={classes.button}
            onClick={this.props.cancelEditActivity}
          >
            CANCEL
          </Button>
          <Button
            raised
            dense
            color="accent"
            onClick={this.save}
          >
            SAVE
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

const mapStateToProps = state => ({
  activityForm: state.get('activity'),
});

const mapDispatchToProps = dispatch => ({
  saveEditActivity: payload => {
    dispatch({
      type: actions.SAVE_EDIT_ACTIVITY,
      payload,
    })
    dispatch({
      type: actions.UPDATE_ACTIVITY,
      payload,
    })
  },
  cancelEditActivity: payload => dispatch({
    type: actions.CANCEL_EDIT_ACTIVITY,
    payload,
  }),
  onChange: payload => dispatch({
    type: actions.UPDATED_ACTIVITY_FORM,
    payload,
  }),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Activity));