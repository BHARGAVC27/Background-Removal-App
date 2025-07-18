import React from "react";
import { assets } from "../../assets/assets";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { resultImage, image, setImage, setResultImage } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Redirect to home if no image data after page load
  useEffect(() => {
    // Small delay to allow context to initialize
    const timer = setTimeout(() => {
      if (!image && !resultImage) {
        console.log("No images found, redirecting to home...");
        navigate('/');
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [image, resultImage, navigate]);
  
  // Determine processing state based on context
  const isProcessing = image && !resultImage;
  const hasProcessedImage = !!resultImage;

  // Download function
  const downloadImage = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'background-removed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-screen">
      <div className="bg-white p-10 drop-shadow-md rounded-3xl">
        {/* Image container */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Original Image Section */}
          <div className="flex-1 text-center">
            <p className="pb-4 font-semibold text-gray-600 text-lg">Original</p>
            <div className="w-full aspect-[4/3] max-w-md mx-auto">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full object-contain rounded-lg shadow-md"
                  alt="Original with background"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg shadow-md border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm">No image uploaded</p>
                    <p className="text-xs mt-1">Upload an image to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Processed Image Section */}
          <div className="flex-1 text-center">
            <p className="pb-4 font-semibold text-gray-600 text-lg">Without Background</p>
            <div className="w-full aspect-[4/3] max-w-md mx-auto relative border border-gray-300 rounded-lg overflow-hidden"
                 style={{
                   backgroundImage: `url(${assets.bg_layer})`,
                   backgroundSize: '20px 20px',
                   backgroundRepeat: 'repeat'
                 }}>
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isProcessing ? (
                  /* Loading State */
                  <div className="flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
                    <p className="text-gray-600 text-sm font-medium">Processing...</p>
                  </div>
                ) : hasProcessedImage ? (
                  /* Processed Image */
                  <img
                    src={resultImage}
                    className="w-full h-full object-contain rounded-lg"
                    alt="Background removed"
                  />
                ) : (
                  /* Empty State */
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm">No image processed yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button 
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-yellow-500 hover:bg-blue-50 font-semibold rounded-full transition-all duration-300 hover:scale-105"
            onClick={() => {
              // Reset images and navigate to home
              setImage(null);
              setResultImage(null);
              navigate('/');
            }}
          >
            <img src={assets.upload_icon} alt="Upload" className="w-4 h-4" />
            Try another image
          </button>
          
          <button 
            onClick={downloadImage}
            className={`inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-500 hover:bg-yellow-50 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isProcessing || !hasProcessedImage ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isProcessing || !hasProcessedImage}
          >
            <img src={assets.download_icon} alt="Download" className="w-4 h-4" />
            Download image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
