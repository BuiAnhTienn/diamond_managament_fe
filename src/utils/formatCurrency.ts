function formatCurrency(numb: number | undefined) {
  if (numb !== undefined) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(numb);
  } else {
    return 'N/A'; // hoặc bất kỳ giá trị hoặc thông báo nào bạn muốn hiển thị cho dữ liệu không xác định
  }
}

export default formatCurrency;
