import { memo, useState } from 'react';
import FixedVirtualScroll, { ItemBoxProps } from './index';
import avatar from '/img.jpg'
import { Button } from 'antd-mobile';
import useBoolean from '../../hooks/useBoolean';

const Item: React.FC<ItemBoxProps> = memo(({ id,style,key }) => {
    return (
        <div key={key} style={{ display: 'flex', alignItems: 'center',...style }}>
            <img width={50} height={50} src={avatar} />
            <span>{`列表项${id}`}</span>
        </div>
    )
})
const TestVirtual = () => {
    const [items] = useState<number[]>(new Array(10000).fill(1));
    // const [open, setOpen] = useState<boolean>(false);
    const [open, {toggle}]=useBoolean(false)
    return (
        <>
            <Button style={{ marginBottom: '10px' }} onClick={()=>{toggle()}}>虚拟列表</Button>
            {open&&<FixedVirtualScroll list={items} containerHeight={500} ItemBox={Item} />}
        </>
    );
};

export default TestVirtual;