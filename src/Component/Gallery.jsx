import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiMaximize, FiX } from 'react-icons/fi';

const TravelGallery = () => {

  const images=[
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80'
]
 
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Main Featured Image */}
      <div 
        className="relative h-80 sm:h-96 lg:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => openLightbox(currentIndex)}
      >
        <img
          src={images[currentIndex]}
          alt={`Featured travel ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex items-end p-6">
          <div className="text-white">
            <h3 className="text-xl font-bold">Explore Our Destinations</h3>
            <p className="text-sm opacity-90">Click to view gallery</p>
          </div>
          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
            <FiMaximize className="text-white" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-400 w-6' : 'bg-white/50'}`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${idx === currentIndex ? 'ring-2 ring-amber-400' : 'hover:ring-1 hover:ring-white'}`}
            onClick={() => setCurrentIndex(idx)}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover transition-transform hover:scale-110"
            />
            {idx === 4 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-medium">+{images.length - 5}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition"
          >
            <FiX size={24} />
          </button>
          
          <div className="relative w-full max-w-6xl">
            <img
              src={images[currentIndex]}
              alt={`Enlarged view ${currentIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            >
              <FiArrowLeft size={24} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            >
              <FiArrowRight size={24} />
            </button>
          </div>
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-amber-400 w-4' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// <TravelGallery 

export default TravelGallery;