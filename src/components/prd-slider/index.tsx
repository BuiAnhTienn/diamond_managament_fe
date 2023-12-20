import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import PrdCard from "@components/prd-card";
import { IProduct } from "@interfaces/product.interface";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { ProductSliderContainer } from "./styled";

interface Props {
  prdData: IProduct[];
}

export const ProductSlider: React.FC<Props> = (props) => {
  const { prdData } = props;

  const arrowId = v4();

  return (
    <ProductSliderContainer>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={{
          nextEl: `#arrow-left${arrowId}`,
          prevEl: `#arrow-right${arrowId}`,
        }}
        className="trend-slider"
      >
        {prdData.map((item: IProduct, index: number) => (
          <SwiperSlide key={index} className="slide-item">
            <PrdCard prdData={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <LeftOutlined className={`arrow-right`} id={`arrow-right${arrowId}`} />
      <RightOutlined className={`arrow-left`} id={`arrow-left${arrowId}`} />
    </ProductSliderContainer>
  );
};

export default ProductSlider;
