'use client'
import React from "react";
import scss from "./DataCard.module.scss"
import {Grid, IconButton, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// interface DataCardProps {

// }

export type DataCardProps = {
    title: string;
    value: string;
    description: string;
}

// const DataCard: React.FC<DataCardProps> = () => {

//     return <h1>Data Card</h1>
// };

const DataCard = (props: DataCardProps) => {
    const { title, value, description } = props;
    return (
        <Paper className={scss.dataCard}>
            <div className={scss.header}>
                <Typography fontSize={"h6"} color={"lightslategray"}>
                    {title}
                </Typography>
                <Tooltip
                    title={
                        <Typography
                            fontSize={16}
                        >{`${description} is ${value}`}</Typography>
                    }
                >
                    <IconButton>
                        <InfoOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <Typography fontSize={"h4"}>{value}</Typography>
        </Paper>
    )
}

export default DataCard;
