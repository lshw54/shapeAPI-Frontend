import React, { useState } from 'react';
import axios from 'axios';

const UpdateCat = () => {
  const [catType, setCatType] = useState('');
  const [catName, setCatName] = useState('');
  const [remark, setRemark] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:3001/cat', {
        catType,
        catName,
        remark,
      });

      if (response.data.code === 200 && response.data.message === 'success') {
        setSuccess(true);
        setError(null);
      } else {
        setError('Failed to update cat information');
        setSuccess(false);
      }
    } catch (err) {
      setError('Failed to update cat information');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Update Cat Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cat Type</label>
          <input
            type="text"
            className="form-control"
            value={catType}
            onChange={(e) => setCatType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cat Name</label>
          <input
            type="text"
            className="form-control"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Remark</label>
          <input
            type="text"
            className="form-control"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Cat</button>
      </form>
      {success && <p>Cat information updated successfully</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateCat;
