import React from 'react'
import cook from '../assets/cook.jpg'
import ReviewCard from '../components/ReviewCard';
import customer1 from '../assets/customer1.png' 
import customer2 from '../assets/customer2.jpg'
import customer3 from'../assets/customer3.png'
import customer4 from '../assets/customer4.jpg' 
import customer5 from '../assets/customer5' 

const About = () => {
    const reviews = [
      { id: 1, photo:customer1, description: 'The service was excellent and the food was delicious! Highly recommend Food Express.' },
      { id: 2, photo:customer2, description: 'Amazing experience! The delivery was quick and the meals were fresh and tasty.' },
      { id: 3, photo:customer3, description: 'I love the variety of dishes available. Always something new to try and never disappoints!' },
      { id: 4, photo:customer4, description: 'Great customer service and the quality of the food is top-notch. Will definitely order again.' },
      { id: 5, photo:customer5, description: 'Affordable prices for such high-quality food. My go-to place for a quick and delicious meal.' },
      
    ];
  return (
    <div className='flex w-full  flex-col justify-center items-center m-auto relative bg-image2-opacity z-10 pb-6'>
      <h1 className='mt-4 z-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 to bg-purple-700 text-5xl md:text-7xl font-bold  py-2'>Foodie Express</h1>
      <div className='flex justify-center items-center text-lg mt-10 flex-wrap'>
      <p className='text-sky-950 text-lg  md:text-xl lg:text-2xl text-center mx-12'>
      Welcome to Food Express! We are a passionate team of culinary enthusiasts dedicated to bringing you the best food experiences.<span className='hidden sm:inline'> Our journey began with a shared love for delicious cuisine and a commitment to quality. From sourcing the finest ingredients to crafting mouth-watering recipes, we strive to make every meal unforgettable.</span> Meet our talented team of chefs, food critics, and foodies who work tirelessly to ensure that each dish delivered to your table is nothing short of perfection.<br/>
<span className='hidden sm:inline'>Join us on this gastronomic adventure and let Food Express be your go-to destination for all things food.</span>
        </p>
        <div className='w-full   flex  justify-center'>
            <img src={cook} className='w-full max-w-4xl h-full p-10' alt=""/>
        </div>
      </div>
      <h2 className='text-4xl sm:text-5xl md:text-6xl my-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 to bg-purple-700  font-bold z-10'>Customer's  Top Reviews</h2>
      <div className="flex flex-wrap justify-center gap-2 my-5 ">
        {reviews.map(review => (
          <div key={review.id} className="w-full sm:w-1/2 lg:w-1/3 p-2 drop-shadow-md shadow-md">
            <ReviewCard photo={review.photo} description={review.description} />
          </div>
        ))}
      </div>
      <p className='text-2xl md:text-4xl'>Thank you to all our amazing customers for their kind words and support!</p>
    </div>
  )
}

export default About
