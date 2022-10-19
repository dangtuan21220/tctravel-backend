import userService from "./../services/userService";

let getAll = async (req, res) => {
    const user = await userService.getAllUser();
    return res.status(200).json({
        message: "ok",
        data: user,
    });
};

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        });
    }
    let message = await userService.handleUserLogin(email, password);
    return res.status(200).json(message);
};

let handleRegister = async (req, res) => {
    let data = req.body;
    const message = await userService.handleUserRegister(data);
    return res.status(200).json(message);
};

module.exports = {
    getAll,
    handleLogin,
    handleRegister,
};
