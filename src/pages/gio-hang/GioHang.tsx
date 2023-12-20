// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DeleteOutlined } from '@ant-design/icons';
import { useCartContext } from '@contexts/CartContext';
import useConfirmModal from '@hooks/useConfirmModal';
import { IProduct } from '@interfaces/product.interface';
import formatCurrency from '@utils/formatCurrency';
import { Button, Col, Row, Table, Typography } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { GioHangContainer } from './styled';
import { default as ButtonCustom } from '@components/Button';

interface DataType extends IProduct {}

const GioHang = () => {
  const cart = useCartContext();
  const { showConfirmModal } = useConfirmModal();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên',
      width: '30%',
      render: (record) => {
        return <>{record?.product?.name}</>;
      },
    },
    {
      title: 'Ảnh',
      render: (record) => (
        <img src={record?.product?.image?.[0]} alt='' className='w-[50px]' />
      ),
    },
    {
      title: 'Giá',
      render: (record) => <div>{formatCurrency(record?.product?.price)}</div>,
    },
    {
      title: 'Giảm giá',
      render: (record) => <div>{record?.product?.promotion ?? 0} %</div>,
    },
    {
      title: 'Số lượng',
      align: 'center',
      render: (record) => (
        <div className='flex gap-2 justify-center items-center'>
          <Button
            onClick={() => {
              if (record.quantity !== 1) {
                cart?.updateCartTempCart?.({
                  product: record?.product,
                  quantity: record?.quantity - 1,
                });
              } else {
                showConfirmModal({
                  title: 'Bạn có muốn xoá sản phẩm khỏi giỏ hàng',
                  cancelText: 'Huỷ bỏ',
                  onOk: () =>
                    cart?.updateCartTempCart?.({
                      product: record?.product,
                      quantity: record?.quantity - 1,
                    }),
                });
              }
            }}
          >
            -
          </Button>
          {record?.quantity}
          <Button
            onClick={() => {
              cart?.updateCartTempCart?.({
                product: record?.product,
                quantity: record?.quantity + 1,
              });
            }}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: 'Tùy chọn',
      key: 'actions',
      render: (record) => (
        <Button
          type='primary'
          className='text-[14px]'
          danger
          onClick={() =>
            showConfirmModal({
              title: 'Bạn có muốn xoá sản phẩm khỏi giỏ hàng',
              cancelText: 'Huỷ bỏ',
              onOk: () =>
                cart?.updateCartTempCart?.({
                  product: record?.product,
                  quantity: 0,
                }),
            })
          }
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <GioHangContainer>
      <div className='container'>
        <Row gutter={20} className='cart'>
          <Col span={16}>
            <Table
              // loading={isFetching}
              columns={columns}
              dataSource={cart?.cart?.item ?? []}
              rowKey={'_id'}
              pagination={false}
            />
            <div className='w-full text-right'>
              <ButtonCustom
                onClick={() => {
                  cart?.updateCartData?.();
                }}
                className='mt-2 '
              >
                Cập nhật giỏ hàng
              </ButtonCustom>
            </div>
          </Col>
          <Col span={8}>
            <div className='pay'>
              <Typography className='total-title'>CỘNG GIỎ HÀNG</Typography>
              <Row className='total'>
                <Col span={12} className='total-price-label'>
                  Tổng thanh toán:
                </Col>
                <Col span={12} className='total-price-cost'>
                  {formatCurrency(cart?.totalPrice)}
                </Col>
                <Button className='pay-btn'>
                  <Link to='/checkout'>Tiến hành thanh toán</Link>
                </Button>
                <ButtonGroup className='total-btns'>
                  <Button
                    onClick={() =>
                      showConfirmModal({
                        title: 'Bạn có muốn xoá hết sản phẩm trong giỏ hàng?',
                        onOk: () => {
                          cart?.removeAllProductInCart?.();
                        },
                      })
                    }
                  >
                    Xóa tất cả
                  </Button>
                  <Button>
                    <Link to='/'>Về trang chủ</Link>
                  </Button>
                </ButtonGroup>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </GioHangContainer>
  );
};

export default GioHang;
