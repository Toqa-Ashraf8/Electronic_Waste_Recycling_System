import React from 'react';
import { FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './TrackingPage.css';

const TrackingPage = () => {
  const myRequests = [
    { id: 'REQ-101', status: 'Pending', date: '2026-04-10' },
    { id: 'REQ-105', status: 'Accepted', date: '2026-04-08' },
    { id: 'REQ-109', status: 'Rejected', date: '2026-04-05' },
  ];

  return (
    <div className="tracking-wrapper">
      <div className="tracking-header">
        <h2>Requests Status</h2>
        <p>View and track your submitted requests</p>
      </div>
      <div className="table-container">
        <table className="modern-track-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Submission Date</th>
              <th>Status & Updates</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((req) => (
              <tr key={req.id}>
                <td className="id-column">#{req.id}</td>
                <td className="date-column">{req.date}</td>
                <td>
                  {req.status === 'Pending' && (
                    <div className="status-inline pending">
                      <FiClock className="status-icon" />
                      <div className="msg-content">
                        <strong>Under Review</strong>
                        <span>We're checking your items, stay tuned! </span>
                      </div>
                    </div>
                  )}

                  {req.status === 'Accepted' && (
                    <div className="status-inline accepted">
                      <FiCheckCircle className="status-icon" />
                      <div className="msg-content">
                        <strong>Accepted</strong>
                        <span>Great news! Points have been added to your profile </span>
                      </div>
                    </div>
                  )}

                  {req.status === 'Rejected' && (
                    <div className="status-inline rejected">
                      <FiXCircle className="status-icon" />
                      <div className="msg-content">
                        <strong>Rejected</strong>
                        <span>We couldn't accept this. Please try another request </span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackingPage;