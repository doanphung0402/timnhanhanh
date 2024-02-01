import React, { memo } from 'react'
import Button1 from '@mui/material/Button';


const Button = ({ text,mb, textColor, bgColor, IcAfter, onClick, fullWidth, px,fontSize, size, IcBefore ,style,width}) => {
    return (
        <Button1
        
            type='button'
            variant={!style?'contained':style}
            onClick={onClick}
            size ={size}
            // startIcon={IcBefore}
            // endIcon={IcAfter}
            fullWidth={fullWidth?true:false}
            style={{backgroundColor : `${bgColor}`,marginBottom:`${mb}`,width:`${width}`,fontSize : `${fontSize}`}}
        >
            {IcBefore && <span><IcBefore /></span>}
            <span className='text-center'> {text}</span>
            {IcAfter && <span><IcAfter /></span>}
        </Button1>
    )
}

export default memo(Button)