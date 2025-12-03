import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


    function Home() {
        return (
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography gutterBottom sx={{ fontSize: 25 }}>
            Welcome to the Personal Trainer Dashboard.
            </Typography>
            <Typography>
                Manage customers, track trainings & keep everything organized in one place.
            </Typography>
        </CardContent>
    </Card>
    );
}

export default Home;