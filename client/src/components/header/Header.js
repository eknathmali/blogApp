import React from 'react'
import { AppBar,Toolbar, Typography ,styled} from '@mui/material'
import {Link} from 'react-router-dom'

const ListItem = styled(AppBar)`

  /*background:rgb(31 41 55);*/
  background:#8699e3;
  /*color:#D8B4FE*/
  color:#072a2b

`;

const Container = styled(Toolbar)`
justify-content:center;

&> a{
    padding:20px;
    text-decoration: none ;

    color:#072a2b;
    
}
& > a:hover {
  text-decoration: dashed ;
  textDecorationColor: #9333EA;

}

`
const Header = () => {
  return (
   <ListItem >
    <Container >
        <Link to= '/' >HOME</Link>
        <Link to='/about'>ABOUT</Link>
        <Link to='/contact'>CONTACT</Link>
        <Link to= '/login'>LOGOUT</Link>
    </Container>
   </ListItem>
  )
}

export default Header