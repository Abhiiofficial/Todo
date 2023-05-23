import './Footer.css'
import { motion } from 'framer-motion'

function FooterRow() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className='footer'>
        <span className="love">Made with 💖 by Abhishek.</span>
      </div>
    </motion.div>
  )
}

export default FooterRow