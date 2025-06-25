import React, { useContext, useEffect, useState } from 'react';
import UserAuthContext from '../Context/Context';

import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../Customhook/useAxiosSecure';
import { FaTimes } from 'react-icons/fa';


const UpdatePackage = () => {

 
        const [formData,setFormData]=useState({
            title:'',
            location:'',
            duration:'',
            departureDate:'',
            groupSize:'',
            difficulty:'Moderate',
            price:'',
            discount:'',
            description:'',
            highlights:[''],
            itinerary:[{day:1,title:'',description:''}],
            included:[''],
            notIncluded:[''],
        })
    
  const handleChange=(e)=>{
    e.preventDefault()
      const {name,value}=e.target
    setFormData({...formData, [name]:value})

}
const handleArrayChange=(field,value,index)=>{
     
  const newArray=[...formData[field]]
  newArray[index]=value
  setFormData({...formData,[field]:newArray})


 }

 const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
    
  };
  //  const removeArrayItem=(field,index)=>{
  //   console.log(index)
  //   const newArray=formData[field].filter((_,i)=>index !==i)
  //   console.log(newArray)
  //   setFormData({...formData,[field]:newArray})

  //  }
   const removeArrayItem = (field, index) => {
  
    
    console.log(field,index)
       
    const newArray = [ ...formData[field] ].filter((_, i) => i !== index);  // _ this means avoid element
    console.log(newArray)
    setFormData({ ...formData, [field]: newArray });
  };

 const handleItineraryChange = ( field,index, value) => {
    const newArray = [...formData.itinerary];

 
   if (field==='day'){
    
   newArray[index][field]=Number(value)
   setFormData({...formData,itinerary:newArray})
   }
   else if (field==='title'){
 
    newArray[index][field]=value
     setFormData({...formData,itinerary:newArray})
   }
   else if (field==='description') {
   
newArray[index][field]=value
 setFormData({...formData,itinerary:newArray})
   }
  
  };

  
  


console.log(formData)





    return (
       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Tour Package</h2>

  <form  className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-700 mb-2">Package Title*</label>
        <input onChange={handleChange} name='title' type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Location*</label>
        <input onChange={handleChange} type="text" name='location' className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Duration*</label>
        <input onChange={handleChange} name='duration' type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Departure Date*</label>
        <input onChange={handleChange} name='departureDate' type="date" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Group Size*</label>
        <input onChange={handleChange} name='groupSize' type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Difficulty Level*</label>
        <select onChange={handleChange} name='difficulty' className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Challenging">Challenging</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Price ($)*</label>
        <input onChange={handleChange} name='price' type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Discount (%)</label>
        <input onChange={handleChange} name='discount' type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
      </div>
    </div>

    <div>
      <label className="block text-gray-700 mb-2">Description*</label>
      <textarea onChange={handleChange} name='description' rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
    </div>

   
{formData.highlights.map((highlight, index) => (
  <div key={index}>
    <label className="block text-gray-700 mb-2">Highlights*</label>
    <div className="flex items-center mb-2">
      <input
        type="text"
        
        onChange={(e) => handleArrayChange('highlights',  index,e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        required
      />
      {formData.highlights.length > 1 && (
        <button
          type="button"
          onClick={() => removeArrayItem('highlights', index)}
          className="ml-2 p-2 text-red-500 hover:text-red-700"
        >
          <FaTimes />
        </button>
      )}
    </div>
   
      <button
        onClick={() => addArrayItem('highlights')}
        type="button"
        className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
      >
        Add Highlight
      </button>
   
  </div>
))}
 {/* Itinerary */}
        <div>
          <label className="block text-gray-700 mb-2">Itinerary*</label>
          {formData.itinerary.map((items, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Day</label>
                  <input
                    type="number"
                   value={items.day}
                   onChange={(e)=>handleItineraryChange('day',index,e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                   onChange={(e)=>handleItineraryChange('title',index,e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                   onChange={(e)=>handleItineraryChange('description',index,e.target.value)}
                  required
                />
              </div>
              {formData.itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={()=>{
                    const newArray=[...formData.itinerary].filter((_,i)=>i !==index)
                    setFormData({...formData,itinerary:newArray})
                  }}
                  className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
                >
                  Remove Day
                </button>
              )}
               
            </div>
          ))}
          <button
            type="button"
           onClick={()=>{
            const nextDay=formData.itinerary.length+1
            setFormData({...formData, itinerary:[...formData.itinerary,{day:nextDay,title:'',description:''}]})
       
       
          }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
          >
            Add Day
          </button>
         
        </div>

     
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label className="block text-gray-700 mb-2">What's Included*</label>
            {formData.included.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
               
                  onChange={(e) => handleArrayChange('included', index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                {formData.included.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('included', index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('included')}
              className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
            >
              Add Item
            </button>
          </div>
     
      <div>
        <label className="block text-gray-700 mb-2">Not Included</label>
        <input name='notIncluded' type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-2" />
        <button type="button" className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Add Item</button>
      </div>
    </div>

    <div>
      <label className="block text-gray-700 mb-2">Package Images*</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition">
          <span className="text-gray-500 text-sm">Upload Images</span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>

    <div className="flex justify-end gap-4 pt-4">
      <button type="button" className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow transition">Cancel</button>
      <button type="submit" className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition">Create Package</button>
    </div>
  </form>
</div>

    );
};

export default UpdatePackage;