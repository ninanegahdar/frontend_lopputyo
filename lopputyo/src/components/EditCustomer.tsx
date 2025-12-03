import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Customer } from '../types';

type EditCustomerProps = {
    customer: Customer;
    updateCustomer: (customer: Customer, url: string) => Promise<any>;
    onCustomerUpdated?: () => void;
};

export default function EditCustomer({ customer, updateCustomer, onCustomerUpdated }: EditCustomerProps) {
    const [open, setOpen] = React.useState(false);
    const [editedCustomer, setEditedCustomer] = React.useState<Customer>(customer); ({
    firstname:'',
    lastname:'',
    streetaddress:'',
    postcode:'',
    city:'',
    email: '',
    phone: '',
    })

    useEffect(() => {
        if (customer) {
            setEditedCustomer(customer);
            setOpen(true);
        }
    }, [customer]);


    const handleClose = () => {
    setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateCustomer(editedCustomer, customer._links.self.href)
    .then(() => {
        console.log("Customer saved");
        handleClose();
        onCustomerUpdated?.();
    })
        .catch(err => console.error(err));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
    };


return (
    <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
            Edit
            </DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={editedCustomer.firstname}
                onChange={handleInputChange}
                label="First name"
                fullWidth
            />
            <TextField
                margin="dense"
                name="lastname"
                value={editedCustomer.lastname}
                onChange={handleInputChange}
                label="Last name"
                fullWidth
            />
            <TextField
                margin="dense"
                name="streetaddress"
                value={editedCustomer.streetaddress}
                onChange={handleInputChange}
                label="Address"
                fullWidth
            />
            <TextField
                margin="dense"
                name="postcode"
                value={editedCustomer.postcode}
                onChange={handleInputChange}
                label="Postcode"
                fullWidth
            />
            <TextField
                margin="dense"
                name="city"
                value={editedCustomer.city}
                onChange={handleInputChange}
                label="City"
                fullWidth
            />
            <TextField
                margin="dense"
                name="email"
                value={editedCustomer.email}
                onChange={handleInputChange}
                label="Email"
                type="email"
                fullWidth
            />
            <TextField
                margin="dense"
                name="phone"
                value={editedCustomer.phone}
                onChange={handleInputChange}
                label="Phone"
                fullWidth
            />

        </form>
        </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" form="subscription-form">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}
