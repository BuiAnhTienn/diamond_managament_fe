import {
  MailOutlined,
  NotificationOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { getOrderById } from "@services/order.service";
import { useQuery } from "@tanstack/react-query";
import formatCurrency from "@utils/formatCurrency";
import { Col, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import qr from "../../assets/qr.jpg";
import { PaymentContainer } from "./styled";
const Payment = () => {
  const { id } = useParams();
  const { data } = useQuery(["order", id], () => getOrderById(id ?? ``));

  const totalPrice = data?.item?.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      currentItem.quantity * currentItem?.product?.price -
      ((currentItem?.product.price * (currentItem?.product?.promotion ?? 0)) /
        100) *
        currentItem.quantity
    );
  }, 0);

  return (
    <PaymentContainer>
      <div className="container py-7">
        <Row gutter={40}>
          <Col span={10}>
            <div className="h-[1px] bg-[#d2d2d2]"></div>
            <table className="pay-table">
              <tr className="pay-table-heading">
                <th>SẢN PHẨM</th>
                <th className="w-[22%]">SỐ LƯỢNG</th>
                <th className="w-[25%]">ĐƠN GIÁ</th>
              </tr>
              {data?.item?.map((item: any) => {
                return (
                  <tr key={item._id}>
                    <td className="text-start">{item?.product?.name}</td>
                    <td>{item?.quantity}</td>
                    <td>
                      {formatCurrency(
                        item?.product?.price * item?.quantity -
                          (item?.product?.price *
                            item?.quantity *
                            (item?.product?.promotion ?? 0)) /
                            100
                      )}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className="px-4 py-2 bg-bgBlur rounded-md">
              <Typography className="mb-2 text-[18px] font-semibold">
                Chi tiết thanh toán:
              </Typography>
              <Typography className="flex justify-between">
                Tổng tiền:
                <b className="text-[18px]">{formatCurrency(totalPrice)}</b>
              </Typography>
            </div>
          </Col>
          <Col span={14}>
            <Typography className="mb-2 font-semibold text-[20px]">
              Chuyển khoản bằng QR
            </Typography>
            <div className="flex">
              <img src={qr} alt="" className="w-[150px] mr-5" />
              <ul className="list-none">
                <li>Bước 1: Mở app ngân hàng và quét mã QR</li>
                <li>
                  Bước 2: Đảm bảo nội dung chuyển khoản là thanhtoanhoadonmuakc
                </li>
                <li>Bước 3: Thực hiện thanh toán</li>
              </ul>
            </div>
            <div className="mb-2">
              <Typography className="mb-2 font-semibold text-[20px]">
                Chuyển khoản thủ công
              </Typography>
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <div className="px-4 py-2 bg-bgBlur rounded-md">
                    <Typography>Số tài khoản</Typography>
                    <Typography>0596 6552 501</Typography>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="px-4 py-2 bg-bgBlur rounded-md">
                    <Typography>Tên tài khoản</Typography>
                    <Typography>BUI ANH TIEN</Typography>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="px-4 py-2 bg-bgBlur rounded-md">
                    <Typography>Nội dung</Typography>
                    <Typography>THANHTOANMUAKC</Typography>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="px-4 py-2 bg-bgBlur rounded-md">
                    <Typography>Chi nhánh</Typography>
                    <Typography>TP Bank Đà Nẵng</Typography>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Typography className="mb-2 font-semibold text-[20px]">
                Lưu ý
              </Typography>
              <Typography className="mb-2">
                Tối đa 5 phút sau thời gian chuyển khoản,nếu hệ thống không phản
                hồi vui lòng liên ngay bộ phận hỗ trợ của Diamond
              </Typography>
              <Typography>
                <PhoneOutlined /> 0789787200
              </Typography>
              <Typography>
                <MailOutlined /> diamond.support@gmail.com
              </Typography>
              <Typography>
                <NotificationOutlined /> 69 Nguyễn Văn Linh, Q.Hải Châu, TP. Đà
                Nẵng
              </Typography>
            </div>
          </Col>
        </Row>
      </div>
    </PaymentContainer>
  );
};

export default Payment;
