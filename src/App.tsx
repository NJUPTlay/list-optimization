import { useState } from 'react'
import { Button } from 'antd-mobile'
import avatar from '/img.jpg'
import useBoolean from './hooks/useBoolean'


const Item: React.FC<{
  id: number,
}> = ({ id }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
      <img width={50} height={50} src={avatar} />
      <span>{`列表项${id}`}</span>
    </div>
  )
}

function App() {
  const [open, { setTrue, setFalse }]=useBoolean(false)
  const [list, setList] = useState<number[]>([])
  const handleClick = () => {
    if (open) {
      setFalse()
    } else {
      setTrue()
      const arr: number[] = []
      for (let i = 0; i < 10000; i++) {
        arr.push(i)
      }
      setList(arr)
    }
  }


  return (
    <>
      <Button style={{ marginBottom: '10px' }} onClick={handleClick}>展示</Button>
      {open && list?.map(item => <Item key={item} id={item} />)}
    </>
  )
}

export default App
