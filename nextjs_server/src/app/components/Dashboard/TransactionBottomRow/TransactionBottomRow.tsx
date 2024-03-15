'use client'
import Grid from "@mui/material/Grid";
import React from "react";
import DataChart from "../../DataChart/DataChart";
import Paper from "@mui/material/Paper";
import { doughnutChartData } from "../../mockData";
import scss from "./TransactionsBottomRow.module.scss";
import customFetch from '../../../api/fetchInterceptor';
import {useState, useEffect} from 'react';
import { collectGenerateParams } from "next/dist/build/utils";

const TransactionBottomRow = () => {
  const [exitReasons, setExitReasons] = useState([]);
  const [exitCounts, setExitCounts] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [collegeCounts, setCollegeCounts] = useState([]);
  const [genders, setGenders] = useState([]);
  const [genderCounts, setGenderCounts] = useState([]);
  const [years, setYears] = useState([]);
  const [yearCounts, setYearCounts] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
        try {
            const pieChartData = await customFetch('base/pieChartData');
            setExitReasons(pieChartData.reasons);
            setExitCounts(pieChartData.leaveCounts);
            setColleges(pieChartData.colleges);
            setCollegeCounts(pieChartData.collegeCounts);
            setGenders(pieChartData.genders);
            setGenderCounts(pieChartData.genderCounts);
            setYears(pieChartData.years);
            setYearCounts(pieChartData.yearCounts);
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
        backgroundColor: ["#002E5D", "#005B89", "#00889C", "#00B494", "#81DB7D", "#F9F871"],
        hoverOffset: 4,
      },
    ],
  };

  const collegePieChartData = {
    labels: colleges,
    datasets: [
      {
        label: "Count",
        data: collegeCounts,
        backgroundColor: ["#002E5D", "#005B89", "#00889C", "#00B494", "#81DB7D", "#F9F871"],
        hoverOffset: 4,
      },
    ],
  };

  const genderPieChartData = {
    labels: genders,
    datasets: [
      {
        label: "Count",
        data: genderCounts,
        backgroundColor: ["#002E5D", "#005B89", "#00889C", "#00B494", "#81DB7D", "#F9F871"],
        hoverOffset: 4,
      },
    ],
  };

  const yearPieChartData = {
    labels: years,
    datasets: [
      {
        label: "Count",
        data: yearCounts,
        backgroundColor: ["#002E5D", "#005B89", "#00889C", "#00B494", "#81DB7D", "#F9F871"],
        hoverOffset: 4,
      },
    ],
  };

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
          <p>College</p>
          <DataChart type={"doughnut"} data={collegePieChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Gender</p>
          <DataChart type={"doughnut"} data={genderPieChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>School Year</p>
          <DataChart type={"doughnut"} data={yearPieChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TransactionBottomRow;