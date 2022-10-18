import pool from "../configs/connectDB";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    checkUserEmail();
};
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [rows] = await pool.execute("SELECT * FROM `users`");
            console.log(rows);
            if (rows) {
                resolve(true);
            }
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin,
};
