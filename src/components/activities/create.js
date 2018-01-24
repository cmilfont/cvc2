import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import GridList from 'material-ui/GridList';
import uuid from 'uuid';
import ismobile from 'ismobilejs';
import Tile from './tile';
import actions from 'api/actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class Create extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  render() {
    const { kinds, classes } = this.props;
    const numberCols = ismobile.phone ? 1 : 2;
    const list = kinds.map(kind => (
      <Tile
        key={uuid()}
        style={{
          backgroundColor: kind.color
        }}
        color={kind.color}
        description={kind.description}
        tags={kind.tags}
        kind={kind}
      />
    ));
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} cols={numberCols} className={classes.gridList}>
          {list}
        </GridList>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  kinds: state.get('kinds'),
});

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch({
        type: actions.FETCH_KINDS
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Create));