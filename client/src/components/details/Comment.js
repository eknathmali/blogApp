import { Box,Typography,styled } from '@mui/material'
import { useContext } from 'react'
import React from 'react'
import {Delete} from '@mui/icons-material'
import { DataContext } from '../../context/DataProvider.js'
import { API } from '../../service/api.js'

const Component = styled(Box)`
margin-top:30px;
background:#f5f5f5;
padding:10px;

`

const Container = styled(Box)`
display:flex;
margin-bottom : 5px;
`
const Name = styled(Typography)`
font-weight : 600;
font-size: 18px;
margin-right:20px;
`

const StyledDate = styled(Typography)`
color: #878787;
font-size: 14px;
`
const DeleteIcon = styled(Delete)`
margin-left : auto;
`

const Comment = ({comment,setToggle}) => {
  const {account} = useContext(DataContext);

  const handledeleteComment = async()=>{
        let res = await API.deleteComment(comment._id)
        if(res.isSuccess){
            setToggle(prevState => !prevState);
        }
  }
  return (
    <>  
        
    <Component>
            <Container>
            <Name>{comment.name}</Name>
            <StyledDate>{new Date(comment.date).toLocaleString()}</StyledDate>
            {comment.name === account.name && <DeleteIcon onClick={handledeleteComment}/>}
            </Container>
            <Box>
               
                <Typography>{comment.comments}</Typography>
            </Box>
        </Component>
  </>
  )
 
}

export default Comment