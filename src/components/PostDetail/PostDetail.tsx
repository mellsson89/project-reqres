import React from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer} from "@mui/material";
import {IPosts} from "../../models";

interface IPost {
post:IPosts
}

export default function PostDetail ({post}:IPost) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Color</TableCell>
                        <TableCell align="center">Pantone value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={post.id}>
                        <TableCell component="th" scope="row" align="center">
                            {post.id}
                        </TableCell>
                        <TableCell align="center">{post.name}</TableCell>
                        <TableCell align="center">{post.year}</TableCell>
                        <TableCell align="center">{post.color}</TableCell>
                        <TableCell align="center">{post.pantone_value}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}
