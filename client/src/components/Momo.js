import React, { useEffect } from "react";
import { apiUpdateReportMomo } from "../services";
import { toast } from "react-toastify";

// Tùy chọn thanh toán Momo
const momoOptions = {
  merchantId: "YOUR_MERCHANT_ID",
  merchantName: "YOUR_MERCHANT_NAME",
  endpoint: "YOUR_MOMO_API_ENDPOINT", // Thay bằng endpoint Momo của bạn
  publicKey: "YOUR_PUBLIC_KEY",
  privateKey: "YOUR_PRIVATE_KEY",
  amount: 0, // Số tiền thanh toán
  orderId: "YOUR_ORDER_ID", // Thay bằng orderId duy nhất cho mỗi giao dịch
  orderInfo: "YOUR_ORDER_INFO",
  returnUrl: "YOUR_RETURN_URL", // URL để xử lý kết quả thanh toán
};

const MomoPayment = ({ amount, pid, days, setIsExpired, setUpdateData }) => {
  useEffect(() => {
    momoOptions.amount = amount;
    // Cập nhật các giá trị khác nếu cần thiết
  }, [amount]);

  const handleMomoPayment = async () => {
    try {
      // Gửi yêu cầu thanh toán đến server của bạn, server sẽ gọi Momo API để tạo thanh toán
      const response = await apiUpdateReportMomo({
        pid,
        days,
        amount: momoOptions.amount,
        orderId: momoOptions.orderId,
        orderInfo: momoOptions.orderInfo,
        // Thêm các thông tin thanh toán khác nếu cần thiết
      });

      // Kiểm tra kết quả từ server
      if (response.data.err === 0) {
        // Khi giao dịch thành công, chuyển hướng đến trang thanh toán Momo
        window.location.href = response.data.payUrl;
      } else {
        // Xử lý khi có lỗi từ server
        toast.error('Thanh toán Momo thất bại');
      }
    } catch (error) {
      console.error('Error processing Momo payment:', error);
      toast.error('Đã có lỗi xảy ra khi xử lý thanh toán');
    }
  };

  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <button onClick={handleMomoPayment}>Thanh toán Momo</button>
    </div>
  );
};

export default MomoPayment;
