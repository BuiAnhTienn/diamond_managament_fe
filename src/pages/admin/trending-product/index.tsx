// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Select from "@components/Select";
import Button from "@components/Button";
import useConfirmModal from "@hooks/useConfirmModal";
import { GetQuery } from "@interfaces/getQuery";
import { IProduct } from "@interfaces/product.interface";
import { getProduct, updateTrending } from "@services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import formatCurrency from "@utils/formatCurrency";
import { Modal, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

interface DataType extends IProduct {}

const TrendingProduct = () => {
  const { showConfirmModal } = useConfirmModal();
  const [openModal, setOpenModal] = useState(false);
  const [paging, setPaging] = useState<GetQuery>({
    page: 1,
    pageSize: 10,
    totalItem: 0,
  });

  const query = useQueryClient();

  const formik = useFormik({
    initialValues: { product: "" },
    onSubmit(values) {
      updateTrendingMutate({ id: values.product, isTrending: true });
    },
  });

  const { data, isFetching } = useQuery(
    ["product", paging],
    async () => {
      const result = await getProduct({ ...paging, trending: true });
      setPaging((prevPaging) => ({
        ...prevPaging,
        totalItem: result?.total,
      }));
      return result?.docs;
    },
    { refetchOnWindowFocus: false }
  );

  const { data: productData } = useQuery(
    ["product"],
    async () => {
      const result = await getProduct({
        page: 1,
        pageSize: 999,
        trending: false,
      });
      return result?.docs;
    },
    { refetchOnWindowFocus: false }
  );

  const { mutate: updateTrendingMutate } = useMutation(updateTrending, {
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm xu hướng thành công!");
      query.invalidateQueries({
        queryKey: ["product"],
      });
      setOpenModal(false);
    },
    onError: () => {
      toast.error("Cập nhật sản phẩm xu hướng thành công!");
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price: number) => <div>{formatCurrency(price)}</div>,
    },
    {
      title: <p className="">Ảnh</p>,
      className: "text-center",
      render: (record) => {
        return (
          <div className="w-[100px] h-[100px]">
            <img
              alt=""
              src={record?.image?.[0]}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      width: "20%",
      render: (record) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              className="text-[14px]"
              danger
              onClick={() => {
                showConfirmModal({
                  title: `Bạn có muốn xóa sản phẩm ${record?.name} ra khỏi thịnh hành?`,
                  onOk: () => {
                    updateTrendingMutate({
                      id: record?._id,
                      isTrending: false,
                    });
                  },
                  cancelText: "Hủy bỏ",
                });
              }}
            >
              <DeleteOutlined /> Xóa khỏi thịnh hành
            </Button>
          </Space>
        );
      },
    },
  ];

  const handleTableChange = (page: number, pageSize: number) => {
    setPaging((prev) => ({ ...prev, page, pageSize }));
  };

  return (
    <div>
      <Typography.Title level={2}>Quản lý xu hướng</Typography.Title>
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
      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          formik.resetForm();
        }}
        title="Cập nhật thịnh hành cho sản phẩm"
        okText="Thêm"
        cancelText="Huỷ bỏ"
        onOk={() => formik.handleSubmit()}
      >
        <Select
          label="Sản phẩm:"
          showSearch
          options={productData?.map((item) => ({
            value: item._id,
            label: item.name,
          }))}
          filterOption={(input, option) =>
            option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={(value) => {
            formik.setFieldValue("product", value);
          }}
          value={formik.values.product}
        ></Select>
      </Modal>
    </div>
  );
};

export default TrendingProduct;
