import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ItemDetail() {
  // use id from item from URL
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // API call for detailed info
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `https://marketplace-api.sshopencloud.eu/api/tools-services/${id}`,
        );
        setItemDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Fehler beim Abrufen der Dateilinformationen:', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!itemDetails) {
    return <div>No details found for this item.</div>;
  }

  return (
    <div>
      <h1>{itemDetails.label}</h1>
      <p>
        <strong>Accessible at:</strong> {itemDetails.accessibleAt}
      </p>
      <p>
        <strong>Contributors:</strong> {itemDetails.contributors.join(', ')}
      </p>
    </div>
  );
}
