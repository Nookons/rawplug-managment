export const columns = [
    { field: 'index' , headerName: 'index', width: 200 },
    {
        field: 'Accepted',
        headerName: 'Accepted by',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        editable: true,
        width: 200,
        valueGetter: (params) => `${params.row.Created}`,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        editable: true,
        width: 100,
        valueGetter: (params) => `${params.row.quantity.toLocaleString()}`,
    },
    {
        field: 'JM',
        headerName: 'JM',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        editable: true,
        width: 100,
        valueGetter: (params) => `${params.row.JM.toLowerCase()}`,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        valueGetter: (params) =>
            `${params.row.status}`,
    },
    {
        field: 'Sender',
        headerName: 'Sender',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 100,
        valueGetter: (params) =>
            `${params.row.Sender} 👉`,
    },
    {
        field: 'Recipient',
        headerName: 'Recipient',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 150,
        valueGetter: (params) =>
            `${params.row.Recipient}`,
    },
    {
        field: 'createdDate',
        headerName: 'createdDate',
        width: 250,
        editable: false,
    },
    {
        field: 'PalletReceipt',
        headerName: 'PalletReceipt',
        width: 250,
        editable: false,
    },
];