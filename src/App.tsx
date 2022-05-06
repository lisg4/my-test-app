import react,{ useState, useCallback, memo, useRef, useMemo, useEffect } from 'react'
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd'
import './App.css'
import logo from './logo.svg'

//子组件会有不必要渲染的例子
interface ChildProps {
  name: string;
  count?: number;
  onClick: Function;
}
const Child = ({ name, onClick}: ChildProps) => {
  return(
      <>
          <div>传递过来的数据：{name}</div>
          <Button type='primary' onClick={onClick.bind(null, '新的子组件name')}>改变name</Button>
      </>
  );
}
const ChildMemo = memo(Child);

const Page = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Child组件');
  const countRef = useRef<number>(0)
  const memoParams = useMemo(() => name,[name])

  return (
      <div className='page'>
          <Button type='primary' onClick={() => {setCount(count+1);countRef.current = countRef.current + 1} }>加1</Button>
          <Button style={{marginLeft: '20px'}} type='primary' onClick={() => setTimeout(() =>{alert(countRef.current)},2000)}>获取count</Button>
          <p>count:{count}</p>
          <ChildMemo name={memoParams} onClick={useCallback((newName: string) => setName(newName), [])}/>
      </div>
  )
}
export default Page