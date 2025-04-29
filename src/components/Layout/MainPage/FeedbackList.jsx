import React from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { useSelector } from 'react-redux';

const FeedbackList = ({ feedbacks, onDeleteFeedback, onBlockFeedback }) => {
  const user = useSelector((state) => state.app.user);

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      {feedbacks.length === 0 ? (
        <p>There are no feedback yet</p>
      ) : (
        <List>
          {feedbacks.map((feedback) => (
            !(feedback.isBlocked === true && user?.role === "user") && (
            <ListItem
              key={feedback.id}
              secondaryAction={
                user?.role === "admin" && (
                  <>
                    <IconButton edge="end" onClick={() => onDeleteFeedback(feedback.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => onBlockFeedback(feedback.id, !feedback.isBlocked)}>
                      <BlockIcon />
                    </IconButton>
                  </>
                )
              }
              sx={{ border: '1px solid #ccc', borderRadius: 1, mb: 1 }}
            >
              <ListItemText
                primary={user?.role === "admin" && (`ID: ${feedback.id}`)}
                secondary={
                  <>
                    <strong>Name:</strong> {feedback.name}
                    <br />
                    <strong>Message:</strong> {feedback.message}
                    {user?.role === "admin" && (
                      <>
                        <br/>
                        <strong>Blocked:</strong> {feedback.isBlocked === true ? "Yes" : "No"}
                      </>
                    )}
                  </>
                }
              />
            </ListItem>
            )
          ))}
        </List>
      )}
    </Box>
  );
};

export default FeedbackList;