import "boxicons";
import { default as api } from "../store/apiSlice";

// const items = [
//   {
//     name: "Savings",
//     color: "rgb(255, 99, 132)",
//   },
//   {
//     name: "Investment",
//     color: "rgb(255, 205, 86)",
//   },
//   {
//     name: "Expense",
//     color: "rgb(54, 162, 235)",
//   },
// ];

const Transaction = ({ category, clickHandler }) => {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3" onClick={clickHandler}>
        <box-icon
          name="trash"
          size="15px"
          color={category.color ?? "#e5e5e5"}
          data-id={category._id ?? ""}
        ></box-icon>
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
};

const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();

  const handleClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
  };

  let Transactions;
  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((item, index) => (
      <Transaction key={index} category={item} clickHandler={handleClick} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {/* {items.map((item, index) => (
        <Transaction key={index} category={item}></Transaction>
      ))} */}
      {Transactions}
    </div>
  );
};

export default List;
