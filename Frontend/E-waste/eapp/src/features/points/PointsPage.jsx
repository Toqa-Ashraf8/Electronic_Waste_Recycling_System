import React from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaBoxOpen, FaAward, FaSearchDollar } from 'react-icons/fa';
import { RiShieldCheckFill } from 'react-icons/ri';
import { BsArrowDown } from 'react-icons/bs';
import './PointsPage.css';

const PointsPage = () => {
    return (
        <div className="points-page-wrapper">
            <header className="points-header">
                <h1 className="points-title">Rewards Journey</h1>
                <p className="points-subtitle">How your old tech turns into shopping credit</p>
            </header>

            <div className="points-container">
                <div className="process-timeline">
                    <div className="timeline-item">
                        <div className="timeline-icon">
                            <FaBoxOpen />
                        </div>
                        <div className="timeline-content">
                            <h3>1. Submit Your Request</h3>
                            <p>Send us your device details and its current condition through our selling form. Be as accurate as possible!</p>
                        </div>
                    </div>

                    <div className="timeline-connector"><BsArrowDown /></div>
                    <div className="timeline-item">
                        <div className="timeline-icon highlight">
                            <FaSearchDollar />
                        </div>
                        <div className="timeline-content">
                            <h3>2. Physical Inspection</h3>
                            <p>Once we receive your device, our technical team performs a professional check to verify its status and hardware health.</p>
                        </div>
                    </div>

                    <div className="timeline-connector"><BsArrowDown /></div>
                    <div className="timeline-item">
                        <div className="timeline-icon">
                            <RiShieldCheckFill />
                        </div>
                        <div className="timeline-content">
                            <h3>3. Admin Evaluation</h3>
                            <p>Based on the final inspection, <strong>our management determines the reward points</strong>. Better device condition means higher points!</p>
                        </div>
                    </div>

                    <div className="timeline-connector"><BsArrowDown /></div>
                    <div className="timeline-item">
                        <div className="timeline-icon">
                            <FaWallet />
                        </div>
                        <div className="timeline-content">
                            <h3>4. Points Dispatched</h3>
                            <p>Approved points are added instantly to your wallet. You'll find them waiting for you in your profile dashboard.</p>
                        </div>
                    </div>
                </div>
                <div className="rewards-usage-grid">
                    <div className="usage-card">
                        <FaAward className="usage-icon" />
                        <h4>Shop for Free</h4>
                        <p>Use your collected points to get high-quality tech products from our store without paying cash.</p>
                    </div>
                    <div className="usage-card">
                        <div className="percentage-icon">%</div>
                        <h4>Instant Discounts</h4>
                        <p>Not enough points for a full product? No problem. Use them as a discount on your total subtotal.</p>
                    </div>
                </div>
                <div className="points-footer-cta">
                    <h3>Ready to let our experts value your device?</h3>
                    <div className="cta-group">
                        <Link to="/sell-your-device" className="btn-primary-tq">Start Sell Request</Link>
                        <Link to="/userprofile" className="btn-secondary-tq">Check My Balance</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsPage;