import React, { useState, useEffect } from 'react';

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
      <div style={{ display: 'flex' }}>
        <input value={newName} onChange={(e: any) => setNewName(e.target.value)} />
        <button disabled={saving} onClick={() => setEdit(false)}>Cancel</button>
        <button disabled={saving} onClick={change}>Save</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      {name}
      <button onClick={() => setEdit(true)}>Edit</button>
    </div>
  )
}

export default NameBox
