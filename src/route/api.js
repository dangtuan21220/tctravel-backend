import express from "express";
import APIController from "../controller/APIController";
import userController from "../controller/userController";


let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers); // method GET => READ data
  router.post("/create-user", APIController.createNewUser);
  router.put("/update-user", APIController.updateUser);
  router.delete("/delete-user/:id", APIController.deleteUser);
  // userController
  router.get("/getall", userController.getAll); 
  router.post("/login", userController.handleLogin); 
  router.post("/register", userController.handleRegister); 


  return app.use("/api/v1/", router);
};

export default initAPIRoute;
