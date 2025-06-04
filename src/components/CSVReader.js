import React from 'react'

function CSVReader({ data = [] }) {
    if (!data.length) {
        return <div>No data available</div>;
    }

    // Extract column headers from the first row
    const columns = Object.keys(data[0]);

    // Filter rows to include only those with all columns present and non-empty
    const filteredData = data.filter(row =>
        columns.every(col => row[col] !== undefined && row[col] !== '')
    );

    if (!filteredData.length) {
        return <div>No complete rows available</div>;
    }

    return (
        <div style={{ overflowX: 'auto' }} className='my-5 w-full max-h-[500px] overflow-y-scroll'>
            <table style={{ borderCollapse: 'collapse' }} className='w-full '>
                <thead className='font-ubuntu'>
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                    backgroundColor: '#f4f4f4',
                                    textAlign: 'left',
                                }}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='font-poppins text-sm'>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                    }}
                                >
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CSVReader;
