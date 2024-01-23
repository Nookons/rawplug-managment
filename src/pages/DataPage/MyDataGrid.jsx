import React from 'react';
import {columns} from "./Columns";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";

const MyDataGrid = ({data, handleIndexClick}) => {
    return (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns.map((column) => ({
                    ...column,
                    renderCell: (params) => {
                        if (column.field === 'index') {
                            return <div style={{cursor: 'pointer'}} onClick={() => handleIndexClick(params.id)}>{params.value}</div>;
                        }
                        return <div>{params.value}</div>;
                    },
                }))}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default MyDataGrid;