import { FaStar, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUserAlt, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';
import { useParams } from 'react-router';

const PackageDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [quantity, setQuantity] = useState(1);

  // Sample data - replace with your actual data fetching
  const packageData = {
    id: id,
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    title: 'Premium Bali Adventure',
    location: 'Bali, Indonesia',
    rating: 4.8,
    reviews: 124,
    duration: '7 Days',
    departureDate: '2023-11-15',
    groupSize: 'Max 12',
    difficulty: 'Moderate',
    price: 1299,
    discount: 15,
    description: 'Experience the magic of Bali with our premium adventure package. This carefully curated journey takes you through Bali\'s most breathtaking landscapes, from lush jungles to pristine beaches, with luxury accommodations and expert guides.',
    highlights: [
      'Private villa accommodation',
      'Daily breakfast included',
      '3 guided cultural tours',
      'Airport transfers',
      '24/7 support'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Ubud Tour', description: 'Arrive at Ngurah Rai Airport and transfer to your private villa. After settling in, enjoy a guided tour of Ubud\'s famous temples and markets.' },
      { day: 2, title: 'Waterfall Adventure', description: 'Explore Bali\'s most spectacular waterfalls with a private guide, including Tegenungan and Tukad Cepung.' }
    ],
    included: ['Accommodation', 'Meals as listed', 'All tours', 'Entrance fees', 'English guide'],
    notIncluded: ['Flights', 'Travel insurance', 'Personal expenses']
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const calculatePrice = () => {
    return packageData.price * (1 - packageData.discount / 100) * quantity;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Package Header */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="w-full md:w-2/3">
          <div className="relative rounded-2xl overflow-hidden h-96">
            <img
              src={packageData.image}
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={toggleFavorite}
                className="p-3 bg-white/90 rounded-full backdrop-blur-sm shadow-md hover:bg-white transition"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-600" />
                )}
              </button>
              <button className="p-3 bg-white/90 rounded-full backdrop-blur-sm shadow-md hover:bg-white transition">
                <FaShareAlt className="text-gray-600" />
              </button>
            </div>
            {packageData.discount > 0 && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                -{packageData.discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="w-full md:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{packageData.title}</h2>
            
            <div className="flex items-center gap-1 mb-4">
              <FaMapMarkerAlt className="text-amber-500" />
              <span className="text-gray-600 dark:text-gray-300">{packageData.location}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                <FaStar className="text-amber-400" />
                <span className="ml-1 font-medium">{packageData.rating}</span>
              </div>
              <span className="text-gray-500">({packageData.reviews} reviews)</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <FaClock className="text-amber-500" />
                <span>{packageData.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-amber-500" />
                <span>{new Date(packageData.departureDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUserAlt className="text-amber-500" />
                <span>{packageData.groupSize}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 dark:text-gray-300">Price per person:</span>
                {packageData.discount > 0 ? (
                  <div className="text-right">
                    <span className="text-lg font-bold text-amber-600">${(packageData.price * (1 - packageData.discount / 100)).toFixed(2)}</span>
                    <span className="ml-2 text-sm text-gray-400 line-through">${packageData.price}</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-amber-600">${packageData.price}</span>
                )}
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="quantity" className="text-gray-600 dark:text-gray-300">Quantity:</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center font-bold text-lg py-2">
                <span>Total:</span>
                <span className="text-amber-600">${calculatePrice()}</span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Book Now <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Package Content */}
      <div className="mt-12">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'overview' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'itinerary' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Itinerary
            </button>
            <button
              onClick={() => setActiveTab('included')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'included' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              What's Included
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === 'reviews' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Tour</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{packageData.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tour Highlights</h3>
                <ul className="space-y-3">
                  {packageData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-8">
              {packageData.itinerary.map((day) => (
                <div key={day.day} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                      {day.day}
                    </div>
                    <div className="flex-1 w-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{day.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'included' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {packageData.included.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-xs">
                        ✓
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Not Included</h3>
                <ul className="space-y-3">
                  {packageData.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 text-xs">
                        ✕
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">{packageData.rating}</div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`${i < Math.floor(packageData.rating) ? 'text-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">Based on {packageData.reviews} reviews</div>
                  </div>
                </div>
                <div className="text-center py-8 text-gray-500">
                  Reviews loading... (Would fetch real data in production)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Packages Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You Might Also Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* These would be other package components in a real app */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl h-64 flex items-center justify-center text-gray-400">
            Similar Package 1
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl h-64 flex items-center justify-center text-gray-400">
            Similar Package 2
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl h-64 flex items-center justify-center text-gray-400">
            Similar Package 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;