"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, UtensilsCrossed, Leaf, ArrowRight, Play } from 'lucide-react';

export default function CookMateLanding() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    
   <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500/30 font-sans overflow-x-hidden">
      {/*
       <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <UtensilsCrossed size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">CookMate</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-orange-500 transition-colors">Features</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Recipes</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Community</a>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-orange-500 hover:text-white transition-all duration-300">
          Get Started
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          
        <section className="text-center mb-32">
          <motion.div {...fadeIn}>
            <span className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
              AI-Powered Gastronomy
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
              Cook Anything. <br />
              <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                Waste Nothing.
              </span>
            </h1> 
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Meet your AI Sous Chef. Upload a photo of your fridge and get instant, chef-quality recipes tailored to what you already have.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="group bg-orange-600 hover:bg-orange-500 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20">
                Launch App <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border border-white/10 transition-all">
                <Play size={18} fill="white" /> Watch Demo
              </button>
            </div>
          </motion.div>
        </section>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 row-span-2 rounded-3xl p-8 bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden relative group"
          >
            <div className="relative z-10">
              <Camera className="text-orange-500 mb-4" size={32} />
              <h3 className="text-3xl font-bold mb-2">Smart Fridge Scanner</h3>
              <p className="text-gray-400 max-w-xs">Just take a photo. Our vision AI identifies 2,000+ ingredients instantly.</p>
            </div>
            <div className="absolute right-0 bottom-0 w-2/3 h-full bg-orange-500/10 blur-[100px] group-hover:bg-orange-500/20 transition-all" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-zinc-800 rounded-full border border-orange-500/20 shadow-2xl animate-pulse" />
          </motion.div>

          
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-3xl p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/5 flex flex-col justify-between"
          >
            <Leaf className="text-green-400" size={28} />
            <div>
              <h3 className="text-xl font-bold mb-1">Zero Waste</h3>
              <p className="text-sm text-gray-500">Save up to $1,200/year by using leftovers effectively.</p>
            </div>
          </motion.div>

         
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-3xl p-8 bg-orange-600 flex flex-col justify-between text-white"
          >
            <Zap size={28} />
            <div>
              <h3 className="text-xl font-bold mb-1">Instant Prep</h3>
              <p className="text-sm text-orange-100 text-opacity-80">Recipes generated in under 1.2 seconds.</p>
            </div>
          </motion.div>

          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 rounded-3xl p-8 bg-zinc-900 border border-white/10 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-2">Join 10k+ Home Chefs</h3>
              <p className="text-gray-400">Share your #CookMateCreations and get featured on our global leaderboard.</p>
            </div>
            <div className="flex -space-x-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-700 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-black bg-orange-500 flex items-center justify-center text-xs font-bold">+10k</div>
            </div>
          </motion.div> 
        </div>
      </main>

      
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
       */}
       <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 sm:p-12 font-serif selection:bg-rose-500/30">
    {/* Animated background glow for a touch of depth */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-transparent to-transparent pointer-events-none" />

    <div className="relative w-full max-w-2xl bg-[#141414] shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden border border-white/5">
      
      {/* Diary "Binding" Detail (Left edge) */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent border-r border-white/5 flex flex-col justify-around py-10 items-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#1c1c1c] shadow-inner" />
        ))}
      </div>

      {/* The Page Content */}
      <div className="pl-12 pr-6 py-12 md:pl-20 md:pr-12 md:py-16">
        
        {/* Date / Header Area */}
        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600 font-sans">
            11 • 02 • 2026 - 11:11:11 PM
          </span>
          <span className="text-[10px] tracking-[0.2em] text-rose-800/80 font-sans italic">
            Midnight Reflections
          </span>
        </div>

        <article className="space-y-8">
          {/* The Shayari-style Heading */}
          <h1 className="text-rose-400 text-xl md:text-2xl font-serif italic tracking-wide">
            {/* To cookmate admin, */}
          </h1>

          {/* The Main Body with "Ruled Line" effect */}
          <div className="text-gray-300 text-lg md:text-2xl leading-[2.2rem] font-serif italic space-y-8 bg-[repeating-linear-gradient(transparent,transparent_34px,#1f1f1f_35px)] bg-local">
            
            <p>
              "Friendship isn't a ledger of daily calls or texts,
Nor a race to see who remembers the other next.
It’s a quiet promise, a bond that never ends—
That even in the silence, we remain the truest friends."
            </p>
            
            <p>
          I may not 'like' every story you share,
          But that doesn't mean that I’m not there.
          we don't need an app to show that they’re true,
          Their respect and their time are enough for you.
            </p>
          </div>

          {/* Footer / Signature Area */}
          <footer className="pt-1 flex flex-col items-end">
            <div className="text-right space-y-1">
              <p className="text-gray-500 text-xs tracking-widest uppercase"></p>
              <p className="text-3xl md:text-4xl text-rose-500 font-serif italic pr-2">
               - Limitless
              </p>
              
            </div>
            
            <div className="mt-8 flex flex-col items-end opacity-40">
              cookmate is cooking currently......
            </div>
          </footer>
        </article>
      </div>

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
    </div>
  </main>
);
    </div>  
  );
}