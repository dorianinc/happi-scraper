import { usePagination } from "../../../context/PaginationContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import Pagination from "react-bootstrap/Pagination";

const HistoryPagination = () => {
  const {darkMode} = useDarkMode()
  const { page, setPage, active, setActive, numOfPages } = usePagination();

  const changePage = (pageValue) => {
    setActive(pageValue);
    setPage(pageValue);
  };

  const createLayout = () => {
    const startPoint = 1;
    const endPoint = numOfPages;
    let pageItems = [];
    // if there are less than 6 pages ...
    if (numOfPages < 6) {
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
      // if there are more than 6 pages
    } else {
      pageItems = [];
      if (page < startPoint + 3) {
        for (let i = 2; i <= 4; i++) {
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
      } else if (page > endPoint - 3) {
        for (let i = endPoint - 1; i >= endPoint - 3; i--) {
          pageItems.unshift(
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
        for (let i = page - 1; i <= page + 1; i++) {
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
      }

      if (page >= 4) {
        pageItems.splice(
          0,
          0,
          <Pagination.Ellipsis onClick={() => changePage(page - 2)} />
        );
      }
      if (page <= numOfPages - 3) {
        pageItems.splice(
          pageItems.length,
          0,
          <Pagination.Ellipsis onClick={() => changePage(page + 2)} />
        );
      }
    }
    return pageItems;
  };

  return (
    <Pagination className={`pagination ${darkMode ? 'dark-mode' : 'light-mode'}`}>
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
    </Pagination>
  );
};

export default HistoryPagination;
