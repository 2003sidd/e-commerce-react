
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';



export default function HeroSlider() {

    const slides = [
        {
          image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
          title: 'New Collection',
          subtitle: 'Discover the latest trends'
        },
        {
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
          title: 'Summer Sale',
          subtitle: 'Up to 50% off'
        },
        {
          image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
          title: 'Premium Quality',
          subtitle: 'Handcrafted with care'
        }
      ];
      


    return (
      <div className="h-screen relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-white"
                  >
                    <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl mb-8">{slide.subtitle}</p>
                    <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition">
                      Shop Now
                    </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }