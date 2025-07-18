import React from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import BgSlider from '../components/BgSlider'
import Testimonials from '../components/Testimonials'
import TryNow from '../components/TryNow'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Steps/>
      <BgSlider/>
      <Testimonials/>
      <TryNow/>
    </div>
  )
}

export default Home
