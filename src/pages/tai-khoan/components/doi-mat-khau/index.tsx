// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Input from "@components/Input";
import Button from "@components/Button";
import { Col, Row, Typography } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateInfo } from "@services/user.service";
import { toast } from "react-toastify";

const DoiMatKhau = () => {
  const navigate = useNavigate();

  const schema = Yup.object({
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu không khớp")
      .required("Vui lòng xác nhận mật khẩu"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values) => {
      const { password, confirmPassword } = values;
      console.log(password);
      mutate({ password: confirmPassword });
    },
  });

  const { mutate } = useMutation(updateInfo, {
    onError: () => {
      toast.error("Có lỗi xảy ra!");
    },
    onSuccess: () => {
      toast.success(`Cập nhật thành công`);
      navigate("/tai-khoan/thong-tin");
    },
  });

  return (
    <div className="pt-[20px] px-[40px] pb-[40px] bg-white">
      <Typography className="heading mb-10">Đổi mật khẩu</Typography>
      <div className="w-[500px] ml-[100px]">
        <Row gutter={[0, 20]}>
          <Col span={8}>Mật khẩu mới:</Col>
          <Col span={16}>
            <Input
              type="password"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-[red]">{formik.errors.password}</div>
            ) : null}
          </Col>
          <Col span={8}>Xác nhận mật khẩu:</Col>
          <Col span={16}>
            <Input
              type="password"
              value={formik.values.confirmPassword}
              onChange={(e) =>
                formik.setFieldValue("confirmPassword", e.target.value)
              }
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="mt-2 text-[red] text-[14px]">
                {formik.errors.confirmPassword}!
              </div>
            ) : null}
          </Col>
          <Button
            type="link"
            className="mr-5"
            onClick={() => navigate("/tai-khoan/thong-tin")}
          >
            Quay lại
          </Button>
          <Button onClick={() => formik.handleSubmit()} className="w-[100px]">
            Lưu
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default DoiMatKhau;
