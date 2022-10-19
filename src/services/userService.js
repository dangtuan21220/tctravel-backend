import pool from "./../configs/connectDB";
import bcrypt from "bcryptjs";

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        const [rows] = await pool.execute("SELECT * FROM `users`");
        resolve(rows);
        try {
        } catch (error) {
            reject(error);
        }
    });
};

const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows] = await pool.execute(
                "SELECT * FROM `users` where email = ?",
                [email]
            );
            if (rows.length > 0) {
                resolve(true);
            }
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(email);
            const [rows] = await pool.execute(
                "SELECT * FROM `users` where email = ?",
                [email]
            );
            if (isExist) {
                let checkPassword = await bcrypt.compareSync(
                    password,
                    rows[0].password
                );
                if (checkPassword) {
                    const user = rows[0];
                    delete user.password;
                    resolve({
                        errCode: 0,
                        message: "OK",
                        token: "a1b2c3",
                        data: user,
                    });
                } else {
                    resolve({
                        errCode: 1,
                        message: "Wrong password",
                    });
                }
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const handleUserRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Email already exists",
                });
            } else {
                let hashPasswordBcrypt = await hashUserPassword(data.password);
                let { firstName, lastName, email, address, phone, gender } =
                    data;
                await pool.execute(
                    "insert into users (firstName, lastName, email, address, phone, gender, password) values (?, ?, ? ,?, ?, ?, ?)",
                    [
                        firstName,
                        lastName,
                        email,
                        address,
                        phone,
                        gender,
                        hashPasswordBcrypt,
                    ]
                );
                resolve({
                    errCode: 0,
                    message: "OK",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllUser,
    handleUserLogin,
    handleUserRegister,
};
