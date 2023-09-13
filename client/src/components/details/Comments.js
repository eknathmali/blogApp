import  { useContext, useEffect, useState } from 'react'
import {Box, Typography,Button, TextareaAutosize,styled} from '@mui/material'
import { DataContext } from '../../context/DataProvider.js'
import { API } from '../../service/api';
import Comment from './Comment.js';

const Container = styled(Box)`
    margin-top: 100px;
    display:flex;
`

const Image = styled('img')({
    width:50,
    height:50,
    borderRadius:'50%'
})

const TextArea = styled(TextareaAutosize)`
height :100px;
width:100%;
margin:0 20px;
`
const intialValues = {
    name:'',
    postId:'',
    comments:'',
    data: new Date()
}
const Heading = styled(Typography)`
font-size:20px;
font-weight:400;
margin-top:20px;

`

const Comments = (props) => {
    const url = "https://static.thenounproject.com/png/12017-200.png"

    const [comment , setComment] = useState(intialValues);
    const {account} = useContext(DataContext);
    const [totalComment , settotalComment] = useState([]);
    const [toggle , setToggle]  = useState(false);

useEffect(()=>{
    const getData = async() =>{
        let res = await API.getComment(props.post._id);
        if(res.isSuccess){
                settotalComment(res.data);
        }
    }
    getData();
},[props.post,toggle])

const handleOnchange = (e)=>{
    setComment({...comment ,
   name:account.name,
   postId :props.post._id,
   comments:e.target.value})
}

const addComment = async()=>{
    let res = await API.addComment(comment);
    if(res.isSuccess){
        setComment(intialValues);
    }
    setToggle(prevState => !prevState);
}
  return (
    <Box>

        <Container>
            <Image src= {url} alt="comments"/>
            <TextArea minRows={5}
            placeholder='write a comment..'
            value={comment.comments}
            onChange={handleOnchange}
            />
            <Button  disabled = {!comment.comments} 
            variant='contained' color='primary' style ={{height:40}} onClick={addComment}>Post</Button>
        </Container>
        <Box>
            <Heading>Comments</Heading>
           {
            totalComment && totalComment.length > 0 && totalComment.map(
                comment =>{
                   return  <Comment comment = {comment} setToggle={setToggle}/>
                }
            )
           }
        </Box>

    </Box>
  )
}

export default Comments;