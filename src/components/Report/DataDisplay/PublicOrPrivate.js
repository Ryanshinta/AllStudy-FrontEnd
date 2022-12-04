import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from "chart.js";
import Chart from 'chart.js/auto'
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';

export default function PublicOrPrivate(props){
    const theme = useTheme();
    Chart.register(ArcElement);
    
    
    function percentageCal(total,num) {
        return (100 * num)/total;
    }
    
    const data = {
        datasets: [
            {
                data: [props.totalPublic, props.totalPrivate],
                backgroundColor: ['#3F51B5', '#e53935'],
                borderWidth: 8,
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF'
            }
        ],
        labels: ['Public Room', 'Private Room']
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const devices = [
        {
            title: 'Public Room',
            value: percentageCal(props.totalPublic+props.totalPrivate,props.totalPublic).toFixed(0),
            icon: PublicIcon,
            color: '#3F51B5'
        },
        {
            title: 'Private Room',
            value: percentageCal(props.totalPublic+props.totalPrivate,props.totalPrivate).toFixed(0),
            icon: LockIcon,
            color: '#e53935'
        }
    ];


    return(
        <Card>
            <CardHeader title="Public or Private" style={{textAlign: 'center' }} />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {devices.map(({
                                      color,
                                      icon: Icon,
                                      title,
                                      value
                                  }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Icon color="action" />
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h4"
                            >
                                {value}
                                %
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>


        </Card>
    )
}
