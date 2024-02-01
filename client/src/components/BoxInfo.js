import React, { memo } from 'react'
import anonAvatar from '../assets/anon-avatar.png'
import icons from '../ultils/icons'
import { Avatar, Box, Button, Card, CardHeader, IconButton, Stack, Typography } from '@mui/material'
import { COLOR } from '../ultils/constant'
import { red } from '@mui/material/colors'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import './css/BoxInfo.css'
const { BsDot, BsTelephoneFill, SiZalo } = icons
export const AkarIconsPerson = props => (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g fill='none' stroke='#060907' strokeWidth='2'>
        <circle cx='12' cy='7' r='5'></circle>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17 14h.352a3 3 0 0 1 2.976 2.628l.391 3.124A2 2 0 0 1 18.734 22H5.266a2 2 0 0 1-1.985-2.248l.39-3.124A3 3 0 0 1 6.649 14H7'
        ></path>
      </g>
    </svg>
  )
  export const RadixIconsDot = props => (
    <svg
      width='2em'
      height='2em'
      viewBox='0 0 15 15'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill='#0adb5a'
        fillRule='evenodd'
        d='M7.5 9.125a1.625 1.625 0 1 0 0-3.25a1.625 1.625 0 0 0 0 3.25Zm0 1a2.625 2.625 0 1 0 0-5.25a2.625 2.625 0 0 0 0 5.25Z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
const BoxInfo = ({ userData }) => {
    return (
        <div className='w-full  rounded-md flex flex-col '>
            {/* <img src={anonAvatar} alt="avatar" className='w-16 h-16 object-contain rounded-full' />
            <h3 className='font-medium text-xl'>{userData?.name}</h3>
            <span className='flex items-center'>
                <BsDot color='green' size={28} />
                <span>Đang hoạt động</span>
            </span>
            <a className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg' href="/">
                <BsTelephoneFill />{userData?.phone}
            </a>
            <a className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg' href={`https://zalo.me/${userData?.zalo}`}>
                <SiZalo color='blue' size={35} />
            </a> */}

              <Card >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                      
                    </Avatar>
                  }
                  action={
                    <IconButton
                      style={{
                        border: '1px solid #ff6d25',
                        borderRadius: '10% ',
                        padding: '0px',
                      }}
                    >
                      {/* <Button
                        // onClick={goDetailPersonPage}
                        style={{ fontSize: '10px', color: '#FA6819' }}
                      >
                        Xem trang
                      </Button> */}
                    </IconButton>
                  }
                  title={
                    <Typography fontSize={'14px'} fontWeight={700} mb={0.5}>
                       {userData?.name}
                    </Typography>
                  }
                  subheader={
                    <Box>
                      <Typography
                        fontSize={'12px'}
                        display={'flex'}
                        alignItems={'center'}
                        ml={0.5}
                      >
                        <AkarIconsPerson style={{ marginRight: '2px' }} /> Cá
                        nhân
                      </Typography>
                      <Typography
                        fontSize={'12px'}
                        display={'flex'}
                        alignItems={'center'}
                        ml={'-3px'}
                      >
                        <RadixIconsDot />
                        Đang hoạt động
                      </Typography>
                    </Box>
                  }
                />
              </Card>
              <Card sx={{ maxWidth: 345, mt: 1, padding: 1 }}>
                <Typography color='#222' fontWeight={600} fontSize={16}>
                  Liên hệ người bán
                </Typography>
                <Stack mt={1} direction={'column'} spacing={2}>
                  <Button
                    variant='contained'
                    style={{
                      backgroundColor: '#3B8122',
                      color: COLOR.TEXT_WHITE_COLOR,
                    }}
                  >
                    {userData?.phone}
                  </Button>
                  <Button
                    variant='outlined'
                    style={{ color: '#3B8122', color: '#3B8122' }}
                    startIcon={<ForumOutlinedIcon />}
                  >
                    Chat người bán{' '}
                  </Button>
                </Stack>
              </Card>
          
        </div>
    )
}

export default memo(BoxInfo)