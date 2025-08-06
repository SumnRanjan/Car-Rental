import { useState } from "react"
import { Title } from "../../components/owner/Title";

export const AddCar = () => {
  const [image , setImage] = useState(null)
  const [car, setCar] = useState({
    model: '',
    brand: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: ''
  });

  const onHandleSumbit = async (e) =>{
    e.preventDefault()
  }

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."/>

      <form onSubmit={onHandleSumbit} className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">
        {/* Car Image */}
        
      </form>
    </div>
  )
}
