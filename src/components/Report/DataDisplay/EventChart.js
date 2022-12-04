
import { Line } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import moment from "moment";


export default function EventChart (prop){
    const theme = useTheme();

    let daysAgo = {};
    let q = 0;

    for (let i = 6 ; i > 0 ; i--) {
        daysAgo[q] = moment().subtract(i, 'days').format("DD MMMM")
        q++;
        console.log(daysAgo)
    }

    const data = {
        datasets: [
            {
                backgroundColor: '#3F51B5',
                barPercentage: 0.5,
                barThickness: 12,
                borderRadius: 4,
                fill:true,
                data: prop.eventData,
                label: 'Past 7 Day',
                maxBarThickness: 20
            },
        ],
        labels: [daysAgo[0], daysAgo[1], daysAgo[2], daysAgo[3],daysAgo[4], daysAgo[5],moment().format("DD MMMM") ]
    };

    const options = {
        animation: false,
        cornerRadius: 10,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        xAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ],
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



    return(
        <Card>
            <CardHeader style={{textAlign: 'center' }}
                title="Total Event in Past 7 Day"
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <Line
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
            </Box>
        </Card>
    )
}
