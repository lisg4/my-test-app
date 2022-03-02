import react,{ useState, useCallback, memo } from 'react'
import { Button } from 'antd'
import './App.css'

//子组件会有不必要渲染的例子
interface ChildProps {
  name: string;
  count: number;
  onClick: Function;
}
const Child = ({ name, onClick}: ChildProps): JSX.Element => {
  console.log('子组件?')
  return(
      <>
          <div>我是一个子组件，父级传过来的数据：{name}</div>
          <Button type='primary' onClick={onClick.bind(null, '新的子组件name')}>改变name</Button>
      </>
  );
}
const ChildMemo = memo(Child);

const Page = (props: any) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Child组件');

  return (
      <div className='page'>
          <Button type='primary' onClick={(e) => { setCount(count+1) }}>加1</Button>
          <p>count:{count}</p>
          <ChildMemo name={name} count={count} onClick={useCallback((newName: string) => setName(newName), [])}/>
      </div>
  )
}

export default Page