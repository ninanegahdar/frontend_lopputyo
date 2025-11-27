import AddCustomer from './AddCustomer';
import { getCustomers, deleteCustomer, saveCustomer } from '../api/customerApi';
import type { Customer } from '../types';

import { useState, useEffect} from 'react';
import { type GridColDef, type GridRenderCellParams, DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() =>  {
    fetchCustomers();
    }, []);

    const fetchCustomers = () => {
    getCustomers()
    .then(data => setCustomers(data._embedded.customers))
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
    { field: 'firstname', headerName: 'First name', width: 150, sortable: true },
    { field: 'lastname', headerName: 'Last name', width: 150, sortable: true },
    { field: 'streetaddress', headerName: 'Address', sortable: true },
    { field: 'postcode', headerName: 'Postcode', sortable: true },
    { field: 'city', headerName: 'City', sortable: true },
    { field: 'email', headerName: 'Email', sortable: true },
    { field: 'phone', headerName: 'Phone', sortable: true },
    {
        field: '_links.self.href',
        headerName: '',
        renderCell: (params: GridRenderCellParams) =>
            <Button color="error" size="small"
            onClick={() => handleDelete(params.id as string)}>
                Delete
            </Button>
    }
];

    const filteredRows = customers.filter(customer =>
        customer.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
    <>
    {/* Haku*/}
        <div style={{ width: '90%', margin: 'auto', marginBottom: '1rem' }}>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
            />
        </div>

    <div style={{width: '90%', height: 500, margin: 'auto'}}>
        <AddCustomer
            saveCustomer={saveCustomer}
            onCustomerAdded={fetchCustomers}
            />
        <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={row => row._links.self.href}
            autoPageSize
            rowSelection={false}
        />
    </div>
</>
)
}

export default CustomerList;