import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { Button, User } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom'
import { COLOR, path } from '../../ultils/constant'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import menuManage from '../../ultils/menuManage'
import menuAdmin from '../../ultils/menuAdmin'


const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { currentData } = useSelector(state => state.user)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])
    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page'), location.pathname])

    return (
        <div ref={headerRef} className='w-70 '>
            <div className='w-full flex items-center justify-between'>
                <Link to={'/'} >
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[240px] h-[70px] object-contain'
                    />
                </Link>
                <div className='flex items-center gap-1'>
                    {!isLoggedIn && <div className='flex items-center gap-1'>
                        <small>TimNhaNhanh.com xin chào !</small>
                        <Button
                            text={'Đăng nhập'}
                            bgColor={COLOR.PRIMARY_COLOR}
                            onClick={() => goLogin(false)}
                        />
                        <Button
                            text={'Đăng ký'}
                            textColor='text-white'
                            bgColor='#FFB534'
                            onClick={() => goLogin(true)}
                        />
                    </div>}
                    {isLoggedIn && <div className='flex items-center gap-3 relative'>
                        <User />
                        <Button
                            width={"194px"}
                            text={'Quản lý tài khoản'}
                            textColor='text-white'
                            bgColor= {COLOR.PRIMARY_COLOR3}
                            px='px-4'
                            IcAfter={BsChevronDown}
                            onClick={() => currentData?.role === 'R3' ? navigate('/he-thong/sua-thong-tin-ca-nhan') : setIsShowMenu(prev => !prev)}
                        />
                        {isShowMenu && currentData?.role === 'R2' && <div className='absolute min-w-200 z-50 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col'>
                            {menuManage.map(item => {
                                return (
                                    <Link
                                        className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2'
                                        key={item.id}
                                        to={item?.path}
                                    >
                                        {item?.icon}
                                        {item.text}
                                    </Link>
                                )
                            })}
                            <span
                                className='cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2'
                                onClick={() => {
                                    setIsShowMenu(false)
                                    dispatch(actions.logout())
                                }}
                            >
                                <AiOutlineLogout />
                                Đăng xuất
                            </span>
                        </div>}
                        {isShowMenu && currentData?.role === 'R1' && <div className='absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col'>
                            {menuAdmin.map(item => {
                                return (
                                    <Link
                                        className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2'
                                        key={item.id}
                                        to={item?.path}
                                    >
                                        {item?.icon}
                                        {item.text}
                                    </Link>
                                )
                            })}
                            <span
                                className='cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2'
                                onClick={() => {
                                    setIsShowMenu(false)
                                    dispatch(actions.logout())
                                }}
                            >
                                <AiOutlineLogout />
                                Đăng xuất
                            </span>
                        </div>}
                    </div>}
                    {(currentData?.role === 'R1' || currentData?.role === 'R2') && <Button
                        text={'Đăng tin mới'}
                        textColor='text-white'
                        width={"170px"}
                        bgColor='bg-secondary2'
                        IcAfter={AiOutlinePlusCircle}
                        onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
                    />}
                </div>
            </div>
        </div>
    )
}

export default Header