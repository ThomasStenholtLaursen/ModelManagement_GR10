import { Typography, Card, CardContent, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Importing an icon for demonstration
import EmailIcon from "@mui/icons-material/Email";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Welcome
          </Typography>
          {user && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1">Role: {user.role}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Typography variant="subtitle1">Email: {user.email}</Typography>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomePage;
