import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { IOrder } from "@interfaces/order.interface";
import { getOrderHistory } from "@services/order.service";
import formatCurrency from "@utils/formatCurrency";
import formatDate from "@utils/formatDate";
import { Table, Typography } from "antd";

const LichSu = () => {
  const { data } = useQuery(["order-history"], getOrderHistory);

  const columns = [
    {
      title: "STT",
      render: (text: string, record: IOrder, index: number) => {
        return index + 1;
      },
    },
    {
      title: "Tên người đặt",
      dataIndex: "name",
      render: (text: string) => {
        return text ? text : "no name";
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      render: (price: IOrder) => {
        const totalPrice = price?.item?.reduce((accumulator, currentItem) => {
          return (
            accumulator +
            currentItem.quantity * currentItem?.product?.price -
            ((currentItem?.product.price *
              (currentItem?.product?.promotion ?? 0)) /
              100) *
              currentItem.quantity
          );
        }, 0);
        return <div>{formatCurrency(totalPrice)}</div>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text: string) => {
        return <div>{formatDate(text)}</div>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text: string) => {
        function renderStatus(text: string) {
          switch (text) {
            case (text = "NEW"):
              return "Chờ xác nhận";
            case (text = "IN_PROCESS"):
              return "Đã xác nhận";
            case (text = "PENDING"):
              return "Đang giao hàng";
            case (text = "CANCEL"):
              return "Đã hủy";
            case (text = "SHIPPED"):
              return "Đã giao";
          }
        }
        return <div>{renderStatus(text)}</div>;
      },
    },
    {
      title: "Chi tiết",
      render: (text: IOrder) => {
        return (
          <Link
            to={
              text.status === "NEW"
                ? `/payment/${text._id}`
                : `/tai-khoan/don-hang/${text._id}`
            }
            className="text-[14px] !text-[#69b1ff]"
          >
            Xem chi tiết
          </Link>
        );
      },
    },
  ];
  return (
    <div className="px-[40px] pt-[20px] pb-[40px] bg-white">
      <Typography className="heading mb-8">Lịch sử đơn hàng</Typography>

      <Table
        columns={columns}
        dataSource={data?.docs ?? []}
        rowKey={"_id"}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
};

export default LichSu;
