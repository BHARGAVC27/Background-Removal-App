import { useState } from "react";
import { createContext } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const { getToken } = useAuth();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      console.log("Token:", token);
      console.log("Backend URL:", backendURL + "/api/user/credits");
      const { data } = await axios.get(backendURL + "/api/user/credits", {
        headers: { token: token },
      });
      if (data && data.credits !== undefined) {
        setCredit(data.credits);
        console.log("Credits loaded:", data.credits);
      }
    } catch (error) {
      console.error("Error loading credits data:", error);
      toast.error(error.message);
    }
  };

  const removeBg = async (image) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }
      if(!image) {
        return toast.error("Please upload an image first");
      }
      if(!credit) {
        return toast.error("You have no credits left. Please purchase more credits to continue.");
      }
      setImage(image);
      setResultImage(false);
      navigate("/result");

      const token = await getToken();
      const formData = new FormData();
      image && formData.append("image", image);

      const {data} = await axios.post(backendURL+ "/api/image/remove-bg", formData, {
        headers: {token}
      });

      if(data.success) {
        setResultImage(data.resultImage);
        data.creditBalance && setCredit(data.creditBalance);
        console.log("Background removed successfully:", data.resultImage);
      } else {
        console.error("Error removing background:", data.error);
        data.creditBalance && setCredit(data.creditBalance);
        toast.error(data.error);
        if(data.creditBalance === 0) {
          toast.error("You have no credits left. Please purchase more credits to continue.");
          navigate("/pricing");
        }
      }

    } catch (error) {
      console.error("Error removing background:", error);
      toast.error(error.message);
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditsData,
    backendURL,
    image,
    setImage,
    removeBg,
    resultImage, setResultImage
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
