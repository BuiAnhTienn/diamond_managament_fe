import Input from "@components/Input";
import Select from "@components/Select";
import Button from "@components/Button";
import Upload from "@components/upload";
import { Gender } from "@constants/Gender";
import { getCategory } from "@services/category.service";
import {
  createProduct,
  getProductById,
  ICreateProductPayload,
  updateProduct,
} from "@services/product.service";
import { getSubCategories } from "@services/sub-category.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Checkbox, Col, Radio, Row, Typography } from "antd";
import { useFormik } from "formik";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Trường này không được trống!"),
  price: yup.string().required("Trường này không được trống!"),
  description: yup.string().required("Trường này không được trống!"),
  image: yup.array(),
  category: yup.string().required("Trường này không được trống!"),
  subCategory: yup.string().required("Trường này không được trống!"),
  material: yup.string().required("Trường này không được trống!"),
  gender: yup.string().required("Trường này không được trống!"),
  size: yup.string().required("Trường này không được trống!"),
});

const UpsertProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      image: [],
      category: "",
      subCategory: "",
      isTrending: false,
      material: "",
      gender: Gender.Male,
      size: 0,
      promotion: 0,
    },
    validationSchema: schema,
    validateOnChange: false,
    async onSubmit(values) {
      const payload: ICreateProductPayload = {
        name: values.name,
        price: +values.price,
        description: values.description,
        image: values.image,
        isTrending: values.isTrending,
        subCategory: values.subCategory,
        material: values.material,
        gender: values.gender,
        size: +values.size,
        promotion: +values.promotion,
      };
      if (isEdit) {
        updateProductMutate({ id, product: payload });
      } else {
        createProductMutate(payload);
      }
    },
  });

  const { data: categoryData } = useQuery(["category"], () => getCategory());
  const { data: subCategoryData } = useQuery(
    ["sub-category", formik.values?.category],
    () => getSubCategories(formik.values?.category),
    { enabled: !!formik.values?.category, refetchOnWindowFocus: false }
  );

  // create
  const { mutate: createProductMutate } = useMutation(createProduct, {
    onSuccess: () => {
      toast.success(`Thêm sản phẩm thành công`);
      navigate("/admin/product");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  // update
  const { mutate: updateProductMutate } = useMutation(updateProduct, {
    onSuccess: () => {
      toast.success(`Cập nhật sản phẩm thành công`);
      navigate("/admin/product");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  // edit
  const { data: productData } = useQuery(
    ["product", id],
    () => getProductById(id ?? ``),
    {
      enabled: isEdit,
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    if (productData) {
      formik.setFieldValue("name", productData.name);
      formik.setFieldValue("price", productData.price);
      formik.setFieldValue("isTrending", productData.isTrending);
      formik.setFieldValue("subCategory", productData?.subCategory?._id);
      formik.setFieldValue("category", productData?.subCategory?.category._id);
      formik.setFieldValue("description", productData?.description);
      formik.setFieldValue("image", productData?.image);
      formik.setFieldValue("material", productData?.material);
      formik.setFieldValue("gender", productData?.gender);
      formik.setFieldValue("size", productData?.size);
      formik.setFieldValue("promotion", productData?.promotion);
    }
  }, [productData]);

  return (
    <div className="flex flex-col p-2 gap-4">
      <Typography.Title level={2}>
        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      </Typography.Title>
      <Input
        label="Tên sản phẩm"
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue("name", e.target.value)}
        errorMessage={formik.errors.name}
      />
      <Input
        label="Giá sản phẩm sản phẩm"
        value={formik.values.price}
        onChange={(e) => formik.setFieldValue("price", e.target.value)}
        type="number"
        errorMessage={formik.errors.price}
      />
      <Input
        label="Giảm %"
        value={formik.values.promotion}
        onChange={(e) => formik.setFieldValue("promotion", e.target.value)}
        type="number"
        errorMessage={formik.errors.promotion}
      />
      <ReactQuill
        theme="snow"
        value={formik.values.description}
        onChange={(value) => {
          formik.setFieldValue("description", value);
        }}
      />
      <Checkbox
        onChange={(e) => {
          formik.setFieldValue("isTrending", e.target.checked);
        }}
        checked={formik.values.isTrending}
      >
        Thịnh hành
      </Checkbox>
      <Select
        label="Chọn danh mục"
        options={
          categoryData?.map((item) => ({
            value: item?._id,
            label: item.name,
          })) ?? []
        }
        value={formik.values.category}
        onChange={(value) => {
          formik.setFieldValue("category", value);
          formik.setFieldValue("subCategory", "");
        }}
        errorMessage={formik.errors.category}
      ></Select>
      <Select
        label="Chọn phụ mục"
        options={
          subCategoryData?.map((item) => ({
            value: item?._id,
            label: item.name,
          })) ?? []
        }
        value={formik.values.subCategory}
        onChange={(value) => formik.setFieldValue("subCategory", value)}
        disabled={!formik.values.category}
        errorMessage={formik.errors.subCategory}
      ></Select>
      <Input
        label="Chất liệu"
        value={formik.values.material}
        onChange={(e) => formik.setFieldValue("material", e.target.value)}
        errorMessage={formik.errors.material}
      />
      <div>
        <div className={"mb-2"}>Giới tính</div>
        <Radio.Group
          onChange={(e) => formik.setFieldValue("gender", e.target.value)}
          value={formik.values.gender}
        >
          {Object.values(Gender).map((item) => (
            <Radio value={item} key={item}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <Input
        label="Kích thước"
        value={formik.values.size}
        onChange={(e) => formik.setFieldValue("size", e.target.value)}
        type="number"
        errorMessage={formik.errors.size}
      />
      <div>
        <Row>
          <Col span={12}>
            <div className="mb-2">
              <div className="mb-2">Ảnh số 1:</div>
              <Upload
                value={formik.values.image?.[0]}
                onChange={(e) => {
                  formik.setFieldValue("image[0]", e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="mb-2">
              <div className="mb-2">Ảnh số 2:</div>
              <Upload
                value={formik.values.image?.[1]}
                onChange={(e) => {
                  formik.setFieldValue("image[1]", e);
                }}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="mb-2">Ảnh số 3:</div>
            <Upload
              value={formik.values.image?.[2]}
              onChange={(e) => {
                formik.setFieldValue("image[2]", e);
              }}
            />
          </Col>
          <Col span={12}>
            <div className="mb-2">Ảnh số 4:</div>
            <Upload
              value={formik.values.image?.[3]}
              onChange={(e) => {
                formik.setFieldValue("image[3]", e);
              }}
            />
          </Col>
        </Row>
      </div>
      <div className="text-right">
        <Button className="mr-2" onClick={() => formik.handleSubmit()}>
          {isEdit ? "Sửa" : "Thêm"}
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => navigate("/admin/product")}
        >
          Huỷ bỏ
        </Button>
      </div>
    </div>
  );
};

export default UpsertProduct;
