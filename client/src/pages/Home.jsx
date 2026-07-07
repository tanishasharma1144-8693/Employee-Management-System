import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";
import About from "../components/landing/About";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <About />
      <Testimonials />
      <Footer />
    </>
  );
}