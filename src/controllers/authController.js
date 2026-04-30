const register = async (req, res) => {
    res.json({ message: 'register route works' });
};

const login = async (req, res) => {
    res.json({ message: 'login' });
};

export { register, login };