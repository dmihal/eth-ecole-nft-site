import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const NameBoxContainer = styled.div`
  display: flex;
`

const StaticName = styled.div`
  flex: 1;
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
        <NameInput value={newName} onChange={(e: any) => setNewName(e.target.value)} />
        <button disabled={saving} onClick={() => setEdit(false)}>Cancel</button>
        <button disabled={saving} onClick={change}>Save</button>
      </NameBoxContainer>
    );
  }

  return (
    <NameBoxContainer>
      <StaticName>{name}</StaticName>
      <button onClick={() => setEdit(true)}>Edit</button>
    </NameBoxContainer>
  )
}

export default NameBox
