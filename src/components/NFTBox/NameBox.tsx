import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import { _Input } from '../styles'

const NameBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StaticName = styled.div`
  flex: 1;
  margin-bottom: 0.5em;
`

const NameInput = styled.input`
  flex: 1;
`

const NameBox = ({ name, onChange }) => {
  const [edit, setEdit] = useState(false)
  const [newName, setNewName] = useState(name)
  const [saving, setSaving] = useState(false)

  useEffect(() => setNewName(name), [name])

  const change = async () => {
    setSaving(true)
    try {
      await onChange(newName)
      setEdit(false)
    } catch (e) {
      console.warn(e)
    }
    setSaving(false)
  }

  if (edit) {
    return (
      <NameBoxContainer>
        <_Input value={newName} onChange={(e: any) => setNewName(e.target.value)} />
        <Button disabled={saving} onClick={() => setEdit(false)}>Cancel</Button>
        <br />
        <Button disabled={saving} onClick={change}>Save</Button>
      </NameBoxContainer>
    );
  }

  return (
    <NameBoxContainer>
      <StaticName>{name}</StaticName>
      <Button onClick={() => setEdit(true)} thin={'true'}>Edit name</Button>
    </NameBoxContainer>
  )
}

export default NameBox
