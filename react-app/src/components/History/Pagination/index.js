import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "../../../context/PaginationContext";
import { getProductsThunk } from "../../../store/productsReducer";
import Pagination from "react-bootstrap/Pagination";

const HistoryPagination = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const { page, setPage, limit } = usePagination();
  const numOfPages = 6;

  useEffect(() => {
    dispatch(getProductsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  const changePage = (pageValue) => {
    setActive(pageValue);
    setPage(pageValue);
  };

  const createLayout = () => {
    let pageItems = [];

    if (numOfPages <= 5) {
      for (let i = 2; i <= numOfPages; i++) {
        pageItems.push(
          <Pagination.Item
            key={i}
            onClick={() => changePage(i)}
            active={i === active}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      for (let i = 2; i <= numOfPages; i++) {
        pageItems.push(
          <Pagination.Item
            key={i}
            onClick={() => changePage(i)}
            active={i === active}
          >
            {i}
          </Pagination.Item>
        );
      }
      if (page >= 4) {
        pageItems.splice(0, 0, <Pagination.Ellipsis disabled />);
      }
      if (page <= numOfPages - 1) {
        pageItems.splice(numOfPages, 0, <Pagination.Ellipsis disabled />);
      }
    }
    return pageItems;
  };

  // const createPageItems = () => {
  //   let pageItems = [];
  //   for (let i = page + 1; i <= 3; i++) {
  //     pageItems.push(
  //       <Pagination.Item
  //         key={i}
  //         onClick={() => changePage(i)}
  //         active={i === active}
  //       >
  //         {i}
  //       </Pagination.Item>
  //     );
  //   }
  //   return pageItems;
  // };

  return (
    <Pagination>
      {numOfPages > 1 && (
        <Pagination.Prev
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
        />
      )}
      <Pagination.Item
        key={1}
        onClick={() => changePage(1)}
        active={active === 1}
      >
        {1}
      </Pagination.Item>
      {createLayout()}
      {numOfPages > 5 && (
        <Pagination.Item
          key={numOfPages}
          onClick={() => changePage(numOfPages)}
          active={active === numOfPages}
        >
          {numOfPages}
        </Pagination.Item>
      )}
      {numOfPages > 1 && (
        <Pagination.Next
          onClick={() => changePage(page + 1)}
          disabled={page === numOfPages}
        />
      )}
      {/* <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis disabled />

      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>

      <Pagination.Ellipsis disabled />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next /> */}
    </Pagination>
  );
};

export default HistoryPagination;
