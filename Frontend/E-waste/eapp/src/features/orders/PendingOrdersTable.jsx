import React from "react";
import { FaStar, FaTimes,FaCheck } from 'react-icons/fa';
export const PendingOrdersTable=({handleOrderApprove,handleOrderReject,variables,zoomDeviceImage,requests})=>{
 return(
    <div className="table-responsive">
            <table className="bootstrap-table">
                <thead>
                <tr>
                    <th>ReqID</th>
                    <th>Customer</th>
                    <th>Device</th>
                    <th>Condition/Quality</th>
                    <th>Expected Points</th>
                    <th style={{width:'100px'}}> Image</th>
                    <th>PickUp Date</th>
                    <th>Current Status</th>
                    <th>Actions / Steps</th> 
                </tr>
                </thead>
                <tbody>
                {requests.length>0 ?( requests.map((req,index)=>
                    <tr key={req.RequestID || index}>
                    <td>{req.RequestID}</td>
                    <td><strong>{req.UserName}</strong></td>
                    <td>{req.DeviceItem}</td>
                    <td>
                        <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <span>{req.DeviceCondition}/</span>
                        <span>{req.DeviceQuality}</span>
                        </div>
                        </td>
                    <td>
                        <div 
                        style={{
                        display:'flex',
                        gap:'5px',
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <span>{req.Points}</span>
                        <span >
                        <FaStar size={20} color="#fbff03" style={{marginTop:'-3px'}}/>
                        </span>
                        </div>
                        </td>
                    <td>
                        <div className="img-container" 
                        onClick={()=>zoomDeviceImage(index,"pending")}>
                         {req.DeviceImagePath ? ( 
                        <img 
                        src={variables.DEVICEIMG_API+req.DeviceImagePath}
                        alt=""
                        className="dev-img"
                        />) :(
                            <div className="empty-img">No image</div>
                        )}
                       
                        </div>
                    
                    </td>
                    <td>
                    {req.PickUpDate.split('T')[0]}
                    </td>
                    <td>
                    <div>
                        {req.RequestStatus === 0 && (
                            <span style={{
                                backgroundColor: '#fffbeb',
                                color: '#b45309',           
                                padding: '4px 12px',
                                borderRadius: '12px',      
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                border: '1px solid #fef3c7',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                                }}>
                                <span style={{ 
                                    width: '6px', 
                                    height: '6px', 
                                    backgroundColor: '#f59e0b', 
                                    borderRadius: '50%' 
                                }}></span> 
                                Pending
                                </span>
                                )}
                            </div>
                            </td>
                        <td>
                        <div className="workflow-actions">
                        {req.RequestStatus === 0 && (
                            <div className="order-actions-wrapper">
                            <button 
                            className="btn-hud btn-accept" 
                            title="Accept Order"
                            onClick={()=>handleOrderApprove(index)}
                            >
                            <FaCheck />
                            </button>
                            <button 
                            className="btn-hud btn-reject" 
                            title="Reject Order"
                            onClick={()=>handleOrderReject(index)}
                            >
                            <FaTimes />
                            </button>
                        </div>
                        )} 
                        </div>
                        </td>
                    </tr>
                   )) :(
                  <tr>
                    <td colSpan={9} className="empty-msg">
                      No Pending Orders 
                    </td>
                  </tr>
                )}
                </tbody>
            </table>
    </div>
 )
}


