import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";

const removeBgImage = async (req,res) => {
    try {
        
    } catch(error) {
        console.error("Error in removeBgImage controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}