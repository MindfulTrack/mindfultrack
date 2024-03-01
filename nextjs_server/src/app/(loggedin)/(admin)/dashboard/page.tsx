import React from 'react';
import {Box, Grid, Paper} from "@mui/material";
import scss from './Dashboard.module.scss';
import DataRibbon from "../../../components/DataRibbon/DataRibbon";
import TransactionsPerDay from '../../../components/Dashboard/TransactionsPerDay/TransactionsPerDay';
import TransactionBottomRow from '../../../components/Dashboard/TransactionBottomRow/TransactionBottomRow';

const Dashboard = () => {
    return (
        <Box>
            <Grid container gap={4} marginTop={2}>
                < DataRibbon />
                < TransactionsPerDay />                
            </Grid>
            < TransactionBottomRow />
        </Box>
    )
}
export default Dashboard;