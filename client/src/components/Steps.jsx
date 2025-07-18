import React from 'react'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-between mt-16 px-4 lg:px-44'>
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center leading-tight
        bg-gradient-to-r from bg-neutral-700 to-slate-300 text-transparent bg-clip-text max-w-3xl mx-auto
      ">
        Steps to Remove Background <br /> Image in Seconds
      </h1>
      <div className='flex flex-col md:flex-row justify-between gap-8 mt-6 w-full max-w-5xl'>
        <div className="steps-card flex-1">
            <div className="step-number">1</div>
            <h3 className="step-title">Upload Image</h3>
            <p className="step-description">Choose and upload your image from your device. Our tool supports various image formats including JPG, PNG, and more.</p>
        </div>
        <div className="steps-card flex-1">
            <div className="step-number">2</div>
            <h3 className="step-title">Remove Background</h3>
            <p className="step-description">Our AI-powered tool automatically detects and removes the background from your image with precision and accuracy.</p>
        </div>
        <div className="steps-card flex-1">
            <div className="step-number">3</div>
            <h3 className="step-title">Download Image</h3>
            <p className="step-description">Download your processed image with transparent background in high quality, ready to use for your projects.</p>
        </div>
      </div>
    </div>
  )
}

export default Steps
