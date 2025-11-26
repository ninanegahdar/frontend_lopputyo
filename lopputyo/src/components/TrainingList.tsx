import { useState, useEffect} from 'react';
import { getTrainings, deleteTraining } from '../api/trainingApi';
import { type GridColDef, type GridRenderCellParams ,DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { Training } from '../types';
import dayjs from "dayjs";


function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() =>  {
    fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        getTrainings()
        .then(data => setTrainings(data._embedded.trainings))
        .catch(err => console.error(err))
        }
    
    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
        deleteTraining(url)
        .then(() => fetchTrainings())
        .catch(err => console.error(err))
        }
        }

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
        training.activity.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
    <>
    {/* Haku */}
        <div style={{ width: '90%', margin: 'auto', marginBottom: '1rem' }}>
            <TextField
                label="Search Activity"
                variant="outlined"
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
            />
        </div>

    <div style={{width: '90%', height: 500, margin: 'auto'}}>
    <DataGrid
    rows={trainings}
    columns={columns}
    getRowId={row => row._links.self.href}
    autoPageSize
    rowSelection={false}
    />
    </div>
    </>
    )
}

export default TrainingList;
