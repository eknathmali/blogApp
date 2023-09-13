import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { addElipsis } from '../../../utils/common-utils'

const Container = styled(Box)`
border:3px solid #d3cede;
border-radius:10px;
border-color:#1e40ba;
margin:10px;
height:500px;
display:flex;
align-items:center;
flex-direction:column;

 &>p{
    padding:0 5px 5px 5px;
}

`

const Image = styled('img')({
    borderBottom:"1px solid #1e40ba",
    borderColor:"#1e40ba",
    borderRadius: '10px 10px 6px 6px', // Applying border radius only to the bottom corners
    borderBottomWidth: '8px',   // Adding a thicker bottom border
    width: '100%',
    objectFit:'cover',
    height:"180px"
});

const Text = styled(Typography)`

color:#878787;
font-size:12px;
`
const Heading = styled(Typography)`
word-break:break-word;
font-size:18px;
font-weight:bold;
`
const Details = styled(Typography)`
font-size:14px;
word-break:break-word;
overflow-y:auto;

`
const Post = ({post}) => {
    // const vv = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
    const vv = "https://flow-e.com/wp-content/uploads/bfi_thumb/12-Marketing-Blogs-You-Should-Be-Reading-34ox9rrp29n11q4d1s5pfu.jpg";
  return (
    <Container>
         <Link to ={`details/${post._id}`} style={{ width: '100%'}}>
        <Image src = {vv} alt="blog"/>
        </Link>
        <Text style={{marginTop:"2px"}}>Category: {post.categories}</Text>
        <Heading>{addElipsis(post.title , 10)}</Heading>
        <Details>{post.description}</Details>
        <Text>by: {post.name}</Text>
        <Text>Created on: {new Date(post.createdDate).toLocaleString()}</Text>
    </Container>
  ) 
}

export default Post