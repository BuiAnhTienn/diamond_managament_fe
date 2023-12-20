// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Select from "@components/Select";
import Button from "@components/Button";
import { OrderStatusEnum } from "@constants/orderStatus";
import { editOrder, getOrderById } from "@services/order.service";
import { useQuery } from "@tanstack/react-query";
import formatDate from "@utils/formatDate";
import { Col, Row, Typography } from "antd";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditOrder = () => {
  const { id } = useParams();
  const { data } = useQuery(["order", id], () => getOrderById(id ?? ``));

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { _id: "", status: "" },
    async onSubmit(values) {
      const result = await editOrder({ id: values._id, status: values.status });
      if (result) {
        toast.success("Cập nhật thành công!");
        navigate("/admin/order");
      }
    },
  });

  useEffect(() => {
    formik.setValues(data!);
  }, [data]);

  return (
    <div className="px-[40px] py-[20px] bg-white">
      <Typography className="mb-8 text-[24px] font-semibold">
        Cập nhật trạng thái đơn hàng
      </Typography>
      <div className="w-[500px] mb-4">
        <Row gutter={[20, 10]}>
          <Col span={9}>
            <Typography>Tên người đặt hàng:</Typography>
          </Col>
          <Col span={15}>
            <Typography>{data?.name}</Typography>
          </Col>
          <Col span={9}>
            <Typography>Số điện thoại:</Typography>
          </Col>
          <Col span={15}>
            <Typography>{data?.phone}</Typography>
          </Col>
          <Col span={9}>
            <Typography>Ngày đặt hàng:</Typography>
          </Col>
          <Col span={15}>
            <Typography>{formatDate(data?.createdAt)}</Typography>
          </Col>
          <Col span={9}>
            <Typography>Địa chỉ đặt hàng:</Typography>
          </Col>
          <Col span={15}>
            <Typography>{data?.address}</Typography>
          </Col>
          <Col span={9}>
            <Typography>Tình trạng đơn hàng:</Typography>
          </Col>
          <Col span={15}>
            <Select
              options={Object.keys(OrderStatusEnum).map((key) => ({
                value: OrderStatusEnum?.[key],
                label: key,
              }))}
              value={formik.values?.status}
              onChange={(e) => formik.setFieldValue("status", e)}
            ></Select>
          </Col>
        </Row>
        <div className="mt-5">
          <Button
            type="link"
            onClick={() => navigate("/admin/order")}
            className="w-[120px] mr-5"
          >
            Quay về
          </Button>
          <Button onClick={() => formik.handleSubmit()} className="w-[120px]">
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
