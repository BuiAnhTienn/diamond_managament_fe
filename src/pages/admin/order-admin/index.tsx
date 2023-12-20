// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PlusCircleOutlined } from "@ant-design/icons";
import Button from "@components/Button";
import { GetQuery } from "@interfaces/getQuery";
import { IOrder } from "@interfaces/order.interface";
import { getOrderListAdmin } from "@services/order.service";
import { useQuery } from "@tanstack/react-query";
import formatCurrency from "@utils/formatCurrency";
import formatDate from "@utils/formatDate";
import { Table, Typography } from "antd";
import type { ColumnType } from "antd/es/table";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface DataType extends IOrder {}

const OrderAdmin = () => {
  const navigate = useNavigate();

  const [paging, setPaging] = useState<GetQuery>({
    page: 1,
    pageSize: 10,
    totalItem: 0,
  });

  const { data, isFetching } = useQuery(["order-list", paging], async () => {
    const result = await getOrderListAdmin(paging);
    setPaging((prevPaging) => ({
      ...prevPaging,
      totalItem: result?.total,
    }));
    return result?.docs;
  });

  const columns: ColumnType<DataType> = [
    {
      title: "STT",
      width: "4%",
      render: (text: string, record, index: number) => {
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
      title: "Địa chỉ giao hàng",
      dataIndex: "address",
      // render: (text: string) => {
      //   return text ? text : 'no name';
      // },
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      width: "10%",
      render: (text: string, record) => {
        const totalPrice = record?.item?.reduce((accumulator, currentItem) => {
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
      width: "10%",
      render: (text: string) => {
        return <div>{formatDate(text)}</div>;
      },
    },
    {
      title: <Typography className="text-center">Trạng thái</Typography>,
      dataIndex: "status",
      width: "13%",
      render: (text: string, record: IOrder) => {
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
        return (
          <div className="text-center">
            <button
              onClick={() => navigate(`${record._id}`)}
              className="w-[120px] py-2 rounded-md"
            >
              {renderStatus(text)}
            </button>
          </div>
        );
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

  const handleTableChange = (page: number, pageSize: number) => {
    setPaging((prev) => ({ ...prev, page, pageSize }));
  };

  return (
    <div>
      <Typography.Title level={2}>Quản lý đơn hàng</Typography.Title>
      <div className="mb-4 text-right">
        <Button onClick={() => setOpenModal(true)}>
          <PlusCircleOutlined />
          Thêm
        </Button>
      </div>

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data ?? []}
        rowKey={"_id"}
        pagination={{
          total: paging.totalItem,
          current: paging.page,
          pageSize: paging.pageSize,
          onChange: (page, pageSize) => {
            handleTableChange(page, pageSize);
          },
        }}
      />
    </div>
  );
};

export default OrderAdmin;
