import {useState} from 'react'
import Content from './components/Content'
import AddDiary from './components/AddDiary'
import type { Entry } from './types'

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([])

  const addNewEntry = (newEntry: Entry) => {
    setEntries((prevEntries) => [...prevEntries, newEntry])
  }

  return (
    <div>
      <AddDiary onAddEntry={addNewEntry} />
      <Content entries={entries} setEntries={setEntries} />
    </div>
  )
}

export default App
