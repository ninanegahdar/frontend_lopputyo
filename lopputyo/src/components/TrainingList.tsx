import { useState, useEffect } from 'react';
import { deleteTraining, getTrainingsWithCustomer, saveTraining } from '../api/trainingApi';
import { DataGrid, GridActionsCellItem, type GridRowParams, type GridColDef,} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import type { Training } from '../types';
import dayjs from "dayjs";
import AddTraining from './AddTraining';

function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchTrainings();
    }, []);

const fetchTrainings = () => {
    getTrainingsWithCustomer()
        .then(data => {
            const trainingsData = data._embedded?.trainings || data;
            const trainingsWithCustomer = trainingsData.map((t: any) => ({
        ...t,
    customerName: t.customer.firstname + " " + t.customer.lastname
}));
setTrainings(trainingsWithCustomer);

        })
        .catch(err => console.error(err));
};


    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            const url = `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`;
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
            field: 'actions',
                    type: 'actions',
                    headerName: '',
                    getActions: (params: GridRowParams) => [
                        <GridActionsCellItem
                            icon={<DeleteIcon color="error" />}
                            onClick={() => handleDelete(params.row.id)}
                            label="Delete"
                        />
                    ]
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
            <AddTraining
                    saveTraining={saveTraining}
                    onTrainingAdded={fetchTrainings}
                    customerUrl={''}
                />

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
