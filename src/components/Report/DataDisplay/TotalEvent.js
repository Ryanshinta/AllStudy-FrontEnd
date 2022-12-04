import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import EventNoteIcon from '@mui/icons-material/EventNote';



export default function TotalEvent(props) {




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
                            TOTAL EVENTS
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            {props.totalEvent}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: '#bdab37',
                                height: 70,
                                width: 70
                            }}
                        >
                            <EventNoteIcon />
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
