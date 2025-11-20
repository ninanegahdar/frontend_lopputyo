import { useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { getCustomers, deleteCustomer } from '../customerApi';
import type { Customer } from '../types';


function Customerlist() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() =>  {
    fetchCustomers();
    }, []);

    const fetchCustomers = () => {
    getCustomers()
    .then(data => setCustomers(data._embedded.cars))
    .catch(err => console.error(err))
    }

    const handleDelete = (url: string) => {
    if (window.confirm("Are you sure?")) {
        deleteCustomer(url)
        .then(() => fetchCustomers())
        .catch(err => console.error(err))
        }
    }

    const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'First name', width: 150},
    { field: 'lastname', headerName: 'Last name', width: 150},
    { field: 'streetaddress', headerName: 'Address'},
    { field: 'postcode', headerName: 'Postcode'},
    { field: 'city', headerName: 'City'},
    { field: 'email', headerName: 'Price (€)'},
    { field: 'phone', headerName: 'Price (€)'},
    {
    field: '_links.self.href',
        renderCell: (params: GridRenderCellParams) =>
        <Button color=
        "error" size="small"
        onClick={() => handleDelete(params.id as string)}>
        Delete
        </Button>
        }
    ]

    return(
    <>
    <div style={{width: '90%', height: 500, margin: 'auto'}}>
        <DataGrid
        rows={customers}
        columns={columns}
        getRowId={row => row._links.self.href}
        autoPageSize
        rowSelection={false}
    />
    </div>
    </>
);
}
export default Customerlist;