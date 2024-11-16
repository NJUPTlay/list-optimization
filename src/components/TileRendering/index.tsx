import { useState } from "react"
import useBoolean from "../../hooks/useBoolean"
import avatar from '/img.jpg'
import { Button } from "antd-mobile"

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

const TileRendering: React.FC = () => {
    const [open, { setTrue, setFalse }]=useBoolean(false)
    const [list, setList] = useState<number[]>([]);

    const renderHandle = () => {
        if (open) {
            setFalse()
        } else {
            setTrue()
            setList([]);
            const total: number = 10000;
            const perChunk: number = 100; // 每个小任务处理的元素数量
            let start: number = 0;

            const processChunk = () => {
                const chunk: number[] = []
                for (let i: number = start; i < start + perChunk && i < total; i++) {
                    chunk.push(i)
                }
                setList((list: number[]) => [...list, ...chunk])
                start += perChunk
                if (start < total) {
                    requestAnimationFrame(processChunk)
                } else {
                    console.log('执行完成');
                }
            }
            requestAnimationFrame(processChunk)
        }
    }
    return (
        <>
            <Button style={{ marginBottom: '10px' }} onClick={renderHandle}>分片渲染</Button>
            {open && list?.map(item => <Item key={item} id={item} />)}
        </>
    )
}

export default TileRendering