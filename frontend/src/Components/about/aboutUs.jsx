import "./about.css"
import { motion } from 'framer-motion';

const AboutUs=()=>{
    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-16 flex flex-col"
    >
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, ShoeStore has become a leading destination for premium footwear.
            We believe that every step matters, and our mission is to provide you with shoes
            that combine style, comfort, and quality.
          </p>
          <p className="text-gray-600">
            Our carefully curated collection features the latest trends and timeless classics,
            ensuring that you'll find the perfect pair for every occasion.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772"
            alt="Our Story"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Quality First</h3>
          <p className="text-gray-600">
            We partner with the best manufacturers to ensure premium quality in every pair.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
          <p className="text-gray-600">
            Your satisfaction is our priority, with excellent service and support.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
          <p className="text-gray-600">
            We're committed to reducing our environmental impact through responsible practices.
          </p>
        </div>
      </div>
    </motion.div>
    )
};
export default AboutUs;