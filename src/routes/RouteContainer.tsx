import UserLayout from '@components/user-layout';
import { Role } from '@constants/Role';
import Admin from '@pages/admin';
import Warehouse from '@pages/admin/Warehouse';
import CategoryAdmin from '@pages/admin/category-admin';
import EditOrder from '@pages/admin/edit-order';
import OrderAdmin from '@pages/admin/order-admin';
import ProductAdmin from '@pages/admin/product-admin';
import StatisticAdmin from '@pages/admin/statistics-admin';
import SubCategoryList from '@pages/admin/subcategory-admin';
import TrendingProduct from '@pages/admin/trending-product';
import UpsertCategory from '@pages/admin/upsert-category';
import UpsertProduct from '@pages/admin/upsert-product';
import UpsertProductInWarehouse from '@pages/admin/upsert-product-in-warehouse';
import UpsertSubCategory from '@pages/admin/upsert-subcategory';
import UpsertWarehouse from '@pages/admin/upsert-warehouse';
import UserAdmin from '@pages/admin/user-admin';
import Checkout from '@pages/checkout';
import ChiTietDonHang from '@pages/chi-tiet-don-hang';
import ChiTietSanPham from '@pages/chi-tiet-san-pham';
import ChiTietTinTuc from '@pages/chi-tiet-tin-tuc';
import ForgotPassword from '@pages/forgot-password';
import GioHang from '@pages/gio-hang';
import Login from '@pages/login';
import Payment from '@pages/payment';
import SanPhamTheoDanhMuc from '@pages/san-pham-theo-danh-muc';
import SanPhamTheoDanhMucPhu from '@pages/san-pham-theo-danh-muc-phu';
import SignUp from '@pages/sign-up';
import ThongTinTaiKhoan from '@pages/tai-khoan';
import DoiMatKhau from '@pages/tai-khoan/components/doi-mat-khau';
import LichSu from '@pages/tai-khoan/components/lich-su';
import ThongTin from '@pages/tai-khoan/components/thong-tin';
import TimKiem from '@pages/tim-kiem';
import TinTuc from '@pages/tin-tuc';
import TrangChu from '@pages/trang-chu';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AccessDenied from '@pages/access-denied';

export const RouteContainer = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute isNomarlRoute notRoles={[Role.ADMIN]} />}>
        <Route element={<UserLayout />}>
          <Route element={<TrangChu />} path={'/'} />
          <Route element={<ChiTietSanPham />} path={'/san-pham/:id'} />
          <Route
            element={<SanPhamTheoDanhMuc />}
            path='/san-pham-theo-danh-muc/:category_id'
          ></Route>
          <Route
            element={<SanPhamTheoDanhMucPhu />}
            path='/san-pham-theo-danh-muc-phu/:subcategory_id'
          ></Route>
          <Route element={<TrangChu />} path='/lien-he'></Route>
          <Route element={<TinTuc />} path='/tin-tuc'></Route>
          <Route element={<ChiTietTinTuc />} path='/tin-tuc/:id'></Route>
          <Route element={<TimKiem />} path='/tim-kiem/:value'></Route>
          <Route element={<GioHang />} path='/gio-hang'></Route>
          <Route element={<Checkout />} path='/checkout'></Route>
          <Route element={<Payment />} path='/payment/:id'></Route>
        </Route>
      </Route>
      <Route
        element={<PrivateRoute roles={[Role.USER]} notRoles={[Role.ADMIN]} />}
      >
        <Route element={<UserLayout />}>
          <Route element={<ThongTinTaiKhoan />} path='/tai-khoan'>
            <Route element={<ThongTin />} path='thong-tin' />
            <Route element={<LichSu />} path='lich-su' />
            <Route element={<ChiTietDonHang />} path='don-hang/:id' />
            <Route element={<DoiMatKhau />} path='doi-mat-khau' />
            <Route element={<GioHang />} path='gio-hang' />
          </Route>
        </Route>
      </Route>
      <Route element={<PrivateRoute roles={[Role.ADMIN]} />}>
        <Route element={<Admin />} path='/admin/*'>
          <Route element={<StatisticAdmin />} path='statistics' />
          <Route element={<OrderAdmin />} path='order' />
          <Route element={<EditOrder />} path='order/:id' />
          <Route element={<CategoryAdmin />} path='category' />
          <Route element={<UpsertCategory />} path='upsert-category/:id' />
          <Route element={<UpsertCategory />} path='upsert-category/' />
          <Route element={<SubCategoryList />} path='sub-category/' />
          <Route element={<UpsertSubCategory />} path='upsert-sub-category/' />
          <Route
            element={<UpsertSubCategory />}
            path='upsert-sub-category/:id'
          />
          <Route element={<ProductAdmin />} path='product' />
          <Route element={<UpsertProduct />} path='upsert-product/' />
          <Route element={<UpsertProduct />} path='upsert-product/:id' />
          <Route element={<Warehouse />} path='warehouse' />
          <Route element={<UpsertWarehouse />} path='upsert-warehouse' />
          <Route element={<UpsertWarehouse />} path='upsert-warehouse/:id' />
          <Route element={<UserAdmin />} path='user' />
          <Route
            element={<UpsertProductInWarehouse />}
            path='upsert-product-in-warehouse/:id'
          />
          <Route element={<TrendingProduct />} path='trending' />
        </Route>
      </Route>
      <Route element={<Login />} path='dang-nhap' />
      <Route element={<SignUp />} path='dang-ky' />
      <Route element={<ForgotPassword />} path='quen-mat-khau' />
      <Route element={<div>Not Found</div>} path='*' />
      <Route element={<AccessDenied></AccessDenied>} path='/access-denied' />
    </Routes>
  );
};

export default RouteContainer;
