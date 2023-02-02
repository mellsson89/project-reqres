import React from "react";
import {Button, Pagination, PaginationItem, TextField, Grid, Table, TableBody, TableCell,
    TableContainer,TableHead, TableRow, Paper } from "@mui/material";
import Modal from "../../components/Modal";
import PostDetail from "../../components/PostDetail";
import {useEffect, useState} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import PostList from "../../components/PostList";
import {fetchPosts, fetchFilterById} from '../../redux/posts/posts-operations';
import {clearPosts, clearFilterPosts, resetErrorFilter} from "../../redux/posts/posts-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {IPosts} from "../../models";



export default function HomePage () {

    const location = useLocation();
    const history = useHistory();

    const perPage:number = 5;

    const [post,setPost] = useState<IPosts | ''>('');
    const [page, setPage] = useState<number>(location.search?.split('=')[0] === '?page' ? parseInt(location.search?.split('=')[1]) : 1 );
    const [showModal,setShowModal]=useState(false);
    const [queryId,setQueryId] = useState<number | ''>(location.search?.split('=')[0] === '?id' ? parseInt(location.search?.split('=')[1]) : '');

    const dispatch = useAppDispatch();

    const posts = useAppSelector(state => state.posts.items)
    const totalPages = useAppSelector(state => state.posts.totalPages);
    const filterPosts = useAppSelector(state => state.posts.filterPostsById);
    const error = useAppSelector(state => state.posts.error);



    useEffect(() => {

        if(location.search?.split('=')[0] !== '?id') {
            dispatch(fetchPosts({perPage, page}));
        }


    },[perPage, page, location.search, dispatch])


    useEffect( () => {

       if(location.search?.split('=')[0] === '?id') {
           if (typeof queryId === "number") {
               dispatch(fetchFilterById(queryId));
           }
       }

    },[dispatch, location.search, queryId])

    const filterById = async () => {

        if(queryId === '') {
            return;
        }

        dispatch(fetchFilterById(queryId));
        dispatch(clearPosts(null));

        history.push(`/?id=${queryId}`);
    }

    const getAllPosts = async () => {

        dispatch(fetchPosts({perPage, page}));
        dispatch(clearFilterPosts(null));

        setQueryId('');

        history.push('/');
    }

    const resetError = () => {
        dispatch(resetErrorFilter(null))
        setQueryId('');
        history.push('/');
    }

    const toggleModal = () => {
        setShowModal(!showModal);

    }
    const openModalPost = (post:IPosts) => {
        toggleModal()
        setPost(post);
    }
    console.log(error)

    return(
<>

    <Grid container spacing={0.5} sx={{justifyContent:'center', alignItems:'center'}}>
        <Grid item xs={1.3}>
            <TextField
                size="small"
                label='Search by id'
                value={queryId}
                onChange={(event: React.ChangeEvent<number | any>) => {
                    setQueryId(event.target.value.replace(/\D/g, ''))}
                }
            />
        </Grid>
        <Grid item xs={0.9}>
            <Button variant="contained" onClick={filterById} disabled={!queryId}>Filter</Button>
        </Grid>

        <Grid item xs={2}>
            <Button variant="contained" onClick={getAllPosts} disabled={!filterPosts}>Get all posts</Button>
        </Grid>

    </Grid>

    {error === 404 && <h1>Post with id was not found! Please, enter another id or <Link to="/" onClick={resetError}>back to</Link> all posts.</h1>}

    { posts  && <TableContainer component={Paper} sx={{marginY:"20px"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow sx={{backgroundColor:'#A0522D'}}>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Year</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {posts.map((post) => (
                    <TableRow
                        key={post.id}
                        sx={{cursor:'pointer', backgroundColor:post.color}}
                        onClick={() => openModalPost(post)}
                    >
                        <TableCell align="center">
                            {post.id}
                        </TableCell>
                        <TableCell align="center">{post.name}</TableCell>
                        <TableCell align="center">{post.year}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Pagination
            sx={{marginY:'10px', display:'flex', justifyContent:'flex-end'}}
            count={totalPages}
            page={page}
            onChange={(_,num) => setPage(num)}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/?page=${item.page}`}
                    {...item}
                />
            )}
        />
    </TableContainer>}


    {filterPosts && <PostList post={filterPosts} onClickModal={(value) => openModalPost(value)}/>}


    {showModal && post && <Modal onClose={toggleModal}><PostDetail post={post}/> </Modal>}
</>

    )
}