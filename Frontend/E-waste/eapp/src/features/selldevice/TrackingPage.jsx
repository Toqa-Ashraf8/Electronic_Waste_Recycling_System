import React, { useEffect } from 'react';
import { FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import './TrackingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../../services/sellingService';

const TrackingPage = () => {
    const {requestsList}=useSelector((state)=>state.selldevice);
    const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(fetchRequests());
  },[dispatch])

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
            {requestsList && requestsList.map((req) => (
              <tr key={req.RequestID}>
                <td className="id-column">#{req.RequestID}</td>
                <td className="date-column">{req.SubmissionDate.split('T')[0]}</td>
                <td>
                  {req.RequestStatus === 0 && (
                    <div className="status-inline pending">
                      <FiClock className="status-icon" />
                      <div className="msg-content">
                        <strong>Under Review</strong>
                        <span>We're checking your items, stay tuned! </span>
                      </div>
                    </div>
                  )}

                  {req.RequestStatus === 1 && (
                    <div className="status-inline accepted">
                      <FiCheckCircle className="status-icon" />
                      <div className="msg-content">
                        <strong>Accepted</strong>
                        <span>Great news! Points have been added to your profile </span>
                      </div>
                    </div>
                  )}

                  {req.RequestStatus=== 2 && (
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