import { getOrderById } from '@services/order.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { OrderDetailContainer } from './styled';
import { Col, Row, Typography } from 'antd';
import formatDate from '@utils/formatDate';
import formatCurrency from '@utils/formatCurrency';
import { TProductInOrder } from '@interfaces/order.interface';

const ChiTietDonHang = () => {
  const { id } = useParams();
  const { data } = useQuery(['order', id], () => getOrderById(id ?? ``));
  function renderStatus(text: string | undefined) {
    switch (text) {
      case (text = 'NEW'):
        return 'Chờ xác nhận';
      case (text = 'IN_PROCESS'):
        return 'Đã xác nhận';
      case (text = 'PENDING'):
        return 'Đang giao hàng';
      case (text = 'CANCEL'):
        return 'Đã hủy';
      case (text = 'SHIPPED'):
        return 'Đã giao';
    }
  }

  const totalPrice = data?.item?.reduce((accumulator, currentItem) => {
    return (
      accumulator +
      currentItem.quantity * currentItem?.product?.price -
      ((currentItem?.product.price * (currentItem?.product?.promotion ?? 0)) /
        100) *
        currentItem.quantity
    );
  }, 0);

  return (
    <OrderDetailContainer>
      <Typography className='mb-5 text-[18px] font-semibold'>
        Chi tiết đơn hàng
      </Typography>
      <div>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <span className='inline-block w-[180px] text-[15px] text-[#747474]'>
              Tên người đặt hàng:
            </span>
            <span>{data?.name}</span>
          </Col>
          <Col span={12}>
            <span className='inline-block w-[180px] text-[15px] text-[#747474]'>
              Email:
            </span>
            <span>{data?.email}</span>
          </Col>
          <Col span={12}>
            <span className='inline-block w-[180px] text-[15px] text-[#747474]'>
              Ghi chú đặt hàng:
            </span>
            <span>{data?.note !== '' ? data?.note : 'Không có'}</span>
          </Col>
          <Col span={12}>
            <span className='inline-block w-[180px] text-[15px] text-[#747474]'>
              Số điện thoại:
            </span>
            <span>{data?.phone}</span>
          </Col>
          <Col span={12}>
            <span className='inline-block w-[180px] text-[15px] text-[#747474]'>
              Tình trạng đơn hàng:
            </span>
            <span>{renderStatus(data?.status)}</span>
          </Col>
          <Col span={12}>
            <span className='inline-block w-[180px] text-[15px] text-[#747474]'>
              Ngày đặt hàng:
            </span>
            <span>{formatDate(data?.createdAt)}</span>
          </Col>
        </Row>
        <table className='pay-table'>
          <tr className='pay-table-heading'>
            <th>SẢN PHẨM</th>
            <th>ẢNH SẢN PHẨM</th>
            <th className='w-[8%]'>SỐ LƯỢNG</th>
            <th className='w-[20%]'>ĐƠN GIÁ</th>
          </tr>
          {data?.item?.map((item: TProductInOrder) => {
            return (
              <tr key={item.product._id}>
                <td className='text-start'>{item?.product?.name}</td>
                <td>
                  <img
                    src={item?.product.image[0]}
                    alt='diamond'
                    className='w-[60px]'
                  />
                </td>
                <td>{item?.quantity}</td>
                <td>
                  {formatCurrency(
                    item?.product?.price * item?.quantity -
                      (item?.product?.price *
                        item?.quantity *
                        (item?.product?.promotion ?? 0)) /
                        100
                  )}
                </td>
              </tr>
            );
          })}
        </table>
        <div className='px-4 py-2 rounded-md'>
          <Typography className=''>
            Tổng tiền:
            <b className='ml-5 text-[18px]'>{formatCurrency(totalPrice)}</b>
          </Typography>
        </div>
      </div>
    </OrderDetailContainer>
  );
};

export default ChiTietDonHang;
