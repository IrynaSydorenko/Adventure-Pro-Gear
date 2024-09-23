'use client'
import React, { useState } from 'react';
import QuantitySelector from '../QuantitySelector/QuantitySelector';

const Footer = () => {
    const [quantity, setValue] = useState(1)
    const handleChanged = (value: number) => {
        console.log(' from footer', value)
        setValue(value)
    }
    return <div style={{ padding: 20 }}><QuantitySelector onChange={handleChanged} quantity={10} variant='standart' />
        <h3>{quantity}</h3></div>;
}

export default Footer;
