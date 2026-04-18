import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lock from './pages/Lock';
import Intro from './pages/Intro';
import Story from './pages/Story';
import Video from './pages/Video';
import Surprises from './pages/Surprises';
import Final from './pages/Final';
import FloatingHearts from './components/FloatingHearts';

function App() {
  const [step, setStep] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    nextStep();
  };

  const pages = [
    <Lock key="lock" next={handleUnlock} />,
    <Intro key="intro" next={nextStep} />,
    <Story key="story" next={nextStep} prev={prevStep} />,
    <Video key="video" next={nextStep} prev={prevStep} />,
    <Surprises key="surprises" />,
    <Final key="final" next={nextStep} />,
  ];

  return (
    <div className="app">
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {pages[step]}
      </AnimatePresence>
    </div>
  );
}

export default App;