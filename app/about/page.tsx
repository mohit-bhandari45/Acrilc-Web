"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brush,
  GalleryHorizontal,
  Globe,
  Handshake,
  Heart,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Palette,
  Scissors,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ContentBlock {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutAcrilc = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const teamMembers: TeamMember[] = [
    {
      name: "Sambit",
      role: "Founder & CEO",
      bio: "Doesn't just start companies, he starts conversations that scale. Born in West Bengal with a deep love for culture, he saw what happens when art gets lost in modern noise. Acrilc is his quiet rebellion turned ecosystem for artists.",
      avatar: "S",
    },
    {
      name: "Joydip",
      role: "Managing Director",
      bio: "Physiotherapist by profession, artist by passion. He and Sambit spent weeks in Bengal's lanes, listening to creators and understanding what talent goes unnoticed. That journey shaped how Acrilc works today.",
      avatar: "J",
    },
    {
      name: "Mohit",
      role: "CTO",
      bio: "Makes tech feel less like a machine and more like it's working with you. He quietly builds Acrilc's backbone — fast, secure, and ready to grow with every artist who joins.",
      avatar: "M",
    },
    {
      name: "Sanpreet",
      role: "Chief Communication Officer",
      bio: "The bridge between what we say and how people feel it. Sharp with words, soft with people — she doesn't just craft communication, she builds connection.",
      avatar: "S",
    },
    {
      name: "Avantika",
      role: "Chief Quality Officer",
      bio: "Doesn't just review art — she lives it. An artist herself, she brings deep understanding of the creative process into every decision, ensuring what leaves Acrilc reflects honest, intentional art.",
      avatar: "A",
    },
    {
      name: "Amit",
      role: "Software Developer",
      bio: "Turns complex problems into elegant solutions. With a keen eye for detail and a passion for clean code, he crafts the digital experiences that make Acrilc feel intuitive and seamless for artists and art lovers alike.",
      avatar: "A",
    },
  ];

  const values: ValueCard[] = [
    {
      icon: <Palette className="w-16 h-16" />,
      title: "Creative Integrity",
      description:
        "We respect the creative process and never compromise artistic vision for commercial interests.",
    },
    {
      icon: <HeartHandshake className="w-16 h-16" />,
      title: "Community First",
      description:
        "Our platform exists to serve artists and foster genuine connections within the creative community.",
    },
    {
      icon: <ShieldCheck className="w-16 h-16" />,
      title: "Privacy Respected",
      description:
        "Your art, your data, your choice. We believe in transparency and respect for privacy.",
    },
  ];

  const visionContent: ContentBlock[] = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Mentorship & Growth",
      description:
        "Connect with established artists, find mentors, share knowledge. We believe in lifting each other up, not competing for attention.",
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Local & Global",
      description:
        "From the lanes of Bengal to galleries worldwide, we celebrate art in all its forms and origins. Your local story matters as much as any trending topic.",
    },
  ];

  const philosophyContent: ContentBlock[] = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Art First",
      description:
        'Every decision we make starts with one question: "What\'s best for the art?" Not the algorithm, not the metrics, not the trends. The art.',
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Community Driven",
      description:
        "We're not just building a platform; we're nurturing a community where artists can grow, collaborate, and thrive together.",
    },
  ];

  const communityContent: ContentBlock[] = [
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: "Real Conversations",
      description:
        "No bots, no automated responses. Just real people having real conversations about art, creativity, and growth.",
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: "Mutual Support",
      description:
        "From sharing techniques to collaborating on projects, our community thrives on the principle of lifting each other up.",
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Continuous Learning",
      description:
        "Every artist brings unique perspectives and skills. We create spaces for knowledge sharing and skill development.",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Parallax effect for hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const FloatingIcon = ({
    icon,
    className,
  }: {
    icon: React.ReactNode;
    className: string;
  }) => (
    <div className={`absolute animate-float ${className}`}>
      <div className="text-5xl text-yellow-500 opacity-60 drop-shadow-lg">
        {icon}
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      >
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            className="w-full h-full object-cover"
            src="https://dl.dropboxusercontent.com/scl/fi/5jb9atwie6k6z4hwe8j98/acrilc-video.mp4?rlkey=u78yw9kdccbv08xwqsw0rbhr2&st=1qr9p679"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>
        <div className="absolute inset-0 bg-black/50 backdrop-brightness-75 z-10" />

        {/* Floating Art Elements */}
        <FloatingIcon
          icon={<Palette />}
          className="top-[15%] left-[10%] animate-delay-0 z-20"
        />
        <FloatingIcon
          icon={<Brush />}
          className="top-[25%] right-[15%] animate-delay-1000 z-20"
        />
        <FloatingIcon
          icon={<Scissors />}
          className="bottom-[20%] left-[15%] animate-delay-2000 z-20"
        />

        {/* Hero Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent animate-glow">
            About Acrilc
          </h1>
          <p className="text-xl md:text-2xl text-amber-50/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Where artists find their voice, and art finds its home.
          </p>
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 px-6 py-3 rounded-full backdrop-blur-md text-yellow-400 animate-bounce-slow">
            <Heart className="w-4 h-4" />
            <span>Celebrating Traditional Artisans</span>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="py-20 md:py-32 opacity-0 translate-y-12 bg-white transition-all duration-1000 animate-on-scroll"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-800 via-orange-600 to-teal-800 bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe art shouldn&apos;t be confined by algorithms or
              corporate noise. It deserves a space that breathes, evolves, and
              honors the creative spirit.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {visionContent.map((item, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-yellow-200/50 bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="py-20 md:py-32 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 translate-y-12 transition-all duration-1000 animate-on-scroll"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-800 via-orange-600 to-teal-800 bg-clip-text text-transparent">
              Our Philosophy
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe in the power of art to transform lives and communities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {philosophyContent.map((item, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-yellow-200/50 bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Quote */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-red-900 via-teal-800 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <blockquote className="text-3xl md:text-5xl font-serif font-normal mb-8 leading-tight">
            &quot;We don&apos;t build for users, we build with artists.&quot;
          </blockquote>
          <p className="text-xl text-yellow-400">— The Acrilc Manifesto</p>
        </div>
      </section>

      {/* Community Matters Section */}
      <section
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="py-20 md:py-32 opacity-0 translate-y-12 transition-all duration-1000 animate-on-scroll"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-800 via-orange-600 to-teal-800 bg-clip-text text-transparent">
              Community Matters
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Because art isn&apos;t just about creating—it&apos;s about
              connecting.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {communityContent.map((item, index) => (
              <Card
                key={index}
                className="group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-yellow-200/50 bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={(el) => {
          sectionsRef.current[3] = el;
        }}
        className="py-20 md:py-32 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 translate-y-12 transition-all duration-1000 animate-on-scroll"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-800 via-orange-600 to-teal-800 bg-clip-text text-transparent">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group text-center p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl border-yellow-200/50 bg-white/90 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-conic from-yellow-400 via-orange-500 to-teal-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <CardContent className="relative z-10">
                  <div className="text-orange-600 mb-8 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={(el) => {
          sectionsRef.current[4] = el;
        }}
        id="team"
        className="py-20 md:py-32 opacity-0 translate-y-12 transition-all duration-1000 animate-on-scroll"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-800 via-orange-600 to-teal-800 bg-clip-text text-transparent">
              Behind Acrilc
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the humans who believe in art&apos;s power to change the
              world.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl border-yellow-200/50 bg-white/90 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 mb-4 font-medium group-hover:text-teal-700 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-slate-900 via-teal-800 to-red-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-teal-500 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Create?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
            Join a community that celebrates your art for what it is, not how
            many likes it gets.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white px-8 py-8 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-[280px] rounded-full"
            >
              <Brush className="w-5 h-5 mr-2" />
              Start Creating Portfolio
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white hover:bg-white hover:text-slate-900 px-8 py-8 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-[280px]"
            >
              <GalleryHorizontal className="w-5 h-5 mr-2" />
              Explore Galleries
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.8));
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 4s ease-in-out infinite alternate;
        }

        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-delay-0 {
          animation-delay: 0s;
        }
        .animate-delay-1000 {
          animation-delay: 2s;
        }
        .animate-delay-2000 {
          animation-delay: 4s;
        }

        .animate-on-scroll.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @media (max-width: 768px) {
          .floating-art {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutAcrilc;
