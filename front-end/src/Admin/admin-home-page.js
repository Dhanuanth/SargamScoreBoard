import React from 'react'
import './admin-login-page.css'
import Modal from './Modal/Modal';
import { useState } from 'react'
import { BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'; 


const AdminHomePage = ({ datas ,loggedIn}) => {

  const navigate = useNavigate(); // Initialize 

  console.log(datas);
  const [rows, setRows] = useState(datas);

  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);


  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  }

  const defaultValueTrigger = () => {
    if (rowToEdit !== null) {

      // return{
      //   "points":rows[rowToEdit].points
      // }
      return rows[rowToEdit];
    }
    return null;
  }

  const handleSubmitRow = (editedRow) => {

    console.log(editedRow);
    setRows(
      rows.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;
        else {
          let newRow = { ...currRow, "points": editedRow.points };

          return newRow

        }
      }));

  }
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const authenticated = queryParams.get('authenticated');

  if (loggedIn) {
    return (
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th className="expand">Veda</th>
              <th>Vyoma</th>
              <th>Jwala</th>
              <th>Tatva</th>
            </tr>
          </thead>

          <tbody>
            {rows && rows.map((row, idx) => (
              <tr key={idx}>
                <td>{row.title}</td>
                <td>{row.points[0]}</td>
                <td>{row.points[1]}</td>
                <td>{row.points[2]}</td>
                <td>{row.points[3]}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => handleEditRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {modalOpen && <Modal
          closeModal={() => { setModalOpen(false); setRowToEdit(null) }}
          onSubmit={handleSubmitRow}
          defaultValue={defaultValueTrigger()} />}
      </div>
    )
  }
  else {
    navigate("/admin")
  }


}

export default AdminHomePage;
