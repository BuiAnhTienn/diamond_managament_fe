// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Pie } from "@ant-design/plots";
import loadingImg from "@assets/loading.png";
import Select from "@components/Select";
import { ChartOption } from "@constants/ChartOption";
import { StaticQuery, statistic } from "@services/order.service";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Typography } from "antd";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import "./style.css";

const StatisticAdmin = () => {
  const [option, setOptions] = useState<StaticQuery>({
    formAtTime: ChartOption.Date,
    fromDate: undefined,
    toDate: undefined,
  });

  const [debouncedValue] = useDebounce(option, 700);

  const { data, isFetching } = useQuery(
    ["order", debouncedValue],
    () => statistic(debouncedValue),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const refactorData = useMemo(
    () =>
      data?.map?.((item) => {
        switch (option.formAtTime) {
          case ChartOption.Date:
            return { value: item.totalPrice, type: item.date };
          case ChartOption.Month:
            return { value: item.total_price, type: item.month };
          case ChartOption.Year:
            return { value: item.total_price, type: item.year };
        }
      }),
    [data, option]
  );

  const refactorDataWithSort = refactorData?.sort((a, b) => {
    return a?.value ?? 0 > b?.value ?? 0;
  });

  const config = {
    appendPadding: 10,
    data: refactorDataWithSort,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  };

  const setValue = (obj: StaticQuery) => {
    setOptions((prev) => ({ ...prev, ...obj }));
  };

  return (
    <div>
      <Typography.Title level={3} className="mb-10">
        Thống kê doanh thu
      </Typography.Title>
      <div style={{ display: "flex", gap: 20 }} className="mb-10">
        <div>
          <Typography className="mb-2">Chọn ngày bắt đầu:</Typography>
          <DatePicker
            onChange={(e) => {
              setValue({ fromDate: e?.toDate() });
            }}
            placeholder="Chọn ngày bắt đầu"
          ></DatePicker>
        </div>
        <div>
          <Typography className="mb-2">Chọn ngày kết thúc:</Typography>
          <DatePicker
            onChange={(e) => {
              setValue({ toDate: e?.toDate() });
            }}
            placeholder="Chọn ngày kết thúc"
          ></DatePicker>
        </div>
        <div>
          <Select
            label="Chọn khoảng thời gian"
            options={Object.values(ChartOption).map((item) => ({
              value: item,
              label: item,
            }))}
            value={option.formAtTime}
            onChange={(value) => setOptions({ formAtTime: value })}
          ></Select>
        </div>
      </div>
      <div style={{ minHeight: 500 }}>
        {isFetching ? (
          <div className="rotate-image">
            <img src={loadingImg}></img>
          </div>
        ) : (
          <div style={{ padding: "0 100px", marginTop: "auto" }}>
            {refactorData?.length !== 0 ? (
              <Pie {...config} />
            ) : (
              <Typography.Title level={4}>
                Không có data để hiển thị!
              </Typography.Title>
            )}
          </div>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <Typography.Title level={5}>
          Biểu đồ{" "}
          {option.formAtTime === ChartOption.Date
            ? "ngày"
            : option.formAtTime === ChartOption.Month
            ? "tháng"
            : "năm"}
        </Typography.Title>
      </div>
    </div>
  );
};

export default StatisticAdmin;
