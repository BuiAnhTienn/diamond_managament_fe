// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ICategory } from "@interfaces/category.interface";
import { getUserList } from "@services/user.service";
import { useQuery } from "@tanstack/react-query";
import formatDate from "@utils/formatDate";
import { Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType extends ICategory {}

const UserAdmin = () => {
  const { data } = useQuery(["users"], getUserList);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text) => <Typography>{formatDate(text.createdAt)}</Typography>,
    },
  ];

  return (
    <div>
      <div className="mb-[30px]">
        <Typography.Title level={2}>Quản lý người dùng</Typography.Title>
      </div>
      <Table columns={columns} dataSource={data?.docs ?? []} rowKey={"_id"} />
    </div>
  );
};

export default UserAdmin;
