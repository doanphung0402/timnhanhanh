import React from 'react'
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'
import { experimentalStyled as styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import RoomInfoCard from '../components/HomeComponents/RoomInfoCard'
import Pagination from '@mui/material/Pagination'
export default function UserPersonalPage() {
  return (
    <Box sx={{ flexGrow: 1, width: '90%', margin: 'auto auto auto auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ backgroundColor: '#ffffff', padding: '20px' }}>
            <Stack direction='row' spacing={3}>
              <Avatar
                alt='Remy Sharp'
                src='/static/images/avatar/1.jpg'
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography fontWeight={700} fontSize={18}>
                  Doan Minh Phung
                </Typography>
                <Typography fontSize={14} color={'#595959'}>
                  Hoat dong
                </Typography>
              </Box>
            </Stack>
            <Box mt={1}>
              <Typography color={'#595959'}>
                Người theo dõi :
                <span
                  style={{
                    color: '#222',
                    fontWeight: '400',
                    fontSize: '18px',
                    margin: 'auto 4px auto 4px',
                  }}
                >
                  8 |
                </span>
                Đang theo dõi :
                <span
                  style={{
                    color: '#222',
                    fontWeight: '400',
                    fontSize: '18px',
                    margin: 'auto 4px auto 4px',
                  }}
                >
                  5
                </span>
              </Typography>
            </Box>
            <Button
              style={{
                textAlign: 'center',
                width: '90%',
                border: '1px solid #f80',
                color: '#f80',
                backgroundColor: '#ffe9c2',
                cursor: 'pointer',
                fontWeight: '700',
                marginTop: '15px',
              }}
            >
              Theo dõi
            </Button>
            <Box mt={4}>
              <Stack direction='row' alignItems='center' gap={1}>
                <CalendarMonthOutlinedIcon />
                <Typography variant='body1'>Đã tham gia : 5/5/2023 </Typography>
              </Stack>
              <Stack mt={1} direction='row' alignItems='center' gap={1}>
                <PinDropOutlinedIcon />
                <Typography variant='body1'>Địa chỉ : Ha Noi </Typography>
              </Stack>
              <Stack mt={1} direction='row' alignItems='center' gap={1}>
                <PhoneAndroidOutlinedIcon />
                <Typography variant='body1'>Phone :0123456789 </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(Array(9)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <RoomInfoCard />
              </Grid>
            ))}
          </Grid>
          <Box
            mt={5}
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
          >
            <Pagination
              color='secondary'
              count={10}
              size='10'
              variant='outlined'
              shape='rounded'
              backgroundColor='#FFFFFF'
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}