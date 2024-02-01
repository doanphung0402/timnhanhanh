import React from 'react'
import { Navigation } from '../Public'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import NavigationSys from './NavigationSys'
const HeaderSys = () => {
    return (
        <div className='w-full flex flex-none h-[60px]'>
            <div className='flex  items-center font-bold  text-white w-[200px] flex-none border-y	'>
            <Link to={'/'} >
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[280px] h-[70px] object-contain'
                    />
                </Link>
            </div>
            <div className='flex-auto'>
                <NavigationSys isAdmin={true} />
            </div>
        </div>
    )
}

export default HeaderSys