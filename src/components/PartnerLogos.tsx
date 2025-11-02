import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { getPartnerLogo } from "@/lib/supabase-storage";

interface Logo {
  name: string;
  image: string;
  alt: string;
  url?: string;
  priority?: number;
}

interface PartnerLogosProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  maxLogoCount?: number;
}

const defaultLogos: Logo[] = [
  {
    name: "Mercy Health",
    image: getPartnerLogo("mercy-health.png"),
    alt: "Mercy Health - Healthcare Construction Partner",
    url: "https://www.mercy.com/",
    priority: 1,
  },
  {
    name: "UC Health",
    image: getPartnerLogo("uc-health.png"),
    alt: "UC Health - Healthcare Construction Partner",
    url: "https://www.uchealth.com/",
    priority: 2,
  },
  {
    name: "Big Boy",
    image: getPartnerLogo("big-boy.png"),
    alt: "Big Boy Restaurant & Bakery - Retail Construction Partner",
    url: "https://www.bigboy.com/",
    priority: 3,
  },
  {
    name: "Cushman & Wakefield",
    image: getPartnerLogo("cushman-wakefield.png"),
    alt: "Cushman & Wakefield - Commercial Real Estate Partner",
    url: "https://www.cushmanwakefield.com/",
    priority: 4,
  },
];

const PartnerLogos = ({
  title = "Trusted by leading organizations",
  subtitle = "Healthcare • Education • Retail • Commercial",
  logos = defaultLogos,
  maxLogoCount = 8,
}: PartnerLogosProps) => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true })
  );

  const sortedLogos = [...logos].sort((a, b) => 
    (a.priority || 999) - (b.priority || 999)
  );

  const useCarousel = logos.length >= maxLogoCount;

  const LogoItem = ({ logo }: { logo: Logo }) => {
    const content = (
      <div className="flex items-center justify-center p-4 h-full">
        <img
          src={logo.image}
          alt={logo.alt}
          loading="lazy"
          className="max-h-[42px] max-w-[160px] w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
        />
      </div>
    );

    if (logo.url) {
      return (
        <a
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus-visible:ring-2 ring-secondary rounded-none"
          aria-label={`Visit ${logo.name} website`}
        >
          {content}
        </a>
      );
    }

    return content;
  };

  if (useCarousel) {
    return (
      <section className="py-24 bg-[#F2F2F2]" aria-label="Client and partner logos">
        <div className="container mx-auto px-6 lg:px-20">
          {title && (
            <div className="text-center mb-12">
              <h2 className="mb-4 uppercase font-heading font-bold text-3xl md:text-4xl tracking-wide">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground text-lg">{subtitle}</p>
              )}
            </div>
          )}

          <Carousel
            opts={{ loop: true }}
            plugins={[autoplayPlugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {sortedLogos.map((logo, index) => (
                <CarouselItem
                  key={`${logo.name}-${index}`}
                  className="pl-6 basis-1/2 md:basis-1/4 lg:basis-1/6"
                >
                  <LogoItem logo={logo} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#F2F2F2]" aria-label="Client and partner logos">
      <div className="container mx-auto px-6 lg:px-20">
        {title && (
          <div className="text-center mb-12">
            <h2 className="mb-4 uppercase font-heading font-bold text-3xl md:text-4xl tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-lg">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
          {sortedLogos.map((logo, index) => (
            <LogoItem key={`${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
