import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingle } from '../../../backend/Controller/Product.COntroller';
import { getSingleProduct } from '../redux/Products/product.actions';

const SingleProd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);
  console.log(state.isError);
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id]);

  return <div></div>;
};

export default SingleProd;
