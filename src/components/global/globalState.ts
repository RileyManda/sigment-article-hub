import { createGlobalSignal } from "sigment"

createGlobalSignal('userName', '');
createGlobalSignal('userMail', '');
createGlobalSignal('isAuthenticated', false);
createGlobalSignal('user', null);
createGlobalSignal('authToken', '');
createGlobalSignal('showLoginForm', false);

export const GlobalKeys = {
  userName: 'userName',
  userMail: 'userMail',
  isAuthenticated: 'isAuthenticated',
  user: 'user',
  authToken: 'authToken',
  showLoginForm: 'showLoginForm'
};