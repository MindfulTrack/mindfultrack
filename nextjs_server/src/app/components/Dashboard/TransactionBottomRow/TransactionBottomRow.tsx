'use client'
import Grid from "@mui/material/Grid";
import React from "react";
import DataChart from "../../DataChart/DataChart";
import Paper from "@mui/material/Paper";
import { doughnutChartData } from "../../mockData";
import scss from "./TransactionsBottomRow.module.scss";
import customFetch from '../../../api/fetchInterceptor';
import {useState, useEffect} from 'react';

const TransactionBottomRow = () => {
  const [exitReasons, setExitReasons] = useState([]);
  const [exitCounts, setExitCounts] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
        try {
            const exitPieChartData = await customFetch('base/pieChartData');
            setExitReasons(exitPieChartData.reasons);
            setExitCounts(exitPieChartData.counts);
        } catch (error : any) {
            console.log(error);
        }
    };

    fetchQueue();
  }, []);

  const exitPieChartData = {
    labels: exitReasons,
    datasets: [
      {
        label: "Count",
        data: exitCounts,
        backgroundColor: ["rgb(255,137,168)", "rgb(178,3,106)", "rgb(165,7,42)"],
        hoverOffset: 4,
      },
    ],
  };

  console.log(exitReasons);
  console.log(exitCounts);
  return (
    <Grid container className={scss.bottomRow}>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Exit Reasons</p>
          <DataChart type={"doughnut"} data={exitPieChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Student Demographics</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Current vs Removed Students</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Availability Times</p>
          <DataChart type={"doughnut"} data={doughnutChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TransactionBottomRow;