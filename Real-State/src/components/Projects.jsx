import React, { useEffect, useState } from 'react'
import assets, { projectsData } from '../assets/assets'
import { AnimatePresence,motion } from 'framer-motion'

function Projects() {
    const[index,setIndex]= useState(0)
    const [cards,setCards]= useState(1)
    useEffect(()=>{
        const  updateCards=()=>{
            if(window.innerWidth >=1024){
                setCards(projectsData.length)
            }else{
                setCards(1)
            }
        }
            updateCards()

            window.addEventListener('resize',updateCards)
            return ()=> window.removeEventListener('resize',updateCards)
        
    },[])

    const nextProject = ()=>{
        setIndex((prevIndex)=>(prevIndex +1) % projectsData.length)
    }
    const PreviousProject = ()=>{
        setIndex((prevIndex)=>prevIndex ===0 ? projectsData.length-1 : prevIndex -1)
    }



  return (
    < motion.div 
    initial={{opacity:0, x:-200}}
    transition={{duration:1}}
    whileInView={{opacity:1, x:0}}
    viewport={{once: true}}
    id='Projects' className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
            Projects <span className='underline underline-offset-4 decoration-1 under font-light'> Completed</span>
        </h1>
        <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Crafting Spaces, Building Legacies-Explore Our Portfolio</p>
        
        {/* Sliderbutton */}
        <div className='flex justify-end items-center mb-8'>
            <button onClick={PreviousProject} className='p-3 bg-gray-200 mr-2' aria-label='Previous Project'>
                <img src={assets.left_arrow} alt="Previous" />
            </button>
            <button onClick={nextProject} className='p-3 bg-gray-200 mr-2' aria-label='Next Project'>
                <img src={assets.right_arrow} alt=" Next" />
            </button>
        </div>
        {/* Project Slider Container */}
        <div className='overflow-hidden'>
            <div className='flex gap-4 transition-transform duration-500 ease-in-out'
            style={{transform:`translateX(-${(index*100)/ cards}%)`}}>
                {projectsData.map((project,index)=>(
                    <div className='relative flex-shrink-0 w-full sm:w-1/4' 
                    key={index}>
                        <img className='w-full mb-14 h-auto' src={project.image} alt={project.title} />
                        <div className='absolute left-0 right-0 bottom-5 flex justify-center'>
                            <div className='inline-block bg-white w-3/4 px-4 py-2 shadow-md'>
                            <h2 className='text=xl font-semibold text-gray-800'>{project.title}</h2>
                            <p className='text-gray-500 text-sm'>{project.price}
                                <span className=' px-1'>{project.location}</span>
                            </p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </motion.div>
  )
}

export default Projects