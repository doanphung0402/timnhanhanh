import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { path } from '../../ultils/constant'


const notActive = 'hover:bg-[#ED570E] px-4 h-full flex items-center bg-lime-500	'
const active = 'hover:bg-[#ED570E] px-4 h-full flex items-center  bg-[#ED570E]	'

const Navigation = ({ isAdmin }) => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    const { currentData } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(actions.getCategories())
    }, [])
    return (
        <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[60px] text-white`}
            style={{backgroundColor :"#84cc16",marginLeft:'auto',marginRight:'auto'}}>
            <div className='flex h-full items-center text-sm font-medium  w-[100%] justify-center ' >
                <NavLink
                    to={`/`}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map(item => {
                    return (
                        <div key={item.code} className='h-full flex justify-center items-center' >
                            <NavLink
                                to={`/${formatVietnameseToString(item.value)}`}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}
                <NavLink
                    to={path.CONTACT}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Liên hệ
                </NavLink>
                {currentData.id && <NavLink
                    to={`/${path.WISHLIST}`}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Bài đăng yêu thích
                </NavLink>}
            </div>
        </div>
    )
}

export default Navigation