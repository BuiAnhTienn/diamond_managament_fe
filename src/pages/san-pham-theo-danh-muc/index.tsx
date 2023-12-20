import PrdCard from "@components/prd-card";
import { getProduct, IProductQuery } from "@services/product.service";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Pagination, Row, Skeleton } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CatePrd } from "./styled";
import Filter from "./components/filter";

const SanPhamTheoDanhMuc = () => {
  const [paging, setPaging] = useState<IProductQuery>({
    page: 1,
    pageSize: 10,
    totalItem: 0,
  });
  const { category_id } = useParams();

  const { data, isFetching } = useQuery(
    ["product-list-by-cate", paging, category_id],
    async () => {
      const result = await getProduct({ ...paging, category: category_id });
      setPaging((prevPaging) => ({
        ...prevPaging,
        totalItem: result?.total,
      }));
      return result?.docs;
    },
    { refetchOnWindowFocus: false }
  );

  const handleTableChange = (page: number, pageSize: number) => {
    setPaging((prev) => ({ ...prev, page, pageSize }));
  };

  return (
    <CatePrd>
      <div className="container">
        <Breadcrumb
          items={[
            { title: "Trang chủ" },
            {
              title: (
                <Link to="" className="breadcrumb-crr">
                  Nhẫn
                </Link>
              ),
            },
          ]}
          className="breadcrumb"
        />
        <img
          src="https://cdn.pnj.io/images/promo/149/CAT-Nhan.jpg"
          alt=""
          className="banner"
        />
        <Filter />

        {isFetching ? (
          <Row gutter={20} className="my-10">
            <Col span={6}>
              <Skeleton.Image
                active={true}
                className="mb-2 !w-full !h-[180px]"
              />
              <Skeleton active={true} />
            </Col>
            <Col span={6}>
              <Skeleton.Image
                active={true}
                className="mb-2 !w-full !h-[180px]"
              />
              <Skeleton active={true} />
            </Col>
            <Col span={6}>
              <Skeleton.Image
                active={true}
                className="mb-2 !w-full !h-[180px]"
              />
              <Skeleton active={true} />
            </Col>{" "}
            <Col span={6}>
              <Skeleton.Image
                active={true}
                className="mb-2 !w-full !h-[180px]"
              />
              <Skeleton active={true} />
            </Col>
          </Row>
        ) : (
          <>
            <Row gutter={10} className="prd-list">
              {data?.map((item, index) => (
                <Col key={index} span={6}>
                  <PrdCard prdData={item} />
                </Col>
              ))}
            </Row>
            <div className="mt-10 text-center">
              <Pagination
                total={paging.totalItem}
                current={paging.page}
                pageSize={paging.pageSize}
                onChange={handleTableChange}
              />
            </div>
          </>
        )}
      </div>
    </CatePrd>
  );
};

export default SanPhamTheoDanhMuc;
