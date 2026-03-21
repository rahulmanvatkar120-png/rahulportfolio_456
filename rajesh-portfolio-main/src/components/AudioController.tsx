import { useEffect, useRef, useState } from "react";
import { speakText, startSpeaking, stopSpeaking, isLipSyncReady } from "./Character/utils/lipSync";
import "./styles/AudioController.css";

const AudioController = () => {
  const [audioStarted, setAudioStarted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [showButton, setShowButton] = useState(true);

  const playSciFiSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const oscillator1 = ctx.createOscillator();
      const oscillator2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(220, ctx.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
      
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(440, ctx.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);

      oscillator1.connect(filter);
      oscillator2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator1.start(ctx.currentTime);
      oscillator2.start(ctx.currentTime);
      oscillator1.stop(ctx.currentTime + 2);
      oscillator2.stop(ctx.currentTime + 2);

      return ctx;
    } catch (e) {
      console.log("Audio context error:", e);
      return null;
    }
  };

  const startAudioSequence = () => {
    if (audioStarted) return;
    
    setAudioStarted(true);
    setShowButton(false);
    
    playSciFiSound();
    
    if (isLipSyncReady()) {
      startSpeaking();
    }
    
    speakText("Hi, I am Rahul Manvatkar. Software Engineer.").then(() => {
      if (isLipSyncReady()) {
        stopSpeaking();
      }
    });
  };

  useEffect(() => {
    const handleClick = () => {
      if (!audioStarted) {
        startAudioSequence();
      }
    };
    
    document.addEventListener('click', handleClick, { once: true });
    document.addEventListener('keydown', handleClick, { once: true });
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleClick);
    };
  }, [audioStarted]);

  if (!showButton) return null;

  return (
    <div className="audio-start-overlay" onClick={startAudioSequence}>
      <div className="audio-start-content">
        <div className="audio-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </div>
        <div className="audio-text">Click anywhere to enable audio</div>
      </div>
    </div>
  );
};

export default AudioController;
