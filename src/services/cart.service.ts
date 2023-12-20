import { privateInstance } from '@axios/axios';
import { ICart } from '@interfaces/cart.interface';
import { IProductInCartPayload } from '@interfaces/product.interface';

export const updateCartInDetailPage = async (
  productsInCart?: IProductInCartPayload[]
) => {
  const result = await privateInstance.patch('/cart/update-item', {
    item: productsInCart,
  });
  return result.data;
};

export const getUserCart = async () => {
  const result = await privateInstance.get('/cart/me');
  return result.data as ICart;
};

export const updateCartInCartPage = async (
  productsInCart?: IProductInCartPayload[]
) => {
  const result = await privateInstance.put('/cart', {
    item: productsInCart,
  });
  return result.data;
};
