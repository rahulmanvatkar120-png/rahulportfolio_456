import "./styles/WhatIDo.css";

const WhatIDo = () => {
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in" style={{ display: 'block' }}>
          
          <div className="what-content" style={{ minHeight: 'auto', marginBottom: '30px' }}>
            <div className="what-border1">
              <svg width="100%">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>FRONTEND DEVELOPMENT</h3>
              <h4>Building Interactive UIs</h4>
              <p>Crafting performant, responsive interfaces across platforms.</p>
              <h5>SKILLS & TOOLS</h5>
              <div className="what-content-flex">
                <div className="what-tags">Unity</div>
                <div className="what-tags">Flutter</div>
                <div className="what-tags">React Native</div>
                <div className="what-tags">React.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">HTML</div>
                <div className="what-tags">CSS</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Bootstrap</div>
                <div className="what-tags">Tailwind CSS</div>
                <div className="what-tags">Responsive Design</div>
                <div className="what-tags">UI/UX Implementation</div>
                <div className="what-tags">Figma</div>
                <div className="what-tags">Firebase</div>
                <div className="what-tags">API Integration</div>
                <div className="what-tags">WebRTC</div>
              </div>
            </div>
          </div>

          <div className="what-content" style={{ minHeight: 'auto', marginBottom: '30px' }}>
            <div className="what-border1">
              <svg width="100%">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>BACKEND DEVELOPMENT</h3>
              <h4>Scalable Server Architecture</h4>
              <p>Designing robust APIs and server-side logic.</p>
              <h5>SKILLS & TOOLS</h5>
              <div className="what-content-flex">
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">MongoDB</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">REST API Development</div>
                <div className="what-tags">JWT Authentication</div>
                <div className="what-tags">CRUD Operations</div>
                <div className="what-tags">File Upload Handling</div>
                <div className="what-tags">OpenAI API</div>
                <div className="what-tags">AI Integration</div>
                <div className="what-tags">Twilio</div>
                <div className="what-tags">WhatsApp API</div>
                <div className="what-tags">WebSocket</div>
                <div className="what-tags">Server-side Logic</div>
                <div className="what-tags">Database Integration</div>
              </div>
            </div>
          </div>

          <div className="what-content" style={{ minHeight: 'auto' }}>
            <div className="what-border1">
              <svg width="100%">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>TOOLS & PLATFORMS</h3>
              <h4>Development & Deployment</h4>
              <p>Tools and platforms for efficient development.</p>
              <h5>SKILLS & TOOLS</h5>
              <div className="what-content-flex">
                <div className="what-tags">Git</div>
                <div className="what-tags">GitHub</div>
                <div className="what-tags">Postman</div>
                <div className="what-tags">VS Code</div>
                <div className="what-tags">npm</div>
                <div className="what-tags">Firebase</div>
                <div className="what-tags">AWS Basics</div>
                <div className="what-tags">Vercel</div>
                <div className="what-tags">Netlify</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
