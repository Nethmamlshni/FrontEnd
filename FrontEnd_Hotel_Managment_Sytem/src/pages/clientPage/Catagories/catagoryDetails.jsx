import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryDetails() {
  const { id } = useParams(); // Get the category ID from the URL
  const [category, setCategory] = useState(null); // State to store category details
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state

  // Fetch category details when the component mounts
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/category/${id}`);
        console.log(response); 
        if (!response.ok) {
          throw new Error('Failed to fetch category details');
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  if (loading) {
    return <p>Loading category details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!category) {
    return <p>No category found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <p>{category.description}</p>
      {/* Include more category fields as needed */}
      <ul>
        {category.items?.map((item, index) => (
          <li key={index}>{item}</li> // Example of rendering a list of items
        ))}
      </ul>
    </div>
  );
}
