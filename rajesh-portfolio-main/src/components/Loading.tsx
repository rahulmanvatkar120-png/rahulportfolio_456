import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus, Icosahedron, Octahedron, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

const CoreRings = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.5;
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.7;
      ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.3;
      ring3Ref.current.rotation.x = Math.sin(t * 0.5 + 1) * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 2;
      coreRef.current.rotation.x = t * 1.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#00ffff" wireframe />
      </mesh>
      
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ff00ff" transparent opacity={0.6} />
      </mesh>
      
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

const SciFiParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 800;
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 3 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i3] = 0; colors[i3 + 1] = 1; colors[i3 + 2] = 1;
    } else if (colorChoice < 0.66) {
      colors[i3] = 1; colors[i3 + 1] = 0; colors[i3 + 2] = 1;
    } else {
      colors[i3] = 0; colors[i3 + 1] = 1; colors[i3 + 2] = 0.53;
    }
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0008;
      particlesRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  );
};

const HolographicRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.5;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -5]} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[3, 3.1, 64]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
};

const FloatingShapes = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Torus args={[1, 0.3, 16, 100]} position={[-4, 2, -3]}>
          <MeshDistortMaterial color="#00ffff" speed={2} distort={0.3} transparent opacity={0.7} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Icosahedron args={[0.8, 0]} position={[4, -1, -4]}>
          <MeshDistortMaterial color="#ff00ff" speed={1.5} distort={0.4} transparent opacity={0.7} />
        </Icosahedron>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <Octahedron args={[0.6, 0]} position={[3, 2.5, -5]}>
          <MeshDistortMaterial color="#00ff88" speed={2} distort={0.3} transparent opacity={0.7} />
        </Octahedron>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.8}>
        <TorusKnot args={[0.5, 0.15, 100, 16]} position={[-3, -2, -4]}>
          <MeshDistortMaterial color="#ff8800" speed={1.8} distort={0.25} transparent opacity={0.7} />
        </TorusKnot>
      </Float>
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.5}>
        <Icosahedron args={[0.5, 0]} position={[0, -3, -6]}>
          <MeshDistortMaterial color="#ff0066" speed={2} distort={0.35} transparent opacity={0.6} />
        </Icosahedron>
      </Float>
    </>
  );
};

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          RM
        </a>
      </div>
      
      <div className="scifi-loading-screen">
        <div className="scifi-canvas-container">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1.5} />
            <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={1} />
            <pointLight position={[0, 0, 5]} color="#ffffff" intensity={0.5} />
            <CoreRings />
            <SciFiParticles />
            <HolographicRing />
            <FloatingShapes />
          </Canvas>
        </div>
        
        <div className="scifi-overlay">
          <div className="scifi-grid"></div>
          <div className="scifi-scanline"></div>
          <div className="scifi-vignette"></div>
        </div>
        
        <div className="scifi-corner-accent scifi-corner-tl"></div>
        <div className="scifi-corner-accent scifi-corner-tr"></div>
        <div className="scifi-corner-accent scifi-corner-bl"></div>
        <div className="scifi-corner-accent scifi-corner-br"></div>
        
        <div className="scifi-hologram-line"></div>
        
        <div className="scifi-content">
          <div className="scifi-title-container">
            <div className="scifi-title-prefix">PORTFOLIO</div>
            <div className="scifi-title">
              <span className="scifi-letter">R</span>
              <span className="scifi-letter">A</span>
              <span className="scifi-letter">H</span>
              <span className="scifi-letter">U</span>
              <span className="scifi-letter">L</span>
              <div className="scifi-space"></div>
              <span className="scifi-letter">M</span>
              <span className="scifi-letter">A</span>
              <span className="scifi-letter">N</span>
              <span className="scifi-letter">V</span>
              <span className="scifi-letter">A</span>
              <span className="scifi-letter">T</span>
              <span className="scifi-letter">K</span>
              <span className="scifi-letter">A</span>
              <span className="scifi-letter">R</span>
            </div>
          </div>
          
          <div className="scifi-loading-bar-container">
            <div className="scifi-loading-bar">
              <div className="scifi-loading-progress" style={{ width: `${percent}%` }}></div>
              <div className="scifi-loading-glow"></div>
            </div>
            <div className="scifi-loading-text">
              <span>INITIALIZING</span>
              <span className="scifi-percent">{percent}%</span>
            </div>
          </div>
          
          <div className="scifi-status">
            <div className="scifi-dot-container">
              <span className="scifi-dot"></span>
              <span className="scifi-dot"></span>
              <span className="scifi-dot"></span>
            </div>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
        
        <div className="loading-marquee">
          <Marquee>
            <span>Full Stack Developer</span> <span>Software Engineer</span>
            <span>Creative Developer</span> <span>Tech Enthusiast</span>
          </Marquee>
        </div>
        
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>ENTER</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
