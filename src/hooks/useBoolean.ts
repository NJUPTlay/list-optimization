import { useState } from 'react';

interface Actions {
    setTrue: () => void;
    setFalse: () => void;
    set: (value: boolean) => void;
    toggle: () => void;
}

// 自定义 hook，用于管理布尔状态
const useBoolean = (initialValue: boolean = false): [boolean, Actions] => {
    const [bool, setBool] = useState<boolean>(initialValue);

    // 设置布尔值为 true
    const setTrue = () => {
        setBool(true);
    };

    // 设置布尔值为 false
    const setFalse = () => {
        setBool(false);
    };

    // 切换布尔值
    const toggle = () => {
        setBool(!bool);
    }

    //自己定义value值
    const set = (value: boolean) => {
        setBool(value);
    };

    // 返回当前布尔值和两个操作函数
    return [bool, { setTrue, setFalse, set, toggle }];
};

export default useBoolean;