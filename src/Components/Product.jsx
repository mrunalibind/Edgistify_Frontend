import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Product.css"

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  
  const fetchProducts = async (currentPage) => {
    try {
        const token = localStorage.getItem("token"); // Get token from local storage

        const response = await fetch(`https://edgistify-backend-oh53.onrender.com/api/product/getProducts?page=${currentPage}&perPage=10`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
        if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setTotalPages(data.products.totalPages);
      
      setProducts(data.products.docs); // Assuming `docs` is the array returned from `paginate`
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      {products.length === 0 ? (
        <p className="noProducts">No products found</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <Card key={product._id} prop={product}/>
          ))}
        </div>
      )}
      <div className="btn-block">
        <div>
          <button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
