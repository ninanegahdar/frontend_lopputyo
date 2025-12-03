import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Customer, Training } from '../types';
import { getCustomers } from '../api/customerApi';
import { Autocomplete } from '@mui/material';

type AddTrainingProps = {
    saveTraining: (training: Omit<Training, "_links" | "id">) => Promise<any>;
    customerUrl: string;
    onTrainingAdded?: () => void;
};

export default function AddTraining({ saveTraining, onTrainingAdded }: AddTrainingProps) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        duration: 0,
        activity: '',
        customer: ''
    });

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        getCustomers()
            .then(data => setCustomers(data._embedded?.customers || []))
            .catch(err => console.error(err));
    }, []);


    const handleClickOpen = () => {
    setTraining(prev => ({ ...prev, customer: ''}));
    setOpen(true);
};

    const handleClose = () => {
    setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!training.customer) {
            alert("Please select a customer");
            return;
            }
        saveTraining(training)
            .then(() => {
                console.log("Training saved");
                handleClose();
                if (onTrainingAdded) onTrainingAdded();
            })
            .catch(err => console.error(err));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTraining(prev => ({
            ...prev,
            [name]: name === 'duration' ? Number(value) : value
        }));
    };

    return (
    <>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add Training
        </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                New Training
            </DialogTitle>
                <DialogContent>
                <form onSubmit={handleSubmit} id="training-form">
                <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={handleInputChange}
                        label=""
                        type="datetime-local"
                        fullWidth
                        />
                        <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}
                        label="Duration (minutes)"
                        fullWidth
                        />
                        <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        label="Activity"
                        fullWidth
                        />
                        <Autocomplete
                            options={customers}
                            getOptionLabel={(option) => option.firstname + " " + option.lastname}
                            onChange={(event, newValue) => {
                                if (newValue) setTraining(prev => ({
                                    ...prev,
                                    customer: newValue._links.self.href
                            }));
                        }}
                            renderInput={(params) => <TextField {...params} label="Customer" margin="dense" fullWidth />}
                        />
                    </form>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="training-form">Save</Button>
            </DialogActions>
        </Dialog>
    </>
    );
}
