'use client'
import React from "react";
import scss from "./DataRibbon.module.scss"
import {Grid, CircularProgress, Typography} from "@mui/material";
import DataCard from "../Dashboard/DataCard/DataCard";
import TransactionsPerDay from "../Dashboard/TransactionsPerDay/TransactionsPerDay";
import customFetch from "../../api/fetchInterceptor";
import { useSession } from "next-auth/react";
import {useState, useEffect} from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';



interface DataRibbonProps {

}

const DataRibbon: React.FC<DataRibbonProps> = () => {
    const [currentQueue, setCurrentQueue] = useState(0);
    const [monthExits, setMonthExits] = useState(0);
    const [monthServices, setMonthServices] = useState(0);
    const [avgWaitTime, setAvgWaitTime] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQueue = async () => {
            try {
                const dashboardResponse = await customFetch('base/dashboardData');
                setCurrentQueue(dashboardResponse.currentQueue);
                setMonthExits(dashboardResponse.monthExits);
                setMonthServices(dashboardResponse.monthServices);
                setAvgWaitTime(dashboardResponse.averageWaitTime);
                setLoading(false);
            } catch (error : any) {
                setError(error.message);
            }
        };

        fetchQueue();
    }, []);
    if (error) {
        return <Alert variant="outlined" severity="error">{error}</Alert>;
    }
    else if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress /> <div>Loading...</div>
            </Box>
    }
    else {
        return (
            
            <Grid container gap={2} className={scss.dataRibbon}>
                <Grid>
                    <DataCard  
                        title={"Current Waitlist Size"}
                        value={currentQueue.toString()}
                        description={
                            "The number of students currently waiting to receive services"
                        }
                    />
                </Grid>
    
                <Grid>
                    <DataCard  
                        title={"Exits this Month"}
                        value={monthExits.toString()}
                        description={
                            "Total number of students who left the queue this month without receiving services from the university"
                        }
                    />
                </Grid>
    
                <Grid>
                    <DataCard  
                        title={"Receiving Services this Month"}
                        value={monthServices.toString()}
                        description={
                            "Total number of students who exited the waitlist and met with a counselor from the university this month"
                        }
                    />
                </Grid>
    
                <Grid>
                    <DataCard  
                        title={"Average Wait Time (days)"}
                        value={avgWaitTime.toString()}
                        description={
                            "The average number of days a student spends on the waitlist"
                        }
                    />
                </Grid>
            </Grid>
        )
    }
    
}

export default DataRibbon;