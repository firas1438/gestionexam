const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4 mb-3">
      <thead>
        <tr className="text-left text-gray-900 text-sm">
          {columns.map((col) => (
            <th
              key={col.accessor}
              className={`pb-3 ${col.className || ""}`} // Adds spacing below the headers
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody> {/* Adds spacing above the first row */}
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
};

export default Table;
