import Input from "@components/Input";
import { useCartContext } from "@contexts/CartContext";
import { userCreateOrder } from "@services/order.service";
import { Button, Col, Input as InputAntd, Row, Typography } from "antd";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { CheckoutContainer } from "./styled";
import { useNavigate } from "react-router-dom";
import formatCurrency from "@utils/formatCurrency";

const schema = yup.object({
  name: yup
    .string()
    .required("Không được để trống trường này")
    .min(5, "Tên phải lớn hơn 4 ký tự"),
  address: yup
    .string()
    .required("Không được để trống trường này")
    .min(5, "Địa chỉ lớn hơn 4 ký tự"),
  phone: yup
    .string()
    .required("Không được để trống trường này")
    .length(10, "Số điện thoại phải 10 ký tự"),
  email: yup
    .string()
    .required("Không được để trống trường này")
    .email("Phải đúng định dạng email"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useCartContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      note: "",
    },
    validationSchema: schema,
    async onSubmit(values) {
      try {
        const data = await userCreateOrder(values);
        if (data) {
          toast.success("Tạo hóa đơn thành công!");
          cart?.refetchCart?.();
        }
        navigate(`/payment/${data?._id}`);
      } catch (error) {
        toast.error("Có gì đó đang sai!");
      }
    },
  });

  return (
    <CheckoutContainer>
      <div className="container">
        <Row gutter={20}>
          <Col span={14}>
            <div className="checkout-main">
              <Typography className="checkout-heading">
                THÔNG TIN THANH TOÁN
              </Typography>
              <div className="checkout-form">
                <Typography>Họ và tên *</Typography>
                <Input
                  type="text"
                  value={formik.values.name}
                  errorMessage={formik.errors.name}
                  onChange={(e) => formik.setFieldValue("name", e.target.value)}
                />
                <Typography>Địa chỉ *</Typography>
                <Input
                  type="text"
                  value={formik.values.address}
                  onChange={(e) =>
                    formik.setFieldValue("address", e.target.value)
                  }
                  errorMessage={formik.errors.address}
                />
                <Typography>Số điện thoại *</Typography>
                <Input
                  type="text"
                  value={formik.values.phone}
                  onChange={(e) =>
                    formik.setFieldValue("phone", e.target.value)
                  }
                  errorMessage={formik.errors.phone}
                />
                <Typography>Địa chỉ email *</Typography>
                <Input
                  type="text"
                  value={formik.values.email}
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                  errorMessage={formik.errors.email}
                />
                <Typography>Ghi chú đơn hàng</Typography>
                <InputAntd.TextArea
                  rows={4}
                  value={formik.values.note}
                  onChange={(e) => formik.setFieldValue("note", e.target.value)}
                ></InputAntd.TextArea>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className="pay">
              <Typography className="total-title">ĐƠN HÀNG CỦA BẠN</Typography>
              <table className="pay-table">
                <tr className="pay-table-heading">
                  <th>SẢN PHẨM</th>
                  <th className="w-[22%]">SỐ LƯỢNG</th>
                  <th className="w-[25%]">Discount</th>
                  <th className="w-[25%]">ĐƠN GIÁ</th>
                </tr>
                {cart?.cart?.item.map((item, index) => (
                  <tr key={index}>
                    <td className="text-start">{item?.product.name}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.product.promotion}%</td>
                    <td>
                      {formatCurrency(
                        (item?.product?.price *
                          item?.quantity *
                          (100 - (item?.product.promotion ?? 0))) /
                          100
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="total-label">
                    THÀNH TIỀN:
                  </td>
                  <td className="total-price">
                    {formatCurrency(cart?.totalPrice)}
                  </td>
                </tr>
              </table>
              <Typography className="mb-5 font-medium">
                PHƯƠNG THỨC THANH TOÁN:
              </Typography>
              <div className="cash ">
                <Typography>Thanh toán online</Typography>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/963/963778.png"
                  alt=""
                  className="w-[40px]"
                />
              </div>
              <Button
                className="order-btn"
                onClick={() => formik.handleSubmit()}
              >
                ĐẶT HÀNG
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </CheckoutContainer>
  );
};

export default Checkout;
