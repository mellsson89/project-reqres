import * as React from "react";
import {TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import {IPosts} from "../../models";

interface IPost {
    post:IPosts
    onClickModal:(value:IPosts) => void
}

export default function PostList({post, onClickModal}:IPost) {

    return (
    <TableContainer component={Paper} sx={{marginY:'20px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{backgroundColor:'#A0522D'}}>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={post.id} onClick={() => onClickModal(post)} sx={{backgroundColor:post.color, cursor:'pointer'}} >
                        <TableCell  align="center">
                            {post.id}x
                        </TableCell>
                        <TableCell align="center">{post.name}</TableCell>
                        <TableCell align="center">{post.year}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}