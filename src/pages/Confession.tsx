import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Loader2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export const Confession = () => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'success' | 'error' | null>(null);
  
  // HARDCODED VALUES
  const to = "Rayya";
  const from = "Adi"; 
  const message = "Rayya, sebenernya aku suka sama kamu. Kamu itu orangnya baik, manis, dan selalu bikin hari-hariku lebih baik dari kemarin. Aku pengen kita bisa lebih dari sekadar teman. Maukah kamu jadi pacarku?";

  // EMAILJS CONFIGURATION (Ganti dengan ID Anda dari emailjs.com)
  const SERVICE_ID = "service_n84h3k6";
  const TEMPLATE_ID = "template_lkim4rg";
  const PUBLIC_KEY = "mRLdP1PWLu5OU095E";

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoBtnPosition({ x, y });
  };

  const handleYes = async () => {
    setAnswered('yes');
    setIsSending(true);
    
    // Trigger confetti immediately
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FFB6C1']
    });

    try {
      // Send email automatically
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_name: "Adi",
          from_name: "Rayya",
          message: "Rayya menjawab: IYA! Dia mau jadi pacar kamu! ❤️",
          reply_to: "asptr00@gmail.com", // Optional
        },
        PUBLIC_KEY
      );
      setEmailStatus('success');
    } catch (error) {
      console.error("Failed to send email:", error);
      setEmailStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-pink-200 text-center max-w-lg mx-auto"
          >
            <div className="mb-6">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Untuk: {to}</p>
              <h1 className="text-3xl font-bold text-gray-800 mb-6 font-serif">Rayya...</h1>
              
              <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 mb-8 relative text-left">
                <Heart className="absolute -top-3 -left-3 w-8 h-8 text-pink-400 fill-pink-100 rotate-12" />
                <p className="text-lg text-gray-700 leading-relaxed font-serif">
                  "{message}"
                </p>
                <p className="text-right text-gray-500 mt-4 font-medium italic">- {from}</p>
              </div>
              
              <p className="text-xl font-semibold text-pink-600 mb-8">
                Jadi, gimana jawaban kamu? 👉👈
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 relative min-h-[60px]">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-pink-500/40 transition-all z-10"
              >
                MAU BANGET! ❤️
              </motion.button>

              <motion.button
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover} // Mobile support
                className="bg-gray-200 text-gray-600 font-bold px-8 py-3 rounded-full hover:bg-gray-300 transition-colors"
                style={{ position: noBtnPosition.x ? 'absolute' : 'relative' }}
              >
                Maaf, Gak Bisa
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-pink-200 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Yeay! Aku Seneng Banget! 🥰</h2>
            <p className="text-gray-600 mb-8">
              Makasih ya Rayya udah nerima aku.
            </p>

            {isSending && (
              <div className="flex items-center justify-center gap-2 text-pink-600 mb-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Mengirim notifikasi ke Adi...</span>
              </div>
            )}

            {emailStatus === 'success' && (
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg mb-4">
                Notifikasi berhasil dikirim ke Adi! 💌
              </div>
            )}

            {emailStatus === 'error' && (
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg mb-4">
                Ups, notifikasi gagal terkirim. Tapi gak apa-apa, yang penting kamu udah bilang IYA!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
