module.exports = {
    isAdmin: async (models, user) => {
        const userObj = await models.User.findById(user.id);
        return userObj.role === 'admin';
    },
    isManager: async (models, user) => {
        // Check if user is manager or admin and return true if so
        const userObj = await models.User.findById(user.id);
        return userObj.role === 'manager' || userObj.role === 'admin';
    },
    isAuthenticated: (user) => {
        return user;
    },
};