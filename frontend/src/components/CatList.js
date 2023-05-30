import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QueryCat = () => {
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cat');

      if (response.data.code === 200 && response.data.message === 'success') {
        setCats(response.data.data);
      } else {
        setError('Failed to fetch cats');
      }
    } catch (err) {
      setError('Failed to fetch cats');
    }
  };

  return (
    <div>
      <h2>Query Cat</h2>
      {cats.length > 0 ? (
        <ul>
          {cats.map((cat) => (
            <li key={cat.id}>
              <p>Cat ID: {cat.id}</p>
              <p>Cat Type: {cat.catType}</p>
              <p>Cat Name: {cat.catName}</p>
              <p>Remark: {cat.remark}</p>
              {cat.url && <img src={cat.url} alt="Cat" />}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cats found</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default QueryCat;
