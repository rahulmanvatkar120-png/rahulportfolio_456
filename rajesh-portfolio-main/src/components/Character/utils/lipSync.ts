import * as THREE from "three";
import { GLTF } from "three-stdlib";

let headBone: THREE.Object3D | null = null;
let isSpeaking = false;
let animationFrameId: number | null = null;
let originalY = 0;

export const initLipSync = (gltf: GLTF) => {
  console.log("Initializing lip sync...");
  
  headBone = gltf.scene.getObjectByName("spine006") || null;
  
  if (headBone) {
    originalY = headBone.position.y;
    console.log("Head bone found for lip sync!");
  } else {
    console.log("Head bone NOT found for lip sync");
  }
};

export const startSpeaking = (): boolean => {
  if (!headBone) return false;
  if (isSpeaking) return true;
  
  isSpeaking = true;
  runAnimation();
  return true;
};

export const stopSpeaking = () => {
  isSpeaking = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (headBone) {
    headBone.position.y = originalY;
  }
};

const runAnimation = () => {
  let tick = 0;
  
  const loop = () => {
    if (!isSpeaking || !headBone) return;
    
    tick += 0.1;
    const bounce = Math.abs(Math.sin(tick * 3)) * 0.02;
    headBone.position.y = originalY + bounce;
    
    animationFrameId = requestAnimationFrame(loop);
  };
  
  loop();
};

export const speakText = (text: string): Promise<void> => {
  console.log("Speaking:", text);
  
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => startSpeaking();
    utterance.onend = () => { stopSpeaking(); resolve(); };
    utterance.onerror = () => { stopSpeaking(); resolve(); };
    
    window.speechSynthesis.speak(utterance);
  });
};

export const isLipSyncReady = () => headBone !== null;
