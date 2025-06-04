import Papa from 'papaparse';

async function ExportToCSV(data, filename = 'data.csv') {
    // Convert JavaScript array/object to CSV string
    const csv = Papa.unparse(data);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export {
    ExportToCSV
}
