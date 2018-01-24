import actions from 'api/actions';

export default (user = {}, action) => {
  switch (action.type) {
    case actions.LOGIN_USER_SUCCESSFUL:
      return action.payload;
      break;
  }

  return user;
}