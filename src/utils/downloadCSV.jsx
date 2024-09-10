export const downloadCSV = (expenses) => {
    if (!expenses || expenses.length === 0) return;

    const csvRows = [];
    // Add header row
    csvRows.push(['ID', 'Description', 'Amount', 'Date'].join(','));

    // Add data rows
    expenses.forEach(expense => {
        csvRows.push([expense.id, expense.description, expense.amount, expense.date].join(','));
    });

    // Create a Blob with CSV data
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger a download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
