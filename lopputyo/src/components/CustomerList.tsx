import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { getCustomers, deleteCustomer, saveCustomer, updateCustomer } from '../api/customerApi';
import type { Customer } from '../types';

import { useState, useEffect} from 'react';
import { type GridColDef, GridActionsCellItem, type GridRowParams, DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchText, setSearchText] = useState("");
    const [editCustomerParams, setEditCustomerParams] = useState<Customer | null>(null);

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

    const handleCustomerUpdated = () => {
    fetchCustomers();
    setEditCustomerParams(null);
    };

    const exportCustomersToCSV = (customers: Customer[]) => {
        if (!customers || customers.length === 0) return;

        const headers = ['First name', 'Last name', 'Address', 'Postcode', 'City', 'Email', 'Phone'];
        const rows = customers.map(c => [
            c.firstname,
            c.lastname,
            c.streetaddress,
            c.postcode,
            c.city,
            c.email,
            c.phone
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.map(v => `"${v}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute('download', 'customers.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'First name', width: 150, sortable: true },
    { field: 'lastname', headerName: 'Last name', width: 150, sortable: true },
    { field: 'streetaddress', headerName: 'Address', sortable: true },
    { field: 'postcode', headerName: 'Postcode', sortable: true },
    { field: 'city', headerName: 'City', sortable: true },
    { field: 'email', headerName: 'Email', sortable: true },
    { field: 'phone', headerName: 'Phone', sortable: true },

    { field: 'edit',
        type: 'actions',
        headerName: '',
        getActions: (params: GridRowParams) => [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() =>
                    setEditCustomerParams(params.row)}/>
        ]
    },

    { field: 'actions',
        type: 'actions',
        headerName: '',
        getActions: (params: GridRowParams) => [
            <GridActionsCellItem
                icon={<DeleteIcon color="error" />}
                onClick={() => handleDelete(params.id as string)}
                label="Delete"
            />
        ]
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
        
        <Button
            variant="outlined"
            onClick={() => exportCustomersToCSV(customers)}
            >
            Export CSV
        </Button>
        <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={row => row._links.self.href}
            autoPageSize
            rowSelection={false}
        />
    </div>
        {editCustomerParams && (
        <EditCustomer
            customer={editCustomerParams}
            updateCustomer={updateCustomer}
            onCustomerUpdated={handleCustomerUpdated}
            />
        )}
    </>
    );
}

export default CustomerList;