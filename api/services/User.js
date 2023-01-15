module.exports = {
    isAdmin: async (models, user) => {
        return await models.User.findById(user.id)?.role === 'admin';
    },
    isManager: async (models, user) => {
        // Check if user is manager or admin and return true if so
        const role = await models.User.findById(user.id)?.role;
        return role === 'manager' || role === 'admin';
    },
    isAuthenticated: (user) => {
        return user;
    },
};