import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";
import { Button, UpdatePost, Paypal } from "../../components";
import {
  apiDeletePost,
  apiRequestExpired,
  apiGetReports,
  apiSeenReport,
  apiChangeRented,
} from "../../services";
import Swal from "sweetalert2";
import { COLOR, path } from "../../ultils/constant";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
// import MomoPayment from "../../components/Momo";

const ManagePost = () => {
  const dispach = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { postOfCurrent, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [isExpired, setIsExpired] = useState(null);
  const [reportPosts, setReportPosts] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchReport = async () => {
    const response = await apiGetReports({ status: "Accepted", user: true });
    if (response.data.err === 0) {
      setReportPosts(response.data?.data?.rows);
    }
  };
  useEffect(() => {
    dispach(actions.getPostsLimitAdmin({ status }));
  }, [dataEdit, updateData, status]);

  useEffect(() => {
    setPosts(postOfCurrent);
  }, [postOfCurrent]);

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);
  useEffect(() => {
    fetchReport();
  }, [update]);
  const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId);
    if (response?.data.err === 0) {
      setUpdateData((prev) => !prev);
    } else {
      Swal.fire("Oops!", "Xóa tin đăng thất bại", "error");
    }
  };
  const handleChangeRented = async (status, pid) => {
    const st = status === "ACTIVE" ? "RENTED" : "ACTIVE";
    const response = await apiChangeRented({ status: st }, pid);
    if (response?.data?.err === 0) setUpdateData(!updateData);
  };
  const handleExpired = async () => {
    const response = await apiRequestExpired({
      price: price * 5000,
      days: price,
      pid: isExpired,
    });
    if (response?.data.err === 0) {
      setIsExpired(null);
      setPrice(0);
      setUpdateData((prev) => !prev);
    } else {
      Swal.fire("Oops!", "Gia hạn tin đăng thất bại", "error");
    }
  };
  const handleSeenReport = async () => {
    const response = await apiSeenReport();
    if (response.data.err === 0) setUpdate(!update);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState("desc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const visibleRows = React.useMemo(() => {
    return posts?.sort((a, b) => {
      if (order === "desc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else return new Date(b.createdAt) - new Date(a.createdAt);
    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, page, rowsPerPage, posts]);
  return (
    <div className="flex flex-col gap-6 ">
      {isExpired && (
        <div
          onClick={() => setIsExpired(null)}
          className="absolute top-0 left-0 bottom-0 right-0 bg-overlay-30 z-10 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-8 bg-white w-[600px] rounded-md flex flex-col gap-2"
          >
            <p className="p-2 border-blue-500 border rounded-md text-justify text-sm bg-blue-100 text-blue-800">
              Gia hạn ngày đăng bài, người đăng có thể chọn 2 phương án dưới
              đây:
              <ul className="italic">
                <li>
                  <span className="font-bold">Thanh toán nhanh:</span> Thanh
                  toán trực tiếp qua paypal và bài đăng sẽ ngay lập tức được
                  cộng thêm số ngày được gian hạn tính từ hôm nay
                </li>
                <li>
                  <span className="font-bold">Thanh toán offline:</span> Người
                  đăng bài đăng ký với hệ thống số ngày đăng muốn gian hạn, và
                  liên hệ Admin để trao đổi thanh toán.
                </li>
              </ul>
              <br />
              <span>{`Giá tiền gia hạn: ${process.env.REACT_APP_GIA_HAN}vnđ/ngày`}</span>
            </p>
            <span>Nhập số ngày bạn muốn gia hạn:</span>
            <div>
              <input
                type="number"
                className="px-4 py-2 rounded-md border"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <span>
              <span>Tổng tiền cần gia hạn: </span>
              <span className="font-bold">
                {Number(
                  price * +process.env.REACT_APP_GIA_HAN
                ).toLocaleString() + " USD"}
              </span>
            </span>
            <button
              type="button"
              className="px-4 py-2 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleExpired}
            >
              Gia hạn
            </button>

            <div className="w-full">
              <h2>Chọn phương thức gia hạn</h2>

              <div className="flex justify-around z-10">
                <Paypal
                  amount={price * process.env.REACT_APP_GIA_HAN}
                  pid={isExpired}
                  days={price}
                  setIsExpired={setIsExpired}
                  setUpdateData={setUpdateData}
                />
                {/* <MomoPayment
                  amount={price * process.env.REACT_APP_GIA_HAN}
                  pid={isExpired}
                  days={price}
                  setIsExpired={setIsExpired}
                  setUpdateData={setUpdateData}
                /> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-medium ">Quản lý tin đăng</h1>
        <div className="text-sm p-4 rounded-md text-blue-800 bg-blue-200 italic">
          Sau khi xác nhận gia hạn, vui lòng chủ trọ hãy bank tiền gia hạn theo{" "}
          <a
            className="text-blue-500 hover:underline"
            href="http://zalo.me/0862434001"
          >
            tài khoản này
          </a>{" "}
          để admin duyệt nhé ~
        </div>
        <select
          onChange={(e) => setStatus(+e.target.value)}
          value={status}
          className="outline-none border p-2 border-gray-200 rounded-md"
        >
          <option value="">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      {reportPosts && Object.keys(reportPosts).length > 0 && (
        <div className="p-4 border relative rounded-md bg-blue-100 border-blue-500 text-sm">
          <span
            onClick={handleSeenReport}
            className="absolute p-2 cursor-pointer right-[8px] top-[8px]"
          >
            X
          </span>
          <h1 className="font-medium text-blue-600">Thông báo:</h1>
          <ul>
            {reportPosts?.map((el) => (
              <li key={el.id} className="flex items-center gap-1">
                <span>Bài đăng</span>
                <span className="font-medium">{el.title}</span>
                <span>
                  của bạn đã bị xóa bởi report của người xem với lý do
                </span>
                <span className="text-red-500 italic">{`"${el.reason}"`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-6">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, marginBottom: 5 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Mã tin</TableCell>
                <TableCell align="center">Tiêu đề</TableCell>
                <TableCell align="center">Giá</TableCell>
                <TableCell align="center">Ngày bắt đàu</TableCell>
                {/* <TableCell align="center">
                  <TableSortLabel
                    active={true}
                    direction={order}
                    onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
                  >
                    Ngày đăng
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "Mới nhất" : "Cũ nhất"}
                    </Box>
                  </TableSortLabel>
                  &nbsp;
                </TableCell> */}
                <TableCell align="center">Ngày hết hạn</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Đã thuê</TableCell>
                <TableCell align="center">Tùy chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((item, index) => (
                <TableRow
                  key={item.title + index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">
                    <Link
                      target="_blank"
                      to={`${path.DETAIL}${formatVietnameseToString(
                        item.title?.replaceAll("/", "")
                      )}/${item.id}`}
                      className="text-red-600 font-medium"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {item?.attributes?.price}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item?.expired).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    {item?.expireds?.status === "Pending" ? (
                      <span className="px-4 py-2 bg-orange-500 text-white">
                        Pending
                      </span>
                    ) : new Date(item?.expired).getTime() >=
                      new Date().getTime() ? (
                      <span className="px-4 py-2 bg-green-500 text-white">
                        Active
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-red-500 text-white">
                        Expired
                      </span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={item?.status === "RENTED"}
                      onChange={(e) =>
                        handleChangeRented(item?.status, item.id)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div className="w-full h-full flex justify-between">
                      {new Date(item?.expired).getTime() <
                        new Date().getTime() &&
                        !item.expireds?.id && (
                          <Button
                            fontSize={"10px"}
                            size="small"
                            width="25%"
                            text="Gia hạn"
                            textColor="text-blue-500 hover:underline py-1"
                            onClick={() => setIsExpired(item.id)}
                          />
                        )}
                      <Button
                        size="small"
                        fontSize={"12px"}
                        width="25%"
                        text="Sửa"
                        bgColor={COLOR.PRIMARY_COLOR}
                        textColor="text-blue-500 hover:underline py-1"
                        onClick={() => {
                          dispach(actions.editData(item));
                          setIsEdit(true);
                        }}
                      />
                      <Button
                        size="small"
                        fontSize={"12px"}
                        width="25%"
                        bgColor={COLOR.PRIMARY_COLOR2}
                        text="Xóa"
                        textColor="text-blue-500 hover:underline py-1"
                        onClick={() => handleDeletePost(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    15,
                    { label: "Tất cả", value: -1 },
                  ]}
                  colSpan={3}
                  count={posts?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "Dòng trên trang",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
