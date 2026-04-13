import React, { useEffect, useState } from "react";
import "./SellDevice.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRecycle, FaGift, FaMoneyBillWave, FaLeaf } from "react-icons/fa";
import { 
  Save, 
  BrushCleaning, 
  Search, 
  Trash ,
  PackagePlus , 
  LayoutDashboard,
  ListTree  
} from 'lucide-react';
import { BsFillSendFill } from "react-icons/bs";
import { 
  FiTag, 
  FiBox, 
  FiUpload, 
  FiHeart, 
  FiTruck, 
  FiNavigation, 
  FiMapPin, 
  FiCalendar ,
  FiPlus,
  FiTrash2, 
  FiEdit 
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, fetchItems } from "../../services/categoryService";
import { 
  resetRequestForm,
  setEditRequestIndex, 
  setRemoveRequestIndex, 
  setRequestValues 
} from "../../redux/selldevice/sellingSlice";
import { 
  fetchBrands, 
  fetchPriceEstimation, 
  fetchRequests, 
  saveData, 
  saveDeviceImagePath 
} from "../../services/sellingService";
import { variables } from "../../components/variables";
import { toast } from "react-toastify";
import DeleteRequestModal from "../../components/modals/DeleteRequestModal";

function SellDevice() {
  const { categories, itemsList } = useSelector((state) => state.category);  
  const {userAddress,userID} = useSelector((state) => state.auth);
  const { 
    request, 
    brands ,
    priceEstimation,
    deviceImgPath,
    requestsList,
    isDeleteReqModalOpen
  } = useSelector((state) => state.selldevice);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [activeMethod, setActiveMethod] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    dispatch(setRequestValues({ [name]: value }));
    if (name === 'DeviceCategory') {
        const selectedCat = categories.find(c => c.CategoryID === parseInt(value));
        const categoryName = selectedCat ? selectedCat.CategoryName : "";
        dispatch(setRequestValues({ 
        DeviceCategory: categoryName, 
        CategoryID: value 
      }));
      if(value!=='-1'){
        await dispatch(fetchItems(value));
      }
     
    }
     else if (name === 'DeviceItem') {
        const selectedItem = itemsList.find(c => c.ItemID === parseInt(value));
        const itemName = selectedItem ? selectedItem.ItemName : "";
        dispatch(setRequestValues({ 
        DeviceItem: itemName, 
        ItemID: value 
      }));
      if(value!=='-1'){
          await dispatch(fetchBrands(value));
      }
     
    }
    if (name === 'DeviceQuality') {
      const params={ 
        ItemID:request.ItemID , 
        Quality:value ,
        CategoryID:request.CategoryID
      }
      handleQualityAnimation(value);
      await dispatch(fetchPriceEstimation(params));
    }
  
  };

  const handleImageUpload=async(e)=>{
    const { name } = e.target;
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    const fileName = file.name;
    formData.append("deviceFile", file, fileName);
    await dispatch(saveDeviceImagePath(formData));
    dispatch(setRequestValues({[name]:fileName }));
  }

  const handleQualityAnimation = (value) => {
    const estimateBox = document.getElementById('estimateBox');
    if (value !== "-1" && estimateBox) {
      estimateBox.classList.remove('is-dimmed');
      estimateBox.classList.add('animate__pulse');
    } else if (estimateBox) {
      estimateBox.classList.add('is-dimmed');
    }
  };
const handlePickUpHome=()=>{
  setActiveMethod('home');
  dispatch(setRequestValues({ PickUpMethod: 0 , ShippingAddress:userAddress}));
}
const handlePickUpdropoff=()=>{
  setActiveMethod('dropoff');
  dispatch(setRequestValues({ PickUpMethod: 1 }));
}

const handleSave=async()=>{
  const data={UserID:userID ,...request};
  
  try {
      const result=await dispatch(saveData(data)).unwrap();
    if(result.saved){
      await dispatch(fetchRequests()).unwrap();
      toast.success(`Your Request ID is #${result.id}`,{
        theme:'colored',
        position:'top-right'
      })
    }
    else if(result.updated){
      toast.success("Request updated successfully",{
        theme:'colored',
        position:'top-right'
      })
    }
 } 
 catch (error) {} 
}

const handleEditRequest=async(index)=>{
dispatch(setEditRequestIndex(index));
    const categoryRow=requestsList[index].CategoryID;
    const itemRow=requestsList[index].ItemID;
    const qualityRow=requestsList[index].DeviceQuality;
    const params={ 
        ItemID:itemRow , 
        Quality:qualityRow ,
        CategoryID:categoryRow
    }
    await dispatch(fetchItems(categoryRow));
    await dispatch(fetchBrands(itemRow));
    await dispatch(fetchPriceEstimation(params));
    if(requestsList[index].PickUpMethod===0){
      setActiveMethod('home');
    }
    if(requestsList[index].PickUpMethod===1){
      setActiveMethod('dropoff');
    } 
 
}
const handleRemove=(index)=>{
dispatch(setRemoveRequestIndex(index));
}

const handleClear=()=>{
  dispatch(resetRequestForm());
   setActiveMethod('');
}
useEffect(() => {
  const loadInitialData=async()=>{
      await Promise.all([
        dispatch(fetchCategories()).unwrap(),
        dispatch(fetchRequests()).unwrap(),
      ]);
  }
  loadInitialData();
}, [dispatch]);

  return (
    <div>
      {isDeleteReqModalOpen && <DeleteRequestModal/>}
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="btns-container-sell col">
          <button className="btn btn-sell" onClick={()=>handleClear()}>
            <PackagePlus size={25} color="black" />
          </button>
          <button className="btn btn-sell" onClick={()=>handleSave()}>
            <BsFillSendFill size={25} color="teal" />
          </button>  
          <button className="btn btn-sell">
            <ListTree size={25} color="#312063" onClick={()=>navigate('/tracking-requests')} />
          </button>
        </div>

        <div className="card-header-hud">
          <FaRecycle className="card-icon-hud" />
          <h1 className="card-title-hud">VALUE YOUR E-WASTE</h1>
          <p className="card-subtitle-hud">Get an instant estimate for your items</p>
        </div>

        <div className="rewards-banner-hud">
          <FaGift className="rewards-icon-hud" />
          <p className="rewards-text-hud">
            <strong>Every Sale is Rewarded!</strong> Earn <strong>10 Points</strong>.
            <Link to="/points" className="rewards-learn-more-hud"> Learn More</Link>
          </p>
        </div>

        <div className="main-form-grid-hud">
          <div className="form-column-inputs-hud">
            <h2 className="section-title-hud">1. Item Details</h2>
            <div className="inputs-inline-row">
               <div className="form-group-hud">
                <label className="label-hud">Request ID</label>
                <input
                  className="form-control idInput"
                  name="RequestID"
                  value={request.RequestID || 0}
                  onChange={handleChange}
                  disabled
                  />
              </div>
              <div className="form-group-hud">
                <label className="label-hud">Category</label>
                <select
                  className="form-select"
                  name="DeviceCategory"
                  value={request.CategoryID || "-1"}
                  onChange={handleChange}
                  required>
                  <option value="-1">- Select Category -</option>
                  {categories.map((c, index) => (
                    <option key={index} value={c.CategoryID}>
                      {c.CategoryName}
                    </option>
                  ))}
                </select>
              </div>

              {request.CategoryID && request.CategoryID !== "-1" && (
                <div className="form-group-hud">
                  <label className="label-hud">Item</label>
                  <select
                    className="form-select"
                    name="DeviceItem"
                    value={request.ItemID || '-1'}
                    onChange={handleChange}
                    required
                  >
                    <option value="">- Select Item -</option>
                    {itemsList.map((item, index) => (
                      <option key={index} value={item.ItemID}>{item.ItemName}</option>
                    ))}
                  </select>
                </div>
              )}

              {request.DeviceItem && (
                <div className="form-group-hud">
                  <label className="label-hud">Brand Name</label>
                  <select
                    className="form-select"
                    name="DeviceBrand"
                    value={request.DeviceBrand}
                    onChange={handleChange}
                    required>
                    <option value="-1">- select Brand -</option>
                    {brands.map((b, index) => (
                      <option key={index} value={b.BrandName}>{b.BrandName}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

           
         <div className="quality-condition-grid-hud">   
          <div className="form-group-hud" >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label className="label-hud">Quality</label>
              <select
                className="form-select qualityinp"
                name="DeviceQuality"
                value={request.DeviceQuality}
                onChange={handleChange}
                required
              >
                <option value="-1">- Select -</option>
                <option value="20%">20%</option>
                <option value="50%">50%</option>
                <option value="80%">80%</option>
                <option value="100%">100%</option>
              </select>
            </div>

           {priceEstimation?.Condition && request.DeviceQuality !== "-1" && (
            <div className="animate__animated animate__fadeIn">
              <span className="badge-condition-hud">
                Condition: <strong>{priceEstimation.Condition}</strong>
              </span>
            </div>
          )}
          </div>
          <div 
            id="estimateBox" 
            className="price-estimate-box-hud is-dimmed animate__animated"
          >
              <FaMoneyBillWave className="price-icon-hud" />
              <div>
                <p className="price-label-hud">Suggested price based on selected quality:</p>
                <p className="price-value-hud">
                  {priceEstimation?.EstimatedPrice ? priceEstimation.EstimatedPrice : 0} EGP
                </p>
              </div>
            </div>
         </div>          
            </div>
          <div className="form-column-image-hud">
            <h2 className="section-title-hud">2. Device Image (preferred)</h2>
                    <label htmlFor="imageUpload" className="image-upload-wrapper-hud">   
                    {deviceImgPath  && (
                      <img 
                          className="image-upload-box-hud" 
                          src={variables.DEVICEIMG_API +deviceImgPath }
                          alt=""
                      />
                  )}
                 {!deviceImgPath && (
                <div className="upload-overlay-hud">
                    <FiUpload size={24} />
                    <p>Upload Photo</p>
                </div>
                 )}
              </label>
            <input
              type="file"
              id="imageUpload"
              className="d-none"
              name="DeviceImagePath"
              onChange={handleImageUpload}
            />

            <h2 className="section-title-hud with-margin-top">3. Pickup Info</h2>
            <div className="pickup-method-selector-hud">
              <button
                type="button"
                className={`method-btn-hud ${activeMethod === 'home' ? 'active' : ''}`}
                onClick={() =>handlePickUpHome() }
              ><FiTruck /> Home
              </button>
              <button
                type="button"   
                className={`method-btn-hud ${activeMethod === 'dropoff' ? 'active' : ''}`}
                onClick={() => handlePickUpdropoff()}
              ><FiNavigation /> Drop-off
              </button>
            </div>

            {activeMethod === 'home' && (
              <div className="form-group-hud animate__animated animate__fadeIn">
                <label className="label-hud" style={{width:'150px'}}>Home Address</label>
                <input 
                type="text" 
                className="form-control" 
                name="ShippingAddress"
                defaultValue={userAddress}
                value={request.ShippingAddress}
                onChange={handleChange}
                required  />
              </div>
            )}
            {activeMethod === 'dropoff' && (
              <div className="form-group-hud animate__animated animate__fadeIn">
                <label className="label-hud">Select Branch</label>
                <select 
                className="form-select" 
                required
                name="ShippingAddress"
                value={request.ShippingAddress}
                onChange={handleChange}
                >
                  <option value="-1">- Choose nearest branch -</option>
                  <option value="cairo">Cairo</option>
                  <option value="alex">Alexandria</option>
                </select>
              </div>
            )}
            <div className="form-group-hud">
              <label className="label-hud">Pickup Date</label>
              <input 
              type="date" 
              className="form-control" 
              name="PickUpDate"
              value={request.PickUpDate}
              onChange={handleChange}
              required />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
   <div className="table-wrapper-scroll">
       <table className="table table-striped table-bordered animate__animated animate__fadeInUp">
          <thead className="custom-table-header">
            <tr>
              <th>Request ID</th>
              <th>Category</th>
              <th>Item</th>
              <th>Device Brand</th>
              <th>Quality</th>
              <th>Condition</th> 
              <th>Price</th>
              <th>Address</th> 
              <th>PickUp Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          
              <tbody>
                {requestsList.length > 0 ? (
                  requestsList.map((req, index) => (
                    <tr key={req.RequestID || index}>
                      <td>{req.RequestID}</td>
                      <td>{req.DeviceCategory}</td>
                      <td>{req.DeviceItem}</td>
                      <td>{req.DeviceBrand}</td>
                      <td>{req.DeviceQuality}</td>
                    <td>
                      <div style={{ fontWeight: '600' }}>
                        {req.DeviceCondition === 'Good' && (
                          <span style={{ color: 'teal'}}>{req.DeviceCondition}</span>
                        )}
                        {req.DeviceCondition === 'Fair' && (
                          <span style={{ color: '#f9a825' }}>{req.DeviceCondition}</span>
                        )}
                        {req.DeviceCondition === 'Scrap/Bad' && (
                          <span style={{ color: '#e53935' }}>{req.DeviceCondition}</span>
                        )}
                        {req.DeviceCondition === 'Excellent' && (
                          <span style={{ color: 'green' }}>{req.DeviceCondition}</span>
                        )}
                      </div>
                    </td>
                    <td>{req.EstimatedPrice} EGP</td>
                    <td>{req.ShippingAddress}</td>
                    <td>{req.PickUpDate?.split('T')[0]}</td>
                    <td className="text-center">
                      <FiEdit 
                      className="action-icon edit" 
                      style={{ cursor: 'pointer', marginRight: '10px', color: '#55a690' }}
                      onClick={()=>handleEditRequest(index)}
                      />
                      <FiTrash2 
                      className="action-icon delete" 
                      style={{ cursor: 'pointer', color: '#e53935' }} 
                      onClick={()=>handleRemove(index)}
                      />
                    </td>
                  </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} 
                      style={{ color: "#a0a0a0", fontStyle: "italic", 
                               textAlign: "center", padding: "20px" }}>
                        No requests to show yet.
                      </td>
                    </tr>
                  )}
                </tbody>
            </table>
      </div>
     </div>
  );
}

export default SellDevice;