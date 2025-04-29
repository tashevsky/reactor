export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_USER = 'SET_USER';
export const SET_FEEDBACKS = 'SET_FEEDBACKS';
export const ADD_FEEDBACK = 'ADD_FEEDBACK';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';
export const RESTORE_USER = 'RESTORE_USER';
export const DELETE_USER = 'DELETE_USER';
export const BLOCK_USER = 'BLOCK_USER';
export const BLOCK_FEEDBACK = 'BLOCK_FEEDBACK';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

const baseURL = "http://localhost:3001"

export const restoreUser = (user) => ({
  type: RESTORE_USER,
  payload: user,
});

export const registerUser = (userData) => async (dispatch) => {
  try {
    const {email, password} = userData;
    const response = await fetch(`${baseURL}/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, role: 'user', isBlocked: false}),
    });

    if (!response.ok) throw new Error('Sign up error');
    // const data = await response.json();
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const loginUser = (credentials, loginCallback) => async (dispatch) => {
  try {
    const response = await fetch(
      `${baseURL}/users?email=${credentials.email}&password=${credentials.password}&isBlocked=false`
    );
    console.log(`${baseURL}/users?email=${credentials.email}&password=${credentials.password}`);
    if (!response.ok) throw new Error('Login user error');

    const users = await response.json();
    if (users.length === 0) throw new Error('Incorrect email or password');

    const foundUser = users[0];
    dispatch({ type: SET_USER, payload: foundUser });
    localStorage.setItem('user', JSON.stringify(foundUser));
    loginCallback();
  } catch (error) {
    console.error('Log in error:', error.message);
  }
};

export const fetchFeedbacks = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/feedbacks`);
    if (!response.ok) throw new Error('Error loading feedbacks');

    const data = await response.json();
    dispatch({ type: SET_FEEDBACKS, payload: data });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const addFeedback = (feedback) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/feedbacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...feedback, isBlocked: false}),
    });

    if (!response.ok) throw new Error('Error adding feedback');
    const data = await response.json();
    dispatch({ type: ADD_FEEDBACK, payload: data });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const updateUserProfile = (id, userData) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error('Error updating profile');
    const updatedUser = await response.json();
    dispatch({ type: UPDATE_USER, payload: updatedUser });
    localStorage.setItem('user', JSON.stringify(updatedUser));
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/feedbacks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error deleting feedback');
    dispatch({ type: DELETE_FEEDBACK, payload: id });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting user');
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const blockUser = (id, isBlocked) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isBlocked),
    });
    if (!response.ok) throw new Error('Error blocking user');
    const updatedUser = await response.json();
    dispatch({ type: BLOCK_USER, payload: updatedUser });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

export const blockFeedback = (id, isBlocked) => async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/feedbacks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isBlocked),
    });
    if (!response.ok) throw new Error('Error blocking');
    const updatedFeedback = await response.json();
    dispatch({ type: BLOCK_FEEDBACK, payload: updatedFeedback });
  } catch (error) {
    console.error('Error:', error.message);
  }
};