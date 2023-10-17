import { useState } from 'react'
import React from 'react'
import './Modal.css'




const Modal = ({ closeModal, onSubmit, defaultValue }) => {

  const dict = {
    "veda": 0,
    "vyoma": 1,
    "jwala": 2,
    "tatva": 3
  }
  const [formState, setFormState] = useState(defaultValue);

  const handleChange = (e) => {
    let index = dict[e.target.name];
    let newValue = e.target.value;


    let updatedFormState = { ...formState };

    updatedFormState.points[index] = Number(newValue);


    setFormState(updatedFormState);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateBody = {
      "points":formState.points
    }
    console.log(updateBody);

    fetch(process.env.REACT_APP_BACKEND_URL+`/admin/event/${formState._id}`, {
    method: 'PATCH', // Use the PATCH method for partial updates
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateBody), // Convert the data to JSON format
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update the resource');
      }
      return response.json(); // Parse the response if necessary
    })
    .then((updateBody) => {
      // Handle the updated data from the server, if needed
      console.log('Data updated successfully:', updateBody);
    })
    .catch((error) => {
      // Handle errors, e.g., show an error message to the user
      console.error('Error updating data:', error);
    });
    closeModal();
  }
  const onClose = (e) => {

    // closeModal();
    setFormState((prevState) => {
      // Access the previous state (prevState) and reset the 'points' array to [0, 0, 0, 0]
      return { ...prevState, "points": defaultValue.points };
    });
    console.log(formState);
  }

  return (
    <div className='modal-container'>
      <div className='modal'>
        <form className='form-group'>
          <div>
            <label htmlFor='veda'>Veda</label>
            
            <input name='veda' onChange={handleChange} value={formState.points[0]}/>
          </div>
          <div>
            <label htmlFor='vyoma'>Vyoma</label>
           
            <input name='vyoma' onChange={handleChange} value={formState.points[1]} />
          </div>

          <div>
            <label htmlFor='jwala'>Jwala</label>
           
            <input name='jwala' onChange={handleChange} value={formState.points[2]} />
          </div>

          <div>
            <label htmlFor='tatva'>Tatva</label>
           
            <input name='tatva' onChange={handleChange} value={formState.points[3]} />
          </div>
          <div className='button-container'>
            <button className='btnSubmit' onClick={handleSubmit}>Submit</button>
            <button className='btnError' onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal

