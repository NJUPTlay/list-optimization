import React, { useMemo, useCallback, useState, useRef, memo, SyntheticEvent} from "react";
export interface ItemBoxProps{
    id: number;
    style?: React.CSSProperties;
    key: number;
    children?: React.ReactNode;
}


const FixedVirtualScroll = memo((
    { list = [], containerHeight = 800, ItemBox = React.Fragment as React.ComponentType<ItemBoxProps>, itemHeight = 55 }
        : { list?: number[], containerHeight?: number, ItemBox: React.ComponentType<ItemBoxProps>, itemHeight?: number, props?: object }
) => {
    const ContainerRef = useRef(null);
    const [startIndex, setStartIndex] = useState(0);
    // 用于撑开Container的盒子，计算其高度
    const wraperHeight = useMemo(
        () => {
            return list.length * itemHeight;
        },
        [list, itemHeight],
    );

    // 可视区域最多显示的条数
    const limit = useMemo(
        () => {
            return Math.ceil(containerHeight / itemHeight);
        },
        [startIndex],
    );
    // 当前可视区域显示的列表的结束索引
    const endIndex = useMemo(
        () => {
            return Math.min(startIndex + limit, list.length - 1);
        },
        [startIndex, limit,list.length],
    );

    // 核心方法 监控滚动事件,根据滚动距离设置初始化的开始索引值
    const handleSrcoll = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e:any) => {
            // 过滤页面其他滚动
            if (e.target !== ContainerRef.current) return;
            const scrollTop = e.target.scrollTop;
            // 根据滚动距离计算开始项索引
            const currentIndex = Math.floor(scrollTop / itemHeight);
            if (currentIndex !== startIndex) {
                setStartIndex(currentIndex);
            }
        },
        [ContainerRef, itemHeight, startIndex],
    );

    // 利用请求动画帧做了一个节流优化
    const then = useRef(0);
    const boxScroll = (e:SyntheticEvent<HTMLDivElement>) => {
        const now = Date.now();
        /**
         * 这里的等待时间不宜设置过长，不然会出现滑动到空白占位区域的情况
         * 因为间隔时间过长的话，太久没有触发滚动更新事件，下滑就会到padding-bottom的空白区域
         * 电脑屏幕的刷新频率一般是60HZ，渲染的间隔时间为16.6ms，我们的时间间隔最好小于两次渲染间隔16.6*2=33.2ms，一般情况下30ms左右，
         */
        if (now - then.current > 30) {
            then.current = now;
            // 重复调用scrollHandle函数，让浏览器在下一次重绘之前执行函数，可以确保不会出现丢帧现象
            window.requestAnimationFrame(() => handleSrcoll(e));
        }
    };

    const renderList = useCallback(() => {
        const rows = [];
        for (let i = startIndex - 2 ? startIndex - 2 : startIndex; i <= endIndex + 3; i++) {
            rows.push(
                <ItemBox
                    id={i}
                    key={i}
                    style={{
                        height: itemHeight + 'px',
                        position: 'absolute',
                        top: i * itemHeight + 'px',
                    }}
                />
            )
        }
        return rows;
    }, [startIndex, endIndex, ItemBox])


    return (
        <>
            <div style={{ overflowY: 'auto', overflowX: 'hidden', height: `${containerHeight + 'px'}` }} ref={ContainerRef} onScroll={boxScroll}>
                <div style={{ position: 'relative', height: wraperHeight + 'px' }}>{renderList()}</div>
            </div>
        </>
    )
})

export default FixedVirtualScroll;