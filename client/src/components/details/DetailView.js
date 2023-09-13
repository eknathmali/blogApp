import React, { useState ,useEffect,useContext} from 'react'
import{Box,Typography,styled} from "@mui/material"
import { Link, useParams , useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import {Edit,Delete} from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider.js';

import Comments from './Comments'
const Container = styled(Box)(({theme}) =>({
  margin:"50px 100px",
  [theme.breakpoints.down('md')]:{
    margin:"0"
  }
})
)

const Image = styled("img")({
  width:"100%",
  height:"50vh",
  objectFit:"cover"
})

const Text = styled(Typography)`
word-break:break-word
`
const Heading = styled(Typography)`
font-size:38px;
font-weight:600;
text-align:center;
word-break:break-word;
margin:50px 0  100px 0;
`
const Author = styled(Typography)`
color:#878787;
margin:20px 0;
display:flex;


`


const EditIcon = styled(Edit)`
margin:5px;
padding:5px;
border: 1px solid #878787;
border-radius:10px;
&:hover {
  transform: scale(1.1); /* Increase the size on hover */
  transition: transform 0.1s ease-in-out; /* Add a smooth transition */

}
`

const DeleteIcon = styled(Delete)`
margin:5px;
padding:5px;
border: 1px solid #878787;
border-radius:10px;
&:hover {
  transform: scale(1.1); /* Increase the size on hover */
  transition: transform 0.1s ease-in-out; /* Add a smooth transition */

}
`
// show detail view of post on click
const DetailView = () => {
  const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const {id}= useParams();
  const [post,setPost] = useState({});
  const navigate = useNavigate();
  const {account}  = useContext(DataContext);
  useEffect(()=>{

      const fetchDate  = async ()=>{
          let res = await API.getPostById(id);
          if(res.isSuccess){
            setPost(res.data);
          }
      }
      fetchDate();
  } , [id])   // changed


  const handledeletePost = async()=>{
    let res = await API.deletePost(post._id)
    if(res.isSuccess){
      navigate(`/`)
    }
  }
  return (
    
    <Container>
      <Image src={url} alt='blog'/>
      <Box style = {{float:"right"}}>
        {
          account.name === post.name &&
          <>
       <Link to={`/update/${post._id}`}> <EditIcon color='primary'/> </Link>
        <DeleteIcon color='error' onClick={handledeletePost}/>
          </>
        }
      </Box >
      <Heading>{post.title}</Heading>
      <Author>
      <Typography >Author: <Box component="span" style={{fontWeight:"600"}}>{post.name}</Box></Typography>
      <Typography style={{marginLeft:"auto"}}>{new Date(post.createdDate).toLocaleString()}</Typography>
      </Author>

      <Text>{post.description}</Text>
    
      {/* Comments component */}
      <Comments post = {post}/>
    </Container>
  )
}

export default DetailView