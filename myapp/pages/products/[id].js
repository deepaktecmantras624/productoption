import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import axios from "axios";
import Productform from "../productForm";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details based on ID from the API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        setProduct(response.data); // Assuming the API response contains product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return <>{product && <Productform product={product} />}</>;
};

export default ProductDetailPage;
