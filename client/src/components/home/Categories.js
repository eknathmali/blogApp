import React from 'react'
import { Link,useSearchParams } from 'react-router-dom';

import { Button, Table, TableCell, TableHead, TableRow,TableBody,styled } from '@mui/material'
import { categories } from '../../constants/data'

const StyledTable = styled(Table)`
border: 1px solid rgba(224,224,224,1);`;

const StyledButton = styled(Button)`
margin:10px;
width:75%;
color:#FFF;`;

const StyledLink = styled(Link)`
text-decoration:none;
color:inherit;
`
const Categories = () => {
    const [searchParam] = useSearchParams();
    const category = searchParam.get('category');
  return (
    <>
    <StyledLink to={`/create?category=${category || ''}`} style={{textDecoration:'none'}}>
    <StyledButton variant='contained' style={{ background: "#8699e3 !important" }}>Create A Blog</StyledButton>
    </StyledLink>
    <StyledTable>
        <TableHead>
            <TableRow>
                <StyledLink to='/'>
                <TableCell>All Categories</TableCell>
                </StyledLink>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                categories.map(
                    category=>(
                        <TableRow key={category.id}>
                        <TableCell>
                        <StyledLink to={`/?category=${category.type}`}>
                            {category.type}
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                    )
                )
            }
        </TableBody>
    </StyledTable>
    </>
  )
}

export default Categories