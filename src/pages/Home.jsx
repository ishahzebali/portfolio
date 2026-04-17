import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Expertise from '../components/home/Expertise';
import Projects from '../components/home/Projects';
import SecretZone from '../components/home/SecretZone';
import Contact from '../components/home/Contact';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <SecretZone />
      <Contact />
    </div>
  );
};

export default Home;
