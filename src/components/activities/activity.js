import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
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

  remove = () => {
    const { id } = this.props;
    this.props.removeActivity({id});
  }

  edit = () => {
    const {
      id,
      description,
      loggedAt,
    } = this.props;
    this.props.editActivity({id, description, loggedAt});
  }

  textShortenerWhenMobile = (text, length) => (
    ismobile.phone && text && text.length > length
    ? `${text.substring(0, length)}...`
    : text
  );

  render() {
    const {
      kind,
      description,
      loggedAt,
      classes,
    } = this.props;
    const shortDescription = this.textShortenerWhenMobile(description, 20);
    const formattedDescription = this.transformLink(description);
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <div
              className={classes.bar}
              style={{
                backgroundColor: kind.color
              }}
            />
            <Typography className={classes.heading}>
              {moment(loggedAt).format('LT')}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{shortDescription}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography type="title" className={classes.kind}>
            {kind.description}
          </Typography>
          <Typography type="caption">
            <div
              dangerouslySetInnerHTML={{__html: formattedDescription}}
            />
          </Typography>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            raised
            dense
            color="accent"
            className={classes.button}
            onClick={this.remove}
          >
            REMOVE
          </Button>
          <Button
            raised
            dense
            color="accent"
            onClick={this.edit}
          >
            EDIT
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editActivity: payload => dispatch({
    type: actions.START_EDIT_ACTIVITY,
    payload,
  }),
  removeActivity: payload => dispatch({
    type: actions.REMOVE_ACTIVITY,
    payload,
  }),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(Activity));