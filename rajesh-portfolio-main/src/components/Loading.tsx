import { useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
    import("./utils/initialFX").then((module) => {
      setTimeout(() => {
        if (module.initialFX) {
          module.initialFX();
        }
        setIsLoading(false);
      }, 300);
    });
  };

  if (entered) {
    return null;
  }

  return (
    <div className="holo-splash">
      <div className="holo-circle">
        <div className="holo-ring"></div>
        <div className="holo-ring holo-ring-2"></div>
        <div className="holo-content">
          <h1 className="holo-name">RAHUL</h1>
          <h1 className="holo-name holo-name-2">MANVATKAR</h1>
          <div className="holo-bar-wrap">
            <div className="holo-bar" style={{ width: `${percent}%` }} />
          </div>
          <p className="holo-percent">{percent}%</p>
          {percent >= 100 && (
            <button className="holo-btn" onClick={handleEnter}>
              ENTER
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  const interval = setInterval(() => {
    percent += Math.random() * 15 + 5;
    if (percent >= 100) {
      percent = 100;
      setLoading(100);
      clearInterval(interval);
    } else {
      setLoading(Math.floor(percent));
    }
  }, 150);
  return {
    loaded: () => Promise.resolve(100),
    percent,
    clear: () => clearInterval(interval),
  };
};
