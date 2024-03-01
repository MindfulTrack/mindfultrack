'use client'
import React from "react";
import scss from "./DataRibbon.module.scss"
import {Grid} from "@mui/material";
import DataCard from "../Dashboard/DataCard/DataCard";
import TransactionsPerDay from "../Dashboard/TransactionsPerDay/TransactionsPerDay";


interface DataRibbonProps {

}

const DataRibbon: React.FC<DataRibbonProps> = () => {
    return (
        <Grid container gap={2} className={scss.dataRibbon}>
            <Grid>
                <DataCard  
                    title={"Current Waitlist Size"}
                    value={"115"}
                    description={
                        "The totals of all blah blah blah"
                    }
                />
            </Grid>

            <Grid>
                <DataCard  
                    title={"Exits this Month"}
                    value={"17"}
                    description={
                        "The totals of all blah blah blah"
                    }
                />
            </Grid>

            <Grid>
                <DataCard  
                    title={"Receiving Services this Month"}
                    value={"26"}
                    description={
                        "The totals of all blah blah blah"
                    }
                />
            </Grid>

            <Grid>
                <DataCard  
                    title={"No Response Students"}
                    value={"15"}
                    description={
                        "The totals of all blah blah blah"
                    }
                />
            </Grid>
        </Grid>
    )
}

export default DataRibbon;