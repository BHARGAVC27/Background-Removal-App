import React from 'react'
import { assets, testimonialsData } from "../../assets/assets";

const Testimonials = () => {
  // Use the existing testimonialsData and add one more for a complete set
  const testimonials = [
    {
      id: 1,
      name: testimonialsData[0].author,
      role: testimonialsData[0].jobTitle,
      image: testimonialsData[0].image,
      rating: 5,
      text: testimonialsData[0].text
    },
    {
      id: 2,
      name: testimonialsData[1].author,
      role: testimonialsData[1].jobTitle,
      image: testimonialsData[1].image,
      rating: 5,
      text: testimonialsData[1].text
    },
    {
      id: 3,
      name: "Sarah Wilson",
      role: "Marketing Manager",
      image: assets.profile_img_3, // Use the third profile image
      rating: 5,
      text: "This tool has revolutionized our marketing campaigns. Clean, professional images in seconds. Our team productivity has increased dramatically!"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-xl ${
          index < rating 
            ? 'text-yellow-500 drop-shadow-sm' 
            : 'text-gray-200'
        } transition-all duration-200`}
        style={{
          filter: index < rating ? 'drop-shadow(0 1px 2px rgba(234, 179, 8, 0.3))' : 'none'
        }}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 lg:px-44 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center leading-tight mb-4 sm:mb-8
        bg-gradient-to-r from-neutral-700 to-slate-300 text-transparent bg-clip-text max-w-3xl">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 text-center mb-12 max-w-2xl">
        See what our users are saying about their experience with our background removal tool
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            {/* Accent Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-yellow-900"></div>
            
            {/* Quote Icon */}
            <div className="text-blue-500 text-3xl mb-4 opacity-30 font-serif leading-none">
              ❝
            </div>

            {/* Rating */}
            <div className="flex mb-4">
              {renderStars(testimonial.rating)}
            </div>
            
            {/* Testimonial Text */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {testimonial.text}
            </p>
            
            {/* User Info */}
            <div className="flex items-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              />
              <div className="ml-4">
                <h4 className="font-semibold text-neutral-700 text-sm">
                  {testimonial.name}
                </h4>
                <p className="text-gray-500 text-xs">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
