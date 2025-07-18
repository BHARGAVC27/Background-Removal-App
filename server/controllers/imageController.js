import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../models/userModel.js";

const removeBgImage = async (req,res) => {
    try {
        const {clerkId} = req.body;
        const user = await userModel.findOne({ clerkId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(user.creditBalance === 0) {
            return res.status(400).json({ error: "Insufficient credits" });
        }
        const imagePath = req.file.path;
        const imageFile = fs.createReadStream(imagePath);
        const formData = new FormData();

        formData.append("size", "auto");
        formData.append("image_file",imageFile);

        const {data} = await axios.post("https://api.remove.bg/v1.0/removebg",formData,{
            headers: { 
                "X-Api-Key": process.env.REMOVE_BG_API,
                ...formData.getHeaders()
            },
            responseType: 'arraybuffer'
        });

        // Convert the response data to base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct 1 credit from user
        await userModel.findByIdAndUpdate(user._id, {
            $inc: { creditBalance: -1 }
        });

        // Clean up uploaded file
        fs.unlinkSync(imagePath);

        res.json({
            success: true,
            resultImage: resultImage,
            creditBalance: user.creditBalance - 1,
            message: "Background removed successfully"
        });


    } catch(error) {
        console.error("Error in removeBgImage controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export { removeBgImage };