import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


export default function TotalLogin(props) {




    return(
        <Card
            sx={{ height: '100%' }}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            TOTAL LOGIN
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            {props.totalLogin}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'error.main',
                                height: 70,
                                width: 70
                            }}
                        >
                            <VpnKeyIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        pt: 2,*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center'*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ArrowDownwardIcon color="error" />*/}
                {/*    <Typography*/}
                {/*        color="error"*/}
                {/*        sx={{*/}
                {/*            mr: 1*/}
                {/*        }}*/}
                {/*        variant="body2"*/}
                {/*    >*/}
                {/*        12%*/}
                {/*    </Typography>*/}
                {/*    <Typography*/}
                {/*        color="textSecondary"*/}
                {/*        variant="caption"*/}
                {/*    >*/}
                {/*        Since last month*/}
                {/*    </Typography>*/}
                {/*</Box>*/}
            </CardContent>
        </Card>
    )
}
