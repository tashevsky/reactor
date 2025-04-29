import React from 'react';
import { Typography, Box } from '@mui/material';
import FeedbackList from './FeedbackList';
import { useGetFeedbacksQuery, useBlockFeedbackMutation, useDeleteFeedbackMutation } from '../../../services/api';

const MainPage = () => {
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

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1">
        This is the main page.
      </Typography>
      {isFeedbacksLoading && <div>Loading...</div>}
      {feedbacksError && <div>Error: {feedbacksError.message}</div>}
      {!isFeedbacksLoading && !feedbacksError && (
        <FeedbackList
          feedbacks={feedbacks || []}
          onDeleteFeedback={handleDeleteFeedback}
          onBlockFeedback={handleBlockFeedback}
        />
      )}
    </Box>
  );
};

export default MainPage;