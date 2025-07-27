import React from 'react'
import { courseData, courseHeroData } from '../data/courseData'
import Card from '../components/Card'
import ScrollAnimatedSection from '../components/ScrollAnimatedSection'
import Hero from "../components/Hero"

const Courses = () => {
  return (
    <div className='px-1 mt-1 sm:px-5 md:px-10 lg:px-20 xl:px-36 2xl:px-44'>
      <Hero data={courseHeroData}/>
      <h1 className='mt-16 text-lg md:text-2xl xl:text-4xl sm:my-5 font-semibold text-headerColorHover'>Explore Our Courses</h1>
      <ScrollAnimatedSection id="all-course" direction="left">
        <div className='grid grid-cols-1 gap-5 px-7 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:px-0 2xl:grid-cols-5 2xl:gap-7'>
          {
            courseData.courses.map((course, idx) => <Card key={idx} data={course} />)
          }
        </div>
      </ScrollAnimatedSection>
    </div>
  )
}

export default Courses
