import { assets } from "../assets/assets";
import { Title } from "./Title"

export const Testimonial = () => {
    const testimonials = [
    {  
        name: "Emma Rodriguez",
        address: "Barcelona, Spain", 
        image: assets.testimonial_image_1, 
        rating: 5, 
        testimonial: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!"
    },
    {  
        name: "Liam Johnson", 
        address: "New York, USA", 
        image: assets.testimonial_image_2,
        testimonial: "I'm truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
    },
    {  
        name: "Sophia Lee", 
        address: "Seoul, South Korea", 
        image: assets.testimonial_image_1, 
        testimonial: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." 
    }
];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

        <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial , index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="" />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}   
