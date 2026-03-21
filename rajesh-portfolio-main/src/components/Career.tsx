import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Insource Consultancy Pvt. Ltd.</h5>
              </div>
              <h3>23 November 2023 – Present</h3>
            </div>
            <p>
              Working on the development of applications and solutions using Unity, Flutter, React Native, and AI technologies, including voice assistants and offline chatbot systems. Experience includes building innovative digital solutions with a focus on user experience and technical excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
