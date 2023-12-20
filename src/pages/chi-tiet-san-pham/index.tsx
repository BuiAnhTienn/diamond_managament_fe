import {
  CheckCircleFilled,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Button from "@components/Button";
import { useAuthContext } from "@contexts/AuthContext";
import { useCartContext } from "@contexts/CartContext";
import { IComment } from "@interfaces/comment.interface";
import { IProductInCartPayload } from "@interfaces/product.interface";
import { updateCartInDetailPage } from "@services/cart.service";
import { createComment, getCommentByProduct } from "@services/comment.service";
import { getProductById } from "@services/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import formatCurrency from "@utils/formatCurrency";
import { Breadcrumb, Col, Collapse, Row, Space, Typography } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swiper1 from "./components/swiper1";
import Swiper2 from "./components/swiper2";
import {
  BreadcrumbsContainer,
  DescContainer,
  PrdInfoContainer,
} from "./styled";

const ChiTietSanPham = () => {
  const cart = useCartContext();
  const auth = useAuthContext();
  const paramsId = useParams();

  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [commentValue, setCommentValue] = useState<string>();
  const [quantity, setQuantity] = useState(0);

  const { data } = useQuery(["get-product-by-id"], () =>
    getProductById(paramsId.id as string)
  );

  const { data: commentList, refetch: refetchComments } = useQuery(
    ["get-comments"],
    () => getCommentByProduct(paramsId.id as string)
  );

  const { mutateAsync: createCommentMutate } = useMutation(createComment, {
    onSuccess: () => {
      toast.success(`Gửi bình luận thành công`);
      refetchComments();
      setCommentValue("");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  const quantityStatus =
    data?.quantity === 0
      ? "Hết hàng"
      : (data?.quantity as number) > 10
      ? "Còn hàng"
      : "Sắp hết hàng";

  const increase = () => {
    const quantityInCart =
      cart?.getProductInCart?.(paramsId?.id ?? ``)?.quantity ?? 0;

    if (quantity < (data?.quantity ?? 0) - quantityInCart) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decline = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleCommentBtn = () => {
    createCommentMutate({
      content: commentValue as string,
      product: paramsId.id as string,
    });
  };

  const updateProductInCart = async () => {
    try {
      const payload: IProductInCartPayload[] = [
        { product: paramsId?.id ?? ``, quantity },
      ];
      const result = await updateCartInDetailPage(payload);
      if (result) {
        toast.success("Thêm vào giỏ hàng thành công!");
        cart?.refetchCart?.();
      }
    } catch (error) {
      toast.success("Có gì đó đang sai!");
    }
  };

  return (
    <div className="px-[20%] pb-10">
      <BreadcrumbsContainer>
        <Breadcrumb
          items={[
            { title: "Trang chủ" },
            {
              title: (
                <Link to="" className="breadcrumb-crr">
                  Nhẫn
                </Link>
              ),
            },
            {
              title: (
                <Link to="" className="breadcrumb-crr">
                  {data?.name}
                </Link>
              ),
            },
          ]}
          className="breadcrumb"
        />
      </BreadcrumbsContainer>
      <Row gutter={[20, 22]}>
        <Col span={15}>
          <Row gutter={22}>
            <Col span={4}>
              <Swiper1
                data={data?.image}
                setThumbsSwiper={setThumbsSwiper}
              ></Swiper1>
            </Col>
            <Col span={20}>
              <Swiper2 data={data?.image} thumbsSwiper={thumbsSwiper} />
              <div className="mt-2 text-center">
                <img src="https://cdn.pnj.io/images/p_detail/anh.svg" />
                <p className="text-[10px]">Hình ảnh</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={9}>
          <PrdInfoContainer>
            <Typography className="prd-name">{data?.name}</Typography>
            <Typography className="prd-price">
              {formatCurrency(data?.price)}
            </Typography>
            <Space size="large"></Space>
            <Typography className="prd-info">
              <span className="font-medium text-[#ad2a36]">
                {quantityStatus}
              </span>{" "}
              - Gọi Hotline
              <span className="ml-1 font-medium text-[#ad2a36]">
                1800545457 - 1800 5454 57 (Free)
              </span>
              Ưu đãi độc quyền
            </Typography>
            <div className="flex items-center mb-5">
              <Space size="large">
                <ButtonGroup className="count-btns items-center ">
                  <Button
                    type="text"
                    onClick={decline}
                    icon={<MinusOutlined className="!text-[10px]" />}
                    disabled={!auth.user}
                    className="plus-btn"
                  />
                  <span className="count-numb px-3 leading-9 ">{quantity}</span>
                  <Button
                    type="text"
                    onClick={increase}
                    icon={<PlusOutlined className="!text-[10px]" />}
                    disabled={!auth.user}
                    className="minus-btn"
                  />
                </ButtonGroup>
              </Space>
              <Button
                onClick={updateProductInCart}
                className={`w-full h-[40px] !rounded-[5px] ${
                  data?.quantity === 0 || !auth.user ? `!bg-slate-400` : ""
                }`}
                disabled={data?.quantity === 0 || !auth.user}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            <ul className="more-info">
              <li>
                <CheckCircleFilled className="more-info-icon" />
                <span className="more-info-desc">
                  Giá sản phẩm thay đổi tuỳ trọng lượng vàng và đá
                </span>
              </li>
              <li>
                <CheckCircleFilled className="more-info-icon" />
                <span className="more-info-desc">
                  Đổi sản phẩm trong 48h tại hệ thống cửa hàng DIAMOND
                </span>
              </li>
              <li>
                <CheckCircleFilled className="more-info-icon" />
                <span className="more-info-desc">
                  Cầm đồ và Thu mua. Xem chi tiết
                </span>
              </li>
              <li>
                <CheckCircleFilled className="more-info-icon" />
                <span className="more-info-desc">
                  Miễn phí giao nhanh Toàn Quốc 1-7 ngày, xem thêm Chính sách
                  giao hàng
                </span>
              </li>
            </ul>
          </PrdInfoContainer>
        </Col>
        <Col span={18}>
          <Collapse
            items={[
              {
                key: "1",
                label: (
                  <p className="text-[18px] font-semibold">Mô tả sản phẩm</p>
                ),
                children: (
                  <DescContainer>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.description ?? ``,
                      }}
                    ></div>
                  </DescContainer>
                ),
              },
              {
                key: "2",
                label: <p className="text-[18px] font-semibold">Bình luận</p>,
                children: (
                  <div className="px-[30px]">
                    <ul className="list-none">
                      {commentList?.map((item: IComment) => (
                        <li key={item._id} className="my-4 text-[14px]">
                          <span className="mr-3 font-medium">
                            {item.user.fullName}:
                          </span>
                          <span>{item.content}</span>
                        </li>
                      ))}
                    </ul>
                    <Typography className="mb-2">Viết bình luận:</Typography>
                    {auth.user ? (
                      <div>
                        <TextArea
                          rows={4}
                          placeholder="Nhập bình luận"
                          value={commentValue}
                          onChange={(e) => setCommentValue(e.target.value)}
                          className="mb-4"
                        />
                        <Button
                          onClick={() => handleCommentBtn()}
                          className="w-[150px] h-[36px] !bg-secondaryColor !rounded-md text-[14px] font-semibold"
                        >
                          Gửi bình luận
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => navigate("/dang-nhap")}
                        className="h-[40px] !bg-secondaryColor !rounded-md"
                      >
                        Đăng nhập để bình luận
                      </Button>
                    )}
                  </div>
                ),
              },
            ]}
            expandIcon={({ isActive }) => (
              <RightOutlined
                rotate={isActive ? 90 : 0}
                className="absolute right-0"
              />
            )}
            bordered={false}
            defaultActiveKey={["1"]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ChiTietSanPham;
