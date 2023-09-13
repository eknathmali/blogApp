import React, { useEffect, useState } from 'react'
import { API } from '../../../service/api';
import { Box,Grid} from '@mui/material';
import Post from './Post';
import { useSearchParams,Link } from 'react-router-dom';

const Posts = () => {
    const [posts,setPosts] = useState([]);
    const[serachParams] = useSearchParams();

    const category = serachParams.get('category')
    useEffect(()=>{
        const fetchData = async() =>{
            const res =   await API.getAllPosts({category:category || 'All'});
            if(res.isSuccess){
                setPosts(res.data);
            }
        }
        fetchData();
    } , [category])
  return (
    <>
    {
        posts && posts.length>0?posts.map(post=>{
           return <Grid item ig={3} sm={4} xs={12}>
            {/* <Link to ={`/details/:${post._id}`} style={{textDecoration:'none' , color:'inherit'}}> */}
                 <Post post = {post}/>
            {/* </Link> */}
            </Grid>
        }): <Box style={{color:"#878787",margin:"30px 80px" , fontsize:18}}>No data to display</Box>
    }
    
    </>
  )
}

export default Posts