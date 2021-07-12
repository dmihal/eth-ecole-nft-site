import React, { useState } from 'react'
import Modal from 'react-modal';
import Button from '../Button'
import { _CheckboxInput } from '../styles'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#010101', 
  },
};

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
        style={customStyles}
      >
        <div>
          <label>
            <_CheckboxInput type="checkbox" onChange={changed} />
            I agree to wear a mask and respect the safety rules of the event
          </label>
        </div>
        <br />
        <div>
          <label>
            <_CheckboxInput type="checkbox" onChange={changed} />
            I agree to not bring food and drinks to the amphitheaters 
          </label>
        </div>
        <br />
        <div>
          <label>
            <_CheckboxInput type="checkbox" onChange={changed} />
            I agree to act politely and respect the rules of organizers and university 
          </label>
        </div>
        <br />
        <div>
          <label>
            <_CheckboxInput type="checkbox" onChange={changed} />
            I agree to undergo security checks provided by the university if necessary
          </label>
        </div>
        <br />
        <div>
          <Button onClick={onCancel}>Cancel</Button>
          <Button disabled={checked < 4} onClick={onComplete}>Complete</Button>
        </div>
      </Modal>
    </div>
  )
}

export default CovidModal
