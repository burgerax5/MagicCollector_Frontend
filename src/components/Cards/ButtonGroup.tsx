import { useState, useEffect } from 'react'

interface Props {
    initQty: number
}

const ButtonGroup = ({ initQty }: Props) => {
    const [count, setCount] = useState(initQty);

    useEffect(() => {
        setCount(initQty);
    }, [initQty])

    const decrement = () => setCount(count - 1 > 0 ? count - 1 : 0);
    const increment = () => setCount(count + 1 <= 1000 ? count + 1 : count);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 0) {
            setCount(0);
        } else if (value > 1000) {
            setCount(1000);
        } else {
            setCount(value);
        }
    };

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (count === 0) {
            e.target.value = '';
        }
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setCount(0);
            e.target.value = '0';
        }
    };

    return (
        <div className="cards-owned">
            <button className="decrement-btn" type="button" disabled={count === 0} onClick={decrement}>-</button>
            <input
                className="quantity-owned"
                min="0"
                max="1000"
                type="number"
                value={count}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <button className="increment-btn" type="button" disabled={count === 1000} onClick={increment}>+</button>
        </div>
    )
}

export default ButtonGroup