import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import arrow_icon from './arrow_icon.svg'
import header_img from './header_img.png'
import remove_bg_icon from './remove_bg_icon.svg'
import upload_btn_icon from './upload_btn_icon.svg'
import upload_icon from './upload_icon.svg'
import download_icon from './download_icon.svg'
import image_w_bg from './image_w_bg.png'
import image_wo_bg from './image_wo_bg.png'
import facebook_icon from './facebook_icon.svg'
import google_plus_icon from './google_plus_icon.svg'
import twitter_icon from './twitter_icon.svg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import credit_icon from './credit_icon.png'

export const assets = {
    logo,
    logo_icon,
    arrow_icon,
    header_img,
    remove_bg_icon,
    upload_icon,
    download_icon,
    image_w_bg,
    image_wo_bg,
    facebook_icon,
    google_plus_icon,
    twitter_icon,
    upload_btn_icon,
    credit_icon,
    profile_img_1,
    profile_img_2,
    profile_img_3
}

export const testimonialsData = [
    {
        id: 1,
        text: "This background removal tool has transformed my workflow completely! As a photographer, I used to spend hours manually editing photos. Now I can process dozens of images in minutes with incredible accuracy.",
        author: "Alex Thompson",
        image: profile_img_1,
        jobTitle:'Professional Photographer',
    },
    {
        id: 2,
        text: "Amazing results every time! I run an online store and needed clean product images. This tool delivers consistent, professional-quality results that have boosted our sales significantly.",
        author: "Maria Rodriguez",
        image: profile_img_2,
        jobTitle:'E-commerce Owner',
    },
];

export const plans = [
    {
      id: 'basic',
      price: 5.99,
      credits: 10,
      desc: 'Best for personal use.'
    },
    {
      id: 'standard',
      price: 19.99,
      credits: 50,
      desc: 'Best for business use.'
    },
    {
      id: 'premium',
      price: 34.99,
      credits: 100,
      desc: 'Best for enterprise use.'
    },
  ]