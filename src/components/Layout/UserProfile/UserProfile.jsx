import ProfileEditForm from "./ProfileEditForm";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../redux/actions';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.app.user);

    const handleProfileEditSubmit = (values, { setSubmitting }) => {
        if (user) {
            dispatch(updateUserProfile(user.id, { email: values.email, password: user.password, role: user.role,  isBlocked: user.isBlocked}));
        }
        setSubmitting(false);
    };

    return (
        <>
            <ProfileEditForm initialValues={{ email: user?.email || '' }} onSubmit={handleProfileEditSubmit} />
        </>
    );
}

export default UserProfile;