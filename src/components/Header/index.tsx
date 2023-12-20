import {
  AppstoreOutlined,
  BarsOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "@assets/logo-nobg.png";
import { useAuthContext } from "@contexts/AuthContext";
import { ISubCategory } from "@interfaces/ISubCategory";
import { getCategoryWithSubCate } from "@services/category.service";
import { useQuery } from "@tanstack/react-query";
import { Dropdown, Input, MenuProps, Typography } from "antd";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { HeaderContainer } from "@components/Header/styled";
import { useCartContext } from "@contexts/CartContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const auth = useAuthContext();
  const cart = useCartContext();
  const params = useParams();

  const navigate = useNavigate();
  const { data } = useQuery(["category"], getCategoryWithSubCate, {
    refetchOnWindowFocus: false,
  });

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setSearchValue(params?.value ?? ``);
  }, [params]);

  const renderLink = () => {
    return data?.map((item: any, index: number) => {
      const items = item?.subcategories?.map((subcate: ISubCategory) => ({
        key: subcate?._id,
        label: (
          <div
            onClick={() =>
              navigate(`/san-pham-theo-danh-muc-phu/${subcate?._id}`)
            }
          >
            {subcate.name}
          </div>
        ),
      }));
      return (
        <li key={index} className="relative ">
          <Dropdown menu={{ items }} placement="bottom">
            <Typography
              className=" text-[14px] cursor-pointer hover:text-[#c48c46] hover:underline"
              onClick={() =>
                navigate(`/san-pham-theo-danh-muc/${item?._id?._id}`)
              }
            >
              {item?._id?.name}
            </Typography>
          </Dropdown>
        </li>
      );
    });
  };

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            navigate("/tai-khoan/thong-tin");
          }}
        >
          Thông tin tài khoản
        </div>
      ),
      icon: <AppstoreOutlined />,
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            navigate("/tai-khoan/lich-su");
          }}
        >
          Lịch sử đơn hàng
        </div>
      ),
      icon: <BarsOutlined />,
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            localStorage.removeItem("access_token");
            toast("Đăng xuất thành công!");
            navigate("/dang-nhap");
            auth?.logout?.();
          }}
        >
          Đăng xuất
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <HeaderContainer>
      <div className="container relative">
        <div className="header-top">
          <div className="header-info flex items-center">
            <div className="mr-5">
              <div>
                <img
                  src="https://cdn.pnj.io/images/image-update/layout/icon-stores-new.svg"
                  alt=""
                />
                Cửa Hàng
              </div>
            </div>
            <div>
              <img
                src="https://cdn.pnj.io/images/image-update/layout/icon-hotline-new.svg"
                alt=""
              />
              1800 54 54 57
            </div>
          </div>
          <img
            src={logo}
            alt=""
            className="header-logo"
            onClick={() => navigate("/")}
          />
          <div className="header-user flex items-center">
            <Link to={"/gio-hang"} className="flex mr-5 text-[14px]">
              <div className="relative mr-1">
                <img
                  src="https://cdn.pnj.io/images/image-update/layout/icon-cart-new.svg"
                  alt=""
                  className=""
                />
                <span className="absolute bottom-[-8px] right-[-3px] flex justify-center items-center w-[15px] h-[15px] bg-[red] text-white rounded-[20px] text-[10px]">
                  {cart?.totalItem ?? 0}
                </span>
              </div>
              Giỏ Hàng
            </Link>
            <div className="">
              {auth.user ? (
                <Dropdown menu={{ items: dropdownItems }}>
                  <Link to={auth.user ? `/tai-khoan/thong-tin` : `/dang-nhap`}>
                    <UserOutlined className="mr-[5px] text-[18px]" />
                    {auth.user?.fullName
                      ? `Hi, ${auth.user?.fullName}`
                      : "Tài khoản của tôi"}
                  </Link>
                </Dropdown>
              ) : (
                <Link to={auth.user ? `/tai-khoan/thong-tin` : `/dang-nhap`}>
                  <UserOutlined className="mr-[5px] text-[18px]" />
                  {auth.user?.fullName
                    ? `Hi, ${auth.user?.fullName}`
                    : "Tài khoản của tôi"}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="header-bottom ">
          <ul className="header-link">
            {renderLink()}
            <li>
              <NavLink
                to={"/tin-tuc"}
                className={({ isActive }) => (isActive ? `link-active` : ``)}
              >
                Tin tức
              </NavLink>
            </li>
          </ul>
          <Input
            placeholder="Tìm kiếm trang sức"
            className="header-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue !== "") {
                navigate(`/tim-kiem/${searchValue}`);
              }
            }}
            suffix={<SearchOutlined />}
          />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
