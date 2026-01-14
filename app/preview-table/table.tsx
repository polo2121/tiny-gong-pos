import React from "react";

const Table = ({ cols, data }) => {
  return (
    <div className="rounded-3xl mt-10">
      <table className="border border-collapse w-full text-left rounded-3x">
        <caption className="text-2xl font-margarine mb-4 text-left">
          Product Table
        </caption>
        <thead className="bg-gray-200 font-margarine">
          <tr>
            {cols.map((col) => (
              <th className="p-4" key={col.label}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-quicksand">
          {data.map((data) => (
            <tr key={data.pid}>
              {/* <td className="p-4">{data.pid}</td>
              <td className="p-4">{data.name}</td>
              <td className="p-4">{data.category}</td>
              <td className="p-4">{data.created_at}</td> */}
              {cols.map((col) => (
                <td className="p-4">{data[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
