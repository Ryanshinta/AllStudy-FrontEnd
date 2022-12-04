import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


export default function TotalFollowing(props) {




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
                            TOTAL FOLLOWINGS
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            {props.totalFollowing}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'warning.main',
                                height: 70,
                                width: 70
                            }}
                        >
                            <PersonAddIcon />
                        </Avatar>
                    </Grid>
                </Grid>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        alignItems: 'center',*/}
                {/*        display: 'flex',*/}
                {/*        pt: 2*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <ArrowUpwardIcon color="success" />*/}
                {/*    <Typography*/}
                {/*        variant="body2"*/}
                {/*        sx={{*/}
                {/*            mr: 1*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        16%*/}
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
