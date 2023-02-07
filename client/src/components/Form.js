import { useForm } from "react-hook-form";
import List from "./List";
import { default as api } from "../store/apiSlice";

const Form = () => {
  const { register, handleSubmit, resetField } = useForm();

  // console.log("useAddTransactionMutation:", api.useAddTransactionMutation());
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();
    resetField("name");
    resetField("amount");
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              className="form-input"
              {...register("name")}
              type="text"
              placeholder="Salary / House Rent / SIP"
            />
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Savings" defaultValue>
              Savings
            </option>
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense" defaultValue>
              Expense
            </option>
          </select>
          <div className="input-group">
            <input
              className="form-input"
              {...register("amount")}
              type="text"
              placeholder="Amount"
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-indigo-500 w-full">
              Make a Transaction
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
};

export default Form;
