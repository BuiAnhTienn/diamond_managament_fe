import PrdCard from "@components/prd-card";
import { Gender } from "@constants/Gender";
import { GetQuery } from "@interfaces/getQuery";
import { getCategory } from "@services/category.service";
import { getProduct } from "@services/product.service";
import { getSubCategoryList } from "@services/sub-category.service";
import { useQuery } from "@tanstack/react-query";
import formatCurrency from "@utils/formatCurrency";
import {
  Breadcrumb,
  Col,
  InputNumber,
  Pagination,
  Radio,
  Row,
  Skeleton,
  Slider,
  Space,
  Typography,
} from "antd";
import { SliderMarks } from "antd/es/slider";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchContainer } from "./styled";
import Button from "@components/Button";

const TimKiem = () => {
  const { value } = useParams();
  const [paging, setPaging] = useState<GetQuery>({
    page: 1,
    pageSize: 6,
    totalItem: 0,
  });

  const [subcategory, setSubcategory] = useState("");
  const [category, setCategory] = useState("");
  const [toPrice, setToPrice] = useState(999999999999999);
  const [gender, setGender] = useState("");

  const formik = useFormik({
    initialValues: {
      max_price: 0,
      gender: "",
      category: "",
      subcategory: "",
    },
    onSubmit(values) {
      if (values.subcategory) {
        setSubcategory(values.subcategory);
      }
      if (values.gender) {
        setGender(values.gender);
      }
      if (values.category) {
        setCategory(values.category);
      }
      if (values.max_price) {
        setToPrice(values.max_price);
      }
    },
  });

  const { data, isFetching } = useQuery(
    ["product", value, paging, subcategory, category, toPrice, gender],
    async () => {
      const result = await getProduct({
        search: `${value}${gender ? ` ${gender}` : ``}`,
        subCategory: subcategory,
        category,
        fromPrice: 0,
        toPrice,
        ...paging,
      });
      setPaging((prev) => ({ ...prev, totalItem: result?.total }));
      return result?.docs;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: dataCategory } = useQuery(
    ["category-filter"],
    () => getCategory(),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const { data: dataSubCategory } = useQuery(
    ["subcategory-filter"],
    () => getSubCategoryList({ page: 1, pageSize: 999 }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const filteredSubCategory = dataSubCategory?.filter(
    (item) => item.category._id === formik.values.category
  );

  const marks: SliderMarks = {
    0: {
      style: {
        fontSize: 14,
      },
      label: <>0</>,
    },
    50000000: {
      style: {
        fontSize: 14,
      },
      label: <>50tr</>,
    },
    100000000: {
      style: {
        fontSize: 14,
      },
      label: <>100tr</>,
    },
  };

  useEffect(() => {
    setPaging((prev) => ({ ...prev, page: 1 }));
    formik.resetForm();
    setCategory("");
    setSubcategory("");
    setToPrice(999999999999999);
    setGender("");
  }, [value]);

  return (
    <SearchContainer className="py-6">
      <div className="container">
        <Row gutter={80}>
          <Col span={8}>
            <Breadcrumb
              items={[
                { title: "Trang chủ" },
                {
                  title: (
                    <Link to="" className="breadcrumb-crr">
                      Tìm kiếm
                    </Link>
                  ),
                },
              ]}
              className="breadcrumb mb-5"
            />
            <div className="flex justify-between items-center">
              <Typography className="font-[500] text-[22px]">Bộ lọc</Typography>
              <Typography className="text-[12px]">Xóa tất cả</Typography>
            </div>
            <Slider
              marks={marks}
              min={0}
              max={100000000}
              step={2000000}
              onChange={(value) => formik.setFieldValue("max_price", value)}
              value={formik.values.max_price}
            />

            <div className="flex justify-between items-center mb-4">
              <InputNumber
                min={0}
                max={100000000}
                style={{ width: "140px" }}
                value={formik.values.max_price}
                formatter={(value) => formatCurrency(value)}
                onChange={(value) =>
                  formik.setFieldValue("max_price", value ?? 0)
                }
                disabled
              />
            </div>
            <Typography className="mb-3 text-[15px] font-medium ">
              Danh mục
            </Typography>
            <Radio.Group
              onChange={(e) => formik.setFieldValue("category", e.target.value)}
              value={formik.values.category}
            >
              <Space direction="vertical">
                {dataCategory?.map((item) => (
                  <Radio value={item._id} key={item._id}>
                    {item.name}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
            {formik.values.category && (
              <>
                <Typography className="mb-3 text-[15px] font-medium ">
                  Phụ mục
                </Typography>
                <div
                  className="max-h-[200px] mb-5"
                  style={{ overflowX: "hidden" }}
                >
                  <Radio.Group
                    onChange={(e) =>
                      formik.setFieldValue("subcategory", e.target.value)
                    }
                    value={formik.values.subcategory}
                  >
                    <Space direction="vertical">
                      {filteredSubCategory?.map((item) => (
                        <Radio value={item._id} key={item._id}>
                          {item.name}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </div>
              </>
            )}
            <div className="text-right">
              <Button
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Tìm kiếm
              </Button>
            </div>
          </Col>
          <Col span={16}>
            <div className="flex justify-between mb-5">
              <Typography className="text-[20px] font-[600]">
                Kết quả tìm kiếm
              </Typography>
            </div>
            <Row gutter={10}>
              {isFetching ? (
                <>
                  <Col span={8}>
                    <Skeleton.Image
                      active={true}
                      className="mb-2 !w-full !h-[180px]"
                    />
                    <Skeleton active={true} />
                  </Col>
                  <Col span={8}>
                    <Skeleton.Image
                      active={true}
                      className="mb-2 !w-full !h-[180px]"
                    />
                    <Skeleton active={true} />
                  </Col>
                  <Col span={8}>
                    <Skeleton.Image
                      active={true}
                      className="mb-2 !w-full !h-[180px]"
                    />
                    <Skeleton active={true} />
                  </Col>
                </>
              ) : (
                <>
                  {data?.map((item, index) => (
                    <Col key={index} span={8}>
                      <PrdCard prdData={item} />
                    </Col>
                  ))}
                </>
              )}
            </Row>
            {!isFetching && data?.length !== 0 && (
              <div className="text-center mt-5">
                <Pagination
                  current={paging.page}
                  pageSize={paging.pageSize}
                  total={paging.totalItem}
                  onChange={(page: number) => {
                    setPaging((prev) => ({ ...prev, page }));
                  }}
                />
              </div>
            )}
            {data?.length === 0 && !isFetching && (
              <div>
                <Typography>Không có sản phẩm nào được tìm thấy!</Typography>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </SearchContainer>
  );
};

export default TimKiem;
