import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-8 relative"
        >
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-pink-200">
            <Mail className="w-16 h-16 text-pink-500" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-10 h-10 text-red-500 fill-red-500 drop-shadow-md" />
          </motion.div>
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4 font-serif">Hai, Rayya!</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xs mx-auto">
          Ada pesan spesial yang ingin aku sampaikan ke kamu.
          <br />
          Dibaca ya? 🥺
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/confession')}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-pink-500/40 transition-all flex items-center gap-2 mx-auto"
        >
          <Mail className="w-5 h-5" />
          Buka Pesan
        </motion.button>
      </motion.div>
    </Layout>
  );
};
