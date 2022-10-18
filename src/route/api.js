import express from "express";
import userController from "../controller/userController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get("/users", userController.getAllUsers); // method GET => READ data
    router.post("/create-user", userController.createNewUser);
    router.put("/update-user", userController.updateUser);
    router.delete("/delete-user/:id", userController.deleteUser);
    // login
    router.post("/login", userController.handleLogin);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
