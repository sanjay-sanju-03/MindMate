import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Leaf } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-[#f5f1eb] to-[#ede8e2] flex flex-col items-center justify-center px-6 py-8 overflow-hidden">
      {/* Logo with subtle animation */}
      <div className="mb-3 sm:mb-4 animate-fade-in">
        <img src="/logo.png" alt="MindMate Logo" className="w-28 sm:w-40 h-28 sm:h-40 object-contain drop-shadow-lg" />
      </div>

      {/* Content */}
      <div className="text-center max-w-2xl px-4 flex-1 flex flex-col justify-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">MindMate</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-3 sm:mb-4 font-semibold">Your calm companion for student life</p>
        
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          A supportive space to track your moods, find calm, and practice self-care during stressful times.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex flex-col items-center">
            <Heart className="w-5 sm:w-7 h-5 sm:h-7 text-[#5abf7f] mb-1 sm:mb-2" />
            <p className="text-xs text-gray-700">Track Moods</p>
          </div>
          <div className="flex flex-col items-center">
            <Brain className="w-5 sm:w-7 h-5 sm:h-7 text-[#5abf7f] mb-1 sm:mb-2" />
            <p className="text-xs text-gray-700">Mindfulness</p>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="w-5 sm:w-7 h-5 sm:h-7 text-[#5abf7f] mb-1 sm:mb-2" />
            <p className="text-xs text-gray-700">Self-Care</p>
          </div>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={() => navigate("/signin")}
          className="bg-[#5abf7f] hover:bg-[#4aa86d] text-white text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-10 rounded-full flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Footer Text */}
      <div className="text-center text-xs sm:text-sm mt-4">
        <p className="text-gray-600">Already have an account? <a href="/signin" className="text-[#5abf7f] hover:text-[#4aa86d] font-bold hover:underline transition-colors">Sign In</a></p>
      </div>
    </div>
  );
};

export default Landing;
