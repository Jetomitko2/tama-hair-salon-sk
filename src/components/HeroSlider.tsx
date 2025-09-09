import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-4xl px-4 sm:px-6 text-white animate-fade-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight">
            Účesový Salón TAMA
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-6 sm:mb-8 px-2">
            Moje meno je Tamara. Pracujem ako kaderníčka už viac ako 20 rokov. Mám bohaté skúsenosti v starostlivosti o vlasy a tvorbe krásnych účesov pre každú príležitosť.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link to="/rezervacia">
              <Button size="lg" className="salon-gradient-primary text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 transition-spring hover:scale-105 backdrop-blur-sm w-full sm:w-auto">
                Rezervovať termín
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;