import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  FaArrowRight, 
  FaLeaf, 
  FaLightbulb, 
  FaGem, 
  FaSlidersH, 
  FaTags,
  FaMapMarkedAlt, 
  FaPaperPlane, 
  FaCheckCircle
} from "react-icons/fa";

const Home = () => {
  const options = { triggerOnce: true, threshold: 0.2 };
  const { ref: heroRef, inView: heroInView } = useInView(options);
  const { ref: whoWeAreRef, inView: whoWeAreInView } = useInView(options);
  const { ref: splitSectionRef, inView: splitSectionInView } = useInView(options);
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({ ...options, threshold: 0.1 });

  return (
    <div className="home-page-genesis">
      <main className="main-content-area">
        {/* ========== 1. HERO SECTION ========== */}
        <section ref={heroRef} className="hero-section-genesis">
          <div className="hero-overlay-genesis"></div>
          <div className={`hero-content-genesis ${heroInView ? "animate__animated animate__fadeIn" : "hidden"}`}>
            <h1 className="hero-title-main animate__animated animate__pulse animate__infinite">
              FUTURE OF GREEN TECHNOLOGY
            </h1>
            <p className="hero-subtitle-genesis">
              At E-VIVE, we merge cutting-edge technology with ecological responsibility to redefine the lifecycle of electronics.
            </p>
            <Link to="/sell-your-device" className="btn-primary-genesis">
              Start Selling Now <FaArrowRight className="animate__animated animate__shakeX animate__infinite" />
            </Link>
          </div>
        </section>

        {/* ========== 2. WHO WE ARE SECTION ========== */}
          <section ref={whoWeAreRef} className="about-us-modern">
              <div className="container">
                <div className={`about-grid ${whoWeAreInView ? "animate__animated animate__fadeIn" : "hidden"}`}>
                  
                  <div className="about-images-stack">
                    <div className="main-img-frame">
                      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" alt="Tech" className="img-1" />
                    </div>
                    <div className="sub-img-frame animate__animated animate__float animate__infinite">
                      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" alt="Nature" className="img-2" />
                    </div>
                  </div>

   
                  <div className="about-text-content">
                    <span className="badge-tech">WHO WE ARE</span>
                    <h2 className="title-modern">The Intersection of <span className="highlight">Tech & Ecology</span></h2>
                    <p className="description-text">
                      At E-VIVE, we don't just recycle; we reinvent. We believe your old devices carry the seeds of a greener future. 
                      Our mission is to bridge the gap between high-end innovation and environmental preservation.
                    </p>
                    
                    <div className="mini-features">
                      <div className="feature-item">
                        <div className="feature-icon"><FaLeaf /></div>
                        <div>
                          <h4>Eco-Friendly</h4>
                          <p>100% Zero-waste goal.</p>
                        </div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon"><FaLightbulb /></div>
                        <div>
                          <h4>Smart Tech</h4>
                          <p>AI-driven valuations.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          <section ref={splitSectionRef} className="sell-section-clean">
          <div className="container">
            <div className="sell-card-wrapper">
              <div className={`sell-info ${splitSectionInView ? "animate__animated animate__fadeInLeft" : "hidden"}`}>
                <h2 className="title-modern">Turn Your E-Waste Into <span className="highlight">Value</span></h2>
                <p>Don't let your old gadgets gather dust. We provide the fastest way to get a fair price while saving the planet.</p>
                
                <ul className="custom-list">
                  <li><FaCheckCircle /> Instant price estimation</li>
                  <li><FaCheckCircle /> Free doorstep pickup</li>
                  <li><FaCheckCircle /> Secure data wiping</li>
                </ul>

                <Link to="/sell-your-device" className="btn-primary-genesis">
                  Sell Your Device <FaArrowRight />
                </Link>
              </div>

              <div className={`sell-image-box ${splitSectionInView ? "animate__animated animate__fadeInRight" : "hidden"}`}>
                <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800" alt="Sell Device" />
                <div className="floating-badge animate__animated animate__pulse animate__infinite">
                  <FaGem /> <span>Best Rates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== 4. HOW IT WORKS (Timeline) ========== */}
        <section ref={howItWorksRef} className="how-it-works-modern">
          <div className="container">
            <div className={`section-header-genesis ${howItWorksInView ? "animate__animated animate__fadeInDown" : "hidden"}`}>
              <h2>Your Journey To Value</h2>
            </div>
            <div className="timeline-horizontal">
              {[
                { icon: <FaSlidersH />, step: "1", title: "Evaluate", desc: "Define quality" },
                { icon: <FaTags />, step: "2", title: "Get Quote", desc: "Instant pricing" },
                { icon: <FaMapMarkedAlt />, step: "3", title: "Pickup", desc: "Set schedule" },
                { icon: <FaPaperPlane />, step: "4", title: "Earn", desc: "Get points" }
              ].map((item, i) => (
                <div key={i} className={`timeline-node ${howItWorksInView ? "animate__animated animate__fadeInRight" : "hidden"}`} style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="node-icon animate__animated animate__bounceIn animate__delay-1s">
                    {item.icon}
                    <span className="step-number">{item.step}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;