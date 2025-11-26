import { useState, useEffect } from 'react';
import { deleteTraining, getTrainingsWithCustomer } from '../api/trainingApi';
import { DataGrid, type GridColDef, type GridRenderCellParams} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { Training } from '../types';
import dayjs from "dayjs";

function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        getTrainingsWithCustomer()
            .then(data => {
                // Lisää customerName jokaiselle harjoitukselle
                const trainingsWithCustomer = data.map((t: any) => ({
                    ...t,
                    customerName: t.customer.firstname + " " + t.customer.lastname
                }));
                setTrainings(trainingsWithCustomer);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            deleteTraining(url)
                .then(() => fetchTrainings())
                .catch(err => console.error(err));
        }
    };

    const columns: GridColDef<Training>[] = [
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            valueFormatter: (params: { value: string }) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm"),
            sortable: true
        },
        { field: 'duration', headerName: 'Duration', width: 150, sortable: true },
        { field: 'activity', headerName: 'Activity', sortable: true },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            width: 200,
            sortable: true
        },
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

    const filteredRows = trainings.filter(training =>
    Object.values({
        date: dayjs(training.date).format("DD.MM.YYYY HH:mm"),
        duration: training.duration.toString(),
        activity: training.activity,
        customerName: (training as any).customerName
    }).some(value =>
        value.toLowerCase().includes(searchText.toLowerCase())
    )
);

    return (
        <>
            {/* Haku */}
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

            <div style={{ width: '90%', height: 500, margin: 'auto' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    getRowId={row => row.id}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    );
}

export default TrainingList;
