import React from 'react'
import LandingHero from '../../component/user_side/home_page/LandingHero'
import OurServices from '../../component/user_side/home_page/OurServices'
import OverseasJourney from '../../component/user_side/home_page/OverseasJourney'
import LatestJobsNews from '../../component/user_side/home_page/LatestJobsNews'
import DreamsSupportFAQ from '../../component/user_side/home_page/DreamsSupportFAQ'

const LandingPage = () => {
  return (
    <div className='theme-user bg-[var(--bg-page)] text-[var(--text-primary)] pt-14'>
      <LandingHero/>
      <OurServices/>
      <OverseasJourney/>
      <LatestJobsNews/>  
      <DreamsSupportFAQ/>
      
    </div>
  )
}

export default LandingPage
