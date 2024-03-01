'use client'
import React from 'react';
import scss from "./TransactionsPerDay.module.scss"
import {Grid, Card, Paper} from "@mui/material";
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/system";
import DataChart from "../../DataChart/DataChart";
import { lineChartData } from '../../mockData';

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

    return (
        <Grid container gap={2} className={scss.wrapper}>
            <Paper className={scss.transactions}>
                <div className={scss.chart}>
                    <Typography>Number of Students on Waitlist</Typography>
                    <DataChart type={"line"} data={lineChartData} />
                </div>
                <div className={scss.cardWrapper}>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>Total Students</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>327</Typography>
                            {/* <Typography color={theme.palette.success.main} fontSize={14}>
                                428.7%
                            </Typography> */}
                        </div>
                     </Card>
                    <Card className={scss.card} variant={"outlined"}>
                        <div className={scss.cardTitle}>
                            <Typography>% Increase</Typography>
                        </div>
                        <div className={scss.cardValue}>
                            <Typography>4.40%</Typography>
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