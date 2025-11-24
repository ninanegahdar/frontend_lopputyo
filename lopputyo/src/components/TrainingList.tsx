import { useState, useEffect} from 'react';
import { getTrainings, deleteTraining } from '../api/trainingApi';
import { type GridColDef, type GridRenderCellParams, DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import type { Training } from '../types';

function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);

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


    const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'duration', headerName: 'Duration', width: 150 },
    { field: 'activity', headerName: 'Activity' },
    {
    field: '_links.self.href', headerName: '',
    renderCell: (params: GridRenderCellParams) =>
        <Button color= "error" size="small"
        onClick={() => handleDelete(params.id as string)}>
        Delete
        </Button>
        }
    ]

    return (
    <>
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
