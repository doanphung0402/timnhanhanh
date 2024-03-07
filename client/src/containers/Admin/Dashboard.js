import React, { useState, useEffect } from "react";
import {
  apiChangeIsAccept,
  apiDeletePost,
  apiGetDashboard,
  apiGetPostsLimit,
} from "../../services/post";
import icons from "../../ultils/icons";
import { Button, ChartLine } from "../../components";
import moment from "moment";
import { Link } from "react-router-dom";
import { COLOR, path } from "../../ultils/constant";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import SelectTimeFilter from "../../components/SelectTimeFilter";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  FormControlLabel,
  Switch,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import AdminSidebar from "./AdminSidebar";
import { apiChangeAutoAccept } from "../../services";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const { HiUserGroup, MdPersonAddAlt1, MdOutlinePostAdd } = icons;

const Dashboard = () => {
  const [data, setData] = useState(null);
  console.log("🚀 ~ Dashboard ~ data:", data)
  const [isMonth, setIsMonth] = useState(false);
  const [newPosts, setNewPosts] = useState(null);
  const [customTime, setCustomTime] = useState({
    startDate: "2000-1-1",
    endDate: "2030-1-1",
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState("desc");

  const fetchDashboard = async (params) => {
    const response = await Promise.all([
      apiGetDashboard(params),
      apiGetPostsLimit({
        limitPost: rowsPerPage,
        order: ["createdAt", order],
        page: page,
        customTime,
        isAccept: "",
      }),
    ]);

    if (response[0].data.success) setData(response[0].data.chartData);
    if (response[1].data.err === 0) {
      setNewPosts(response[1].data.response.rows);
      setCount(response[1].data.response.count);
    }
  };
  useEffect(() => {
    const type = isMonth ? "month" : "day";
    const params = { type };
    if (customTime.from) params.from = customTime.from;
    if (customTime.to) params.to = customTime.to;
    fetchDashboard(params);
  }, [isMonth, customTime, rowsPerPage, page]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [autoAccept, setAutoAccept] = useState(false);
  const handleChangeAutoAccept = async (event) => {
    const autoAccept1 = !autoAccept;
    const response = await apiChangeAutoAccept({ autoAccept1 });
    if (response?.data.err === 0) {
      if (!autoAccept) {
        Swal.fire("Thành công", "Tự động phê duyệt đã bật !", "success");
      } else {
        Swal.fire("Thành công", "Tự động phê duyệt đã tắt !", "success");
      }
    } else {
      Swal.fire("Oops!", "Có lỗi gì đó", "error");
    }
    setAutoAccept(!autoAccept);
  };
  const visibleRows = React.useMemo(() => {
    return newPosts?.sort((a, b) => {
      if (order === "desc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [order, page, rowsPerPage, newPosts]);

  const onClickChangeAccept = async (id) => {
    const response = await apiChangeIsAccept(id);
    if (response?.data.err === 0) {
      setAccepted([...accepted, id]);
      toast.success(response.data.msg);
    }
  };
  const [accepted, setAccepted] = useState([]);
  const isAccepted = (id) => {
    const itemAccepted = accepted?.find((item) => item === id);
    if (itemAccepted) return true;
    else return false;
  };

  const [postDelete,setPostDelete] = useState([]); 
  const isDeletePost =(id) =>{
     const res = postDelete.find(item=>item === id); 
     if (res) return true ; 
     else return false
  }
  const handleDeletePost = async (id) => {
    const response = await apiDeletePost(id);
    if (response?.data.err === 0) {
      setPostDelete([...postDelete,id])
      toast.success("Đã xóa bài đăng !");
    } else {
      toast.error("Xóa bài đăng thất bại !");
    }
  };
  return (
    <>
      <div className="w-full h-min-screen flex gap-4">
        <div className="w-[240px] flex-none py-4 pl-4 h-full shadow-sm">
          <AdminSidebar />
        </div>
        <div className="flex-auto h-full py-4 overflow-y-scroll">
          <div className="relative bg-white p-4 h-full">
            <div className="flex items-center justify-between border-b border-gray-800">
              <h3 className="font-bold text-[30px] pb-4 ">Tổng quan</h3>
            </div>
            <div className="py-8">
              <div className="flex gap-4 items-center">
                <div className="flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between">
                  <span className="flex flex-col">
                    <span className="text-[24px] text-main">
                      {data?.views || 0}
                    </span>
                    <span className="text-sm text-gray-500">
                      SỐ LƯỢT TRUY CẬP
                    </span>
                  </span>
                  <HiUserGroup size={30} />
                </div>
                <div className="flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between">
                  <span className="flex flex-col">
                    <span className="text-[24px] text-main">
                      {data?.postCount || 0}
                    </span>
                    <span className="text-sm text-gray-500">SÔ BÀI ĐĂNG</span>
                  </span>
                  <MdOutlinePostAdd size={30} />
                </div>
                <div className="flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between">
                  <span className="flex flex-col">
                    <span className="text-[24px] text-main">
                      {data?.userCount || 0}
                    </span>
                    <span className="text-sm text-gray-500">THÀNH VIÊN</span>
                  </span>
                  <MdPersonAddAlt1 size={30} />
                </div>
              </div>
              <div className="mt-5 ">
                <div className="flex gap-4 justify-between h-[400px]">
                  <div className="flex-1 h-full shadow-lg rounded-md flex flex-col p-4">
                    <h4 className="font-bold">
                      Số bài đăng cho thuê phòng trọ
                    </h4>
                    <ChartLine
                      data={data?.ctpt}
                      isMonth={isMonth}
                      customTime={customTime}
                    />
                  </div>
                  <div className="flex-1 h-full shadow-lg rounded-md flex flex-col p-4">
                    <h4 className="font-bold">Số bài đăng cho thuê mặt bằng</h4>
                    <ChartLine
                      data={data?.ctmb}
                      isMonth={isMonth}
                      customTime={customTime}
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-between h-[400px]">
                  <div className="flex-1 h-full shadow-lg rounded-md flex flex-col p-4">
                    <h4 className="font-bold">Số bài đăng cho thuê căng hộ</h4>
                    <ChartLine
                      data={data?.ctch}
                      isMonth={isMonth}
                      customTime={customTime}
                    />
                  </div>
                  <div className="flex-1 h-full shadow-lg rounded-md flex flex-col p-4">
                    <h4 className="font-bold">Số bài đăng nhà cho thuê</h4>
                    <ChartLine
                      data={data?.nct}
                      isMonth={isMonth}
                      customTime={customTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-md shadow-lg p-4 bg-white p-4">
        <div className="flex justify-between  h-full w-full">
          <h4 className="font-bold">Các bài đăng mới nhất</h4>
          <FormControlLabel
            control={
              <Switch
                checked={autoAccept}
                onChange={handleChangeAutoAccept}
                name="gilad"
              />
            }
            label="Tự động phê duyệt"
          />
          <SelectTimeFilter setCustomTime={setCustomTime} />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Tựa đề</TableCell>
                <TableCell align="center">Thể loại</TableCell>
                <TableCell align="center">Người đăng</TableCell>
                <TableCell align="center">Liên hệ</TableCell>
                <TableCell align="center">
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
                </TableCell>
                <TableCell align="center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((item, index) => (
                !isDeletePost(item.id) && 
                <TableRow
                  key={item.title + index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
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
                  <TableCell align="center">{item?.category?.value}</TableCell>
                  <TableCell align="center">
                    {item?.receiverName || item?.user?.name}
                  </TableCell>
                  <TableCell align="center">
                    {item?.receiverPhone || item?.user?.zalo}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    <div className="w-full h-full flex justify-around">
                      <Button
                        bgColor={COLOR.PRIMARY_COLOR2}
                        onClick={()=>handleDeletePost(item.id)}
                        textColor="text-blue-500 hover:underline py-1"
                        text="Xóa"
                      />
                      {!item?.isAccept && !isAccepted(item.id) && (
                        <Button
                          onClick={() => onClickChangeAccept(item?.id)}
                          text="Duyệt"
                        />
                      )}
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
                    20,
                    { label: "Tất cả", value: -1 },
                  ]}
                  colSpan={3}
                  count={count || 0}
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
    </>
  );
};

function createData(title, category, receiverName, receiverPhone, createdAt) {
  return { title, category, receiverName, receiverPhone, createdAt };
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default Dashboard;

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
