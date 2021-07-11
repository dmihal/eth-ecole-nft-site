import React, { useState } from 'react'
import Modal from 'react-modal';

const CovidModal = ({ isOpen, onCancel, onComplete }) => {
  const [checked, setChecked] = useState(0)

  const changed = (e: any) => {
    setChecked((numChecked: number) => e.target.checked ? numChecked + 1 : numChecked - 1)
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
      >
        <div>
          <label>
            <input type="checkbox" onChange={changed} />
            I agree to wear a mask and respect the safety rules of the event
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={changed} />
            I agree to not bring food and drinks to the amphitheaters 
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={changed} />
            I agree to act politely and respect the rules of organizers and university 
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={changed} />
            I agree to undergo security checks provided by the university if necessary
          </label>
        </div>
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button disabled={checked < 4} onClick={onComplete}>Complete</button>
        </div>
      </Modal>
    </div>
  )
}

export default CovidModal
