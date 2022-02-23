import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/solid"
import {PF} from '../url'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    width: 200,
    fontSize: 12
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {

  const [credential, setCredential] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [pages, setPages] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [startValue, setStartValue] = React.useState(5)

  // Get All applicants 
  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await axios.get(PF+`/api/user/get?page=${page}&limit=${limit}`)
        // console.log(users.data)
        setCredential(users.data.data)
        setPages(users.data.pages)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [page, limit])

  React.useEffect(() => {
    setStartValue(Math.floor((page - 1) / 5) * 5)
  },[page])


  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex my-5 items-center">
            <button className="disabled:bg-gray-300 mr-[2px] lg:mr-2" onClick={() => setPage(page - 1)} disabled={page == 1}><ArrowLeftIcon className="h-5 lg:h-9 text-gray-600 border border-gray-300 p-1" /></button>

            {/* middle paginations */}

            {
              ((page > 5) && (pages - page >= 5)) && (
                <>
                  <button disabled={page == 1} onClick={() => setPage(1)} className=" text-gray-600 ml[2px] lg:ml-2 border text-sm lg:text-xl py-[2px] border-gray-300 px-3 disabled:bg-gray-300">1</button>
                  <button className=" text-gray-600 ml[2px] lg:ml-2 border text-sm lg:text-xl py-[2px] border-gray-300 px-3 disabled:bg-gray-300">...</button>
                </>
              )
            }

            {
              page <= 5 ?
                [...Array(5)].map((_, i) => (
                  <button hidden={(i + 1) > pages} key={i + 1} disabled={page == i + 1} onClick={() => setPage(i + 1)} className=" text-gray-600 ml-[2px] lg:ml-2 border text-sm lg:text-xl py-[2px] border-gray-300 px-3 disabled:bg-gray-300">{i + 1}</button>
                )) :
                [...Array(5)].map((_, i) => (
                  <button key={startValue + i + 1} hidden={(startValue + i + 1) > pages} disabled={page == startValue + i + 1} onClick={() => setPage(startValue + i + 1)} className=" text-gray-600 border border-gray-300 ml-[2px] lg:ml-2 text-sm lg:text-xl py-[2px] px-3 disabled:bg-gray-300">{startValue + i + 1}</button>
                ))

            }
            <button hidden={page >= pages - 2} className="text-sm lg:text-xl mx-[2px] lg:mx-2 py-[2px] text-gray-600 border border-gray-300 px-3 disabled:bg-gray-300">...</button>
            <button hidden={page >= pages - 2} onClick={() => setPage(pages)} className="text-sm lg:text-xl text-gray-600 border border-gray-300 py-[2px] px-3 disabled:bg-gray-300">{pages}</button>
            <button className="disabled:bg-gray-300 ml-[2px] lg:ml-2" onClick={() => setPage(page + 1)} disabled={page == pages} ><ArrowRightIcon className="h-5 lg:h-9 text-gray-600 border border-gray-300 p-1" /></button>
          </div>
          <div className="my-5">
            <select onChange={e => setLimit(e.target.value)} name="grades" id="" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600">
              <option value="10">Select Pages</option>
              <option value="10">10</option>
              <option value='20' >20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="40">50</option>
            </select>
          </div>
        </div>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">Middle Name</StyledTableCell>
                <StyledTableCell align="center">Date of Birth</StyledTableCell>
                <StyledTableCell align="center">State of Origin</StyledTableCell>
                <StyledTableCell align="center">Place of birth</StyledTableCell>
                <StyledTableCell align="center">Institutuion</StyledTableCell>
                <StyledTableCell align="center">Grades</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {credential?.map(row => (
                <StyledTableRow key={row.firstName}>
                  <StyledTableCell component="th" scope="row">
                    {row.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                  <StyledTableCell align="center">{row.middleName}</StyledTableCell>
                  <StyledTableCell align="center">{row.dob}</StyledTableCell>
                  <StyledTableCell align="center">{row.stateOfOrigin}</StyledTableCell>
                  <StyledTableCell align="center">{row.placeOfBirth}</StyledTableCell>
                  <StyledTableCell align="center">{row.institution}</StyledTableCell>
                  <StyledTableCell align="center">{row.grade}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
