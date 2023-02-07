import _ from "lodash";

export const getSum = (transactions, type) => {
  const sum = _(transactions)
    .groupBy("type")
    .map((groupTransactions, groupType) => {
      if (!type) return _.sumBy(groupTransactions, "amount");
      return {
        type: groupType,
        color: groupTransactions[0].color,
        total: _.sumBy(groupTransactions, "amount"),
      };
    })
    .value();
  return sum;
};

export const getLabels = (transactions) => {
  const amountSumObjs = getSum(transactions, "type");
  const amountTotal = _.sum(getSum(transactions));
  const amountPercentObjs = _(amountSumObjs)
    .map((objs) =>
      _.assign(objs, { percent: (100 * objs.total) / amountTotal })
    )
    .value();
  return amountPercentObjs;
};

export const getChartData = (transactions, custom) => {
  let bg = _.map(transactions, (transaction) => transaction.color);
  bg = _.uniq(bg);
  const dataValue = getSum(transactions);

  const config = {
    data: {
      datasets: [
        {
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return custom ?? config;
};

export const getTotal = (transactions) => {
  return _.sum(getSum(transactions));
};
