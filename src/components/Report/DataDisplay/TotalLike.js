import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


export default function TotalLike(props) {




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
                            TOTAL LIKES
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            {props.totalLike}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'success.main',
                                height: 70,
                                width: 70
                            }}
                        >
                            <ThumbUpIcon />
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
