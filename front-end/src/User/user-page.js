import * as  React from 'react';
import './user-page.css';

import { useTable } from 'react-table'

import BarChart from './bar-chart';

// import {Bar} from 'react-chartjs-2'
function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });


  return (

    <div className='container'>

      <table {...getTableProps()}>
        <thead >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))
                }

              </tr>
            )
          })}
        </tbody>
      </table>

    </div>

  )
}



function UserPage({ datas }) {
  const data = React.useMemo(() => datas, []);
  const columns = React.useMemo(() => [
    {
      Header: "Event Name",
      accessor: "title",
    }, {
      Header: "Veda",
      accessor: "points[0]",
    }, {
      Header: "Vyoma",
      accessor: "points[1]",
    }, {
      Header: "Jwala",
      accessor: "points[2]",
    },
    {
      Header: "Tatva",
      accessor: "points[3]",
    }
  ], []);
  const CalculateTotal = (datas) => {
    const teamTotals = Array(datas[0].points.length).fill(0);
    for (const obj of datas) {
      obj.points.forEach((points, index) => {
        teamTotals[index] += points;
      });
    }
    return teamTotals;
  }
  const teamNames = ["veda", "Vyoma", "Jwala", "Tatva"];
  const teamPoints = CalculateTotal(datas);
  
  return (
    <div className="">
      <table>
        <thead>
          <tr>
            <th></th>
            {teamNames.map((teamName, index) => (
              <th key={index}>{teamName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Points</td>
            {teamPoints.map((points, index) => (
              <td key={index}>{points}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <BarChart datas = {teamPoints}/>
      <Table
        columns={columns}
        data={data}
      />
    </div>

  )
}

export default UserPage;
