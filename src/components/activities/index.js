import { connect } from 'react-redux';
import List from 'components/activities/list';

const mapStateToProps = state => ({
  activities: state.get('activities'),
});

export default connect(mapStateToProps)(List);