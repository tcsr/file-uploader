import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const Header = () => {
    return (
        <>

            <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }} className="top-nav-bar">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ textDecoration: "none", color: "inherit" }}>
                        File Uploader
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header