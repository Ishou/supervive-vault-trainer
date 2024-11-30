import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";

export default function AppNav() {
  return (
    <AppBar position="static">
      <Container disableGutters>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Supervive Vault Trainer
          </Typography>
          <Button
            size="large"
            color="inherit"
            aria-label="Open GitHub repository in new tab"
            startIcon={<GitHub />}
            endIcon={<OpenInNew />}
          >
            GitHub
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
