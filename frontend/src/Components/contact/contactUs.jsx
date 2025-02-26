
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
const ContactUs = ()=>{
const contactUs =(event)=>{
    event.preventDefault()
    console.log("contact us")
}

return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-16 flex flex-col"
    >
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3" />
              <span>support@shoestore.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3" />
              <span>123 Shoe Street, Fashion District, NY 10001</span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={contactUs}
              className="btn text-white px-6 py-2 rounded-lg "
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">FAQs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What are your shipping times?</h3>
              <p className="text-gray-600">We typically process and ship orders within 1-2 business days.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer returns?</h3>
              <p className="text-gray-600">Yes, we offer free returns within 30 days of purchase.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How can I track my order?</h3>
              <p className="text-gray-600">Once your order ships, you'll receive a tracking number via email.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
)
};
export default ContactUs;