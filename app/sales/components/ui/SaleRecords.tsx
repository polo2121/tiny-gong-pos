import React from "react";
import EditRowButton from "@/components/EditRowButton";
import RemoveRowButton from "@/components/RemoveRowButton";

const SaleRecords = () => {
  const sales = [
    {
      product_name: "Classic Cotton T-Shirt",
      unit_price: 6500,
      qty: 3,
      line_price: 19500,
    },
    {
      product_name: "Slim Fit Denim Jeans",
      unit_price: 28000,
      qty: 1,
      line_price: 28000,
    },
    {
      product_name: "Lightweight Hoodie",
      unit_price: 22000,
      qty: 2,
      line_price: 44000,
    },
  ];
  return (
    <section className="font-quicksand">
      {sales.map((sale) => (
        <div key={sale.line_price}>
          <h1 className="bg-brown-200 w-fit py-2 px-6 rounded-full font-margarine text-xs border-2 border-white drop-shadow-xs relative top-4 z-20">
            SAL-10032
          </h1>
          <details className="px-6 py-8 rounded-[30px] relative custom-border ">
            {/* customer name */}
            <summary className="flex justify-between">
              <div className="left w-[80%]">
                <span className="text-xs text-brown-900/60 font-margarine font-medium">
                  Customer Name
                </span>
                <h3 className="font-semibold ">Aung Thuya Aung Khant</h3>
                <time
                  className="text-xs opacity-50"
                  dateTime="2025-07-12T11:30"
                >
                  2025-07-31 . 11:30 AM
                </time>
              </div>

              <div className="right ">
                <span className="text-xs text-brown-900/60 font-medium font-margarine">
                  Total Cost
                </span>
                <h3 className="font-semibold">8,0000</h3>
              </div>
            </summary>

            <div className="details flex flex-col gap-4">
              {/* Button */}
              <section className="w-full flex gap-4 justify-end">
                <EditRowButton />
                <RemoveRowButton />
              </section>

              {/* Table  */}
              <section className="overflow-x-scroll">
                {/* Header Bar */}
                <div className="w-full h-9 rounded-full absolute left-0 bg-brown-200"></div>
                <table className="w-full text-sm text-left bg-aber-500 relative table-fixed border-separate border-spacing-0">
                  <colgroup>
                    <col style={{ width: "150px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "100px" }} />
                  </colgroup>

                  <thead className="">
                    <tr className="text-brown-900/60 rounded-full font-margarine">
                      <th
                        scope="col"
                        className="wrap-break-word whitespace-normal sticky left-0 z-20  bg-brown-200"
                      >
                        Products
                      </th>
                      <th
                        scope="col"
                        className="wrap-break-word whitespace-normal pl-2 py-2 "
                      >
                        Qty
                      </th>
                      <th
                        scope="col"
                        className="wrap-break-word whitespace-normal py-2 "
                      >
                        Line Total
                      </th>
                      <th
                        scope="col"
                        className="wrap-break-words whitespace-normal"
                      >
                        Unit Price
                      </th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {sales.map((sale) => (
                      <tr
                        className="custom-border-b font-medium "
                        key={sale.product_name}
                      >
                        <td
                          scope="row"
                          className="wrap-break-word whitespace-normal sticky left-0 bg-white z-10 py-2"
                        >
                          EPHAE BLUE JEAN
                        </td>
                        <td className="w-[100px] wrap-break-word whitespace-normal pl-2 py-2">
                          427311
                        </td>
                        <td>1000</td>
                        <td>100,000</td>
                      </tr>
                    ))}

                    {/* Total Qty and Amount */}
                    <tr className="custom-border-b font-medium sticky">
                      <td
                        scope="row"
                        className="wrap-break-word whitespace-normal sticky left-0 bg-white z-10 py-2 border-t"
                      ></td>
                      <td className="w-[100px] wrap-break-word whitespace-normal pl-2 py-2 font-semibold border-t">
                        2000
                      </td>
                      <td className="font-semibold border-t">200,000</td>
                      <td className="border-t"></td>
                    </tr>
                  </tbody>
                </table>

                <div className="w-full h-auto bg-amber-300 overflow-x-scroll "></div>
              </section>

              {/* Extra Info */}
              <section className="extra-info w-full flex justify-between text-brown-900">
                <div>
                  <span className="text-xs text-brown-900/60 font-margarine font-medium">
                    Profit
                  </span>
                  <h3 className="font-quicksand font-semibold text-md">
                    2,000
                  </h3>
                </div>

                <div>
                  <span className="text-xs text-brown-900/60 font-margarine font-medium">
                    Payment Method
                  </span>
                  <h3 className="font-quicksand font-semibold text-md">
                    K-Pay
                  </h3>
                </div>

                <div>
                  <span className="text-xs text-brown-900/60 font-margarine font-medium">
                    Delivery
                  </span>
                  <h3 className="font-quicksand font-semibold text-md">
                    Pick Up
                  </h3>
                </div>
              </section>
            </div>
          </details>
        </div>
      ))}
    </section>
  );
};

export default SaleRecords;
