import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import FeedbackList from '../MainPage/FeedbackList';
import UsersTable from './UsersTable';
import { useLoginState } from '../../../providers/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks } from '../../../redux/actions';
import { useGetFeedbacksQuery, useBlockFeedbackMutation, useDeleteFeedbackMutation } from '../../../services/api';

const AdminPage = () => {
  const {isLoggedIn} = useLoginState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  const { data: feedbacks, isLoading: isFeedbacksLoading, error: feedbacksError } = useGetFeedbacksQuery();
  const [blockFeedback] = useBlockFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  
  const handleDeleteFeedback = async (id) => {
    try {
      await deleteFeedback(id).unwrap();
    } catch (error) {
      console.error('Failed to delete feedback:', error);
    }
  };
    
  const handleBlockFeedback = async (id, isBlocked) => {
    try {
      await blockFeedback({ id, isBlocked }).unwrap();
    } catch (error) {
      console.error('Failed to block feedback:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFeedbacks());
    }
  }, [isLoggedIn, dispatch]);
  
  // 
  if (user?.role !== "admin") {
    return (
        <Typography>Access denied</Typography>
    );
  }

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Users Table
        <UsersTable/>
      </Typography>
      <Typography variant="h4" gutterBottom>
        Feedback List
      {isFeedbacksLoading && <div>Loading...</div>}
      {feedbacksError && <div>Error: {feedbacksError.message}</div>}
      {!isFeedbacksLoading && !feedbacksError && (
        <FeedbackList
          feedbacks={feedbacks || []}
          onDeleteFeedback={handleDeleteFeedback}
          onBlockFeedback={handleBlockFeedback}
        />
      )}
      </Typography>
    </Box>
  );
};

export default AdminPage;