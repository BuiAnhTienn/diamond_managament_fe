import { ICart, TProductInCart } from '@interfaces/cart.interface';
import { IProductInCartPayload } from '@interfaces/product.interface';
import {
  getUserCart,
  updateCartInCartPage,
  updateCartInDetailPage,
} from '@services/cart.service';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

interface ICartContextProps {
  cart?: ICart;
  totalItem?: number;
  refetchCart?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ICart, unknown>>;
  updateProductToCart?: UseMutateFunction<
    unknown,
    unknown,
    IProductInCartPayload[],
    unknown
  >;
  totalPrice?: number;
  updateCartData?: () => void;
  updateCartTempCart?: (product: TProductInCart) => void;
  getProductInCart?: (productId: string) => TProductInCart | undefined;
  removeAllProductInCart?: () => void;
  addProductToCartInDetailPage?: (productId: string) => void;
}

const CartContext = createContext<ICartContextProps | undefined>(undefined);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartState, setCartState] = useState<ICart | undefined>(undefined);
  const { data: cart, refetch: refetchCart } = useQuery(
    ['user-cart'],
    getUserCart,
    {
      enabled: false,
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    refetchCart();
  }, []);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  const { mutate: updateProductToCartMutate } = useMutation(
    updateCartInCartPage,
    {
      onSuccess: () => {
        toast.success('Cập nhật giỏ hàng thành công!');
        refetchCart();
      },
      onError: () => {
        toast.error('Có gì đó đang sai!');
      },
    }
  );

  const { mutate: updateCartInDetailPageMutate } = useMutation(
    updateCartInDetailPage,
    {
      onSuccess: () => {
        toast.success('Cập nhật giỏ hàng thành công!');
        refetchCart();
      },
      onError: () => {
        toast.error('Có gì đó đang sai!');
      },
    }
  );

  const addProductToCartInDetailPage = (productId: string) => {
    const payload: IProductInCartPayload[] = [
      { product: productId, quantity: 1 },
    ];
    updateCartInDetailPageMutate(payload);
  };

  const updateCartData = (cartItem?: TProductInCart[]) => {
    const payload: any[] | undefined = (
      cartItem ??
      (cartState?.item || [])
    ).map((item) => ({
      product: item?.product._id,
      quantity: item?.quantity,
    }));
    updateProductToCartMutate(payload as any);
  };

  const updateCartTempCart = (product: TProductInCart) => {
    setCartState((prev) => {
      if (product?.quantity) {
        if (
          prev!.item?.some((item) => item?.product._id === product.product._id)
        ) {
          return {
            ...prev!,
            item: prev!.item?.map((item) =>
              item?.product?._id === product?.product?._id
                ? { ...item, quantity: product.quantity }
                : item
            ),
          };
        } else {
          return {
            ...prev!,
            item: [...(prev!.item ?? []), product],
          };
        }
      } else {
        return {
          ...prev!,
          item: prev!.item.filter(
            (item) => item?.product?._id !== product?.product?._id
          ),
        };
      }
    });
  };

  const getProductInCart = (productId: string) => {
    return (
      cartState?.item?.find((item) => item?.product?._id === productId) ??
      undefined
    );
  };

  const removeAllProductInCart = () => {
    const emptyArr: TProductInCart[] = [];
    setCartState((prev) => ({ ...prev!, item: emptyArr }));
    updateProductToCartMutate([]);
  };

  const totalItem = cartState?.item?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem?.quantity;
  }, 0);

  const totalPrice = cartState?.item?.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      currentItem.quantity * currentItem?.product?.price -
      ((currentItem?.product.price * (currentItem?.product?.promotion ?? 0)) /
        100) *
        currentItem.quantity
    );
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart: cartState,
        totalItem,
        totalPrice,
        updateCartData,
        updateCartTempCart,
        getProductInCart,
        refetchCart,
        removeAllProductInCart,
        addProductToCartInDetailPage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => useContext(CartContext);

export default CartContextProvider;
