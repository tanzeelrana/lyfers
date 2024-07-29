import React from "react";
import Grid from "@mui/material/Grid";

export class LoginFooter extends React.Component {
    render() {
        return (
            <>
                <Grid item xs={12}>
                    <hr></hr>
                    This is only for CheckDrv ADMINS. If you are looking for user or
                    mechanic information, please follow the links below:
                </Grid>
                <Grid item xs={12}>
                    <h2>Looking for other resources?</h2>
                    Main page: <a href="https://www.checkdrv.com">CheckDrv.com</a>
                </Grid>
            </>
        )
    }
}