import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography variant='h6' noWrap component='div'>
            KONE Equipment Manager
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
