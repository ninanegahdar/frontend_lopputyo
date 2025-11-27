import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddCustomer () {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
    firstname:'',
    lastname:'',
    streetaddress:'',
    postcode:'',
    city:'',
    email: '',
    phone: '',
    })

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
};


return (
    <React.Fragment>
    <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
    </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
            New Customer
            </DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={handleInputChange}
                label="First name"
                fullWidth
            />
            <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={handleInputChange}
                label="Last name"
                fullWidth
            />
            <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={handleInputChange}
                label="Address"
                fullWidth
            />
            <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={handleInputChange}
                label="Postcode"
                fullWidth
            />
            <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={handleInputChange}
                label="City"
                fullWidth
            />
            <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
                label="Email"
                type="email"
                fullWidth
            />
            <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
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