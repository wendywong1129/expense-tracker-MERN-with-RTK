import { default as api } from "../store/apiSlice";
import { getLabels } from "../helper/helper";
// const items = [
//   {
//     type: "Savings",
//     color: "rgb(255, 99, 132)",
//     percent: 45,
//   },
//   {
//     type: "Investment",
//     color: "rgb(255, 205, 86)",
//     percent: 20,
//   },
//   {
//     type: "Expense",
//     color: "rgb(54, 162, 235)",
//     percent: 10,
//   },
// ];

const LabelComponent = ({ data }) => {
  if (!data) return <></>;
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <div className="flex gap-6">
        <h3 className="font-bold">${data.total ?? ""}</h3>
        <h3 className="font-bold">{Math.round(data.percent) ?? 0}%</h3>
      </div>
    </div>
  );
};

const Labels = () => {
  // console.log("useGetLabelsQuery:", api.useGetLabelsQuery());
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

  let Transactions;
  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    // console.log("getLabelsHelper:", getLabels(data, "type"));
    Transactions = getLabels(data, "type").map((item, index) => (
      <LabelComponent key={index} data={item} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }
  return (
    <>
      {/* {data.map((item, index) => (
        <LabelComponent key={index} data={item} />
      ))} */}
      {Transactions}
    </>
  );
};

export default Labels;
