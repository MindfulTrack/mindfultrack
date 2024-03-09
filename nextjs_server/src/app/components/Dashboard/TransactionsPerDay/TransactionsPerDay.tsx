'use client'
import React from 'react';
import scss from "./TransactionsPerDay.module.scss"
import {Grid, Card, Paper} from "@mui/material";
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/system";
import DataChart from "../../DataChart/DataChart";
//import { lineChartData } from '../../mockData';
import { months } from "../../../../helper/Util";
import customFetch from '../../../api/fetchInterceptor';
import {useState, useEffect} from 'react';

// interface TransactionsPerDayProps {

// }

// const TransactionsPerDay: React.FC<TransactionsPerDayProps> = () => {
//     return (
//         <div style={{ marginTop: 200 }}>
//             Transactions Per Day
//         </div>
//     );
// };

export type TransactionCardType = {
    title: string;
    value: string;
    changeValue: string;
}

export type TransactionsPerDayProps = {
    // data: TransactionCardType;
}

const TransactionsPerDay = (props: TransactionsPerDayProps) => {
    // const {data} = props;
    const theme = useTheme();
    const [lineChartData, setLineChartData] = useState([]);


    useEffect(() => {
        const fetchQueue = async () => {
            try {
                const monthDataResponse = await customFetch('base/lineChartData');
                setLineChartData(monthDataResponse);
            } catch (error : any) {
                console.log(error);
            }
        };

        fetchQueue();
    }, []);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const lineChartOptions ={
        labels: months({ count: currentMonth }),
            datasets: [
                {
                    label: "New Students in Queue",
                    data: lineChartData,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                },
            ],
    }
    const numTotalStudents = lineChartData.reduce((a,b) => a + b, 0);
    const increase = lineChartData[11] - lineChartData[10]
    const percentChange = increase / lineChartData[10] * 100

    return (
        <Grid container gap={2} className={scss.wrapper}>
            <Paper className={scss.transactions}>
                <div className={scss.chart}>
                    <Typography>Number of New Students on Waitlist</Typography>
                    <DataChart type={"line"} data={lineChartOptions} />
                </div>
                <div className={scss.cardWrapper}>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>Total Students</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>{ numTotalStudents }</Typography>
                            {/* <Typography color={theme.palette.success.main} fontSize={14}>
                                428.7%
                            </Typography> */}
                        </div>
                     </Card>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>% Change</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>{ percentChange }%</Typography>
                            {/* <Typography color={theme.palette.success.main} fontSize={14}>
                                899.4%
                            </Typography> */}
                        </div>
                    </Card>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>% Receiving Other Services</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>17%</Typography>
                            {/* <Typography color={theme.palette.success.main} fontSize={14}>
                                0
                            </Typography> */}
                        </div>
                    </Card>
                </div>
            </Paper>
        </Grid>
    )
}

export default TransactionsPerDay;