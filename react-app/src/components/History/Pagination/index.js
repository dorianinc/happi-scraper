import Pagination from "react-bootstrap/Pagination";

const HistoryPagination = () => {
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis disabled/>

      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>

      <Pagination.Ellipsis disabled/>
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
};

export default HistoryPagination;
