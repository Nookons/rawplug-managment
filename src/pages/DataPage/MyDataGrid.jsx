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
                            return <div style={{cursor: 'pointer', fontFamily: '\'Jost\', sans-serif'}} onClick={() => handleIndexClick(params.id)}>{params.value}</div>;
                        }
                        if (column.field === 'status') {
                            if (params.value === 'Available') {
                                return <div style={{backgroundColor: '#7cff78', width: '100%', padding: 14, fontFamily: '\'Jost\', sans-serif'}} >{params.value}</div>;
                            }
                            if (params.value === 'Odzysk') {
                                return <div style={{backgroundColor: '#fff267', width: '100%', padding: 14, fontFamily: '\'Jost\', sans-serif'}} >{params.value}</div>;
                            }
                            return <div style={{backgroundColor: '#ff6868', width: '100%', padding: 14, fontFamily: '\'Jost\', sans-serif'}} >{params.value}</div>;
                        }
                        return <div style={{fontFamily: '\'Jost\', sans-serif'}}>{params.value}</div>;
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