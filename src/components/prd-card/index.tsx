import React from "react";
import { PrdCardContainer } from "./styled";
import { IProduct } from "@interfaces/product.interface";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import formatCurrency from "@utils/formatCurrency";

const PrdCard = ({ prdData }: { prdData: IProduct }) => {
  return (
    <PrdCardContainer>
      <Link to={`/san-pham/${prdData._id}`}>
        <div className="item-img">
          <img src={prdData?.image?.[0]} alt="" className="prd-img" />
          <div className={"promotion"}>{prdData?.promotion ?? 0} %</div>
        </div>
        <div className="px-2">
          <Typography className="item-label line-clamp-2">
            {prdData.name}
          </Typography>
          <Typography className="item-price">
            {formatCurrency(prdData.price)}đ
          </Typography>
          <div className="item-bottom">
            <span>696+ đã bán</span>
          </div>
        </div>
      </Link>
    </PrdCardContainer>
  );
};

export default PrdCard;
