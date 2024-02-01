import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Grid,
    Input,
    MenuItem,
    Slider,
    Stack,
    TextField,
    Typography,
  } from '@mui/material'
  import React, { useEffect } from 'react'
  import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
  import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined'
  import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined'
  import { useState } from 'react'
  import axios from 'axios'
  import RadarOutlinedIcon from '@mui/icons-material/RadarOutlined'
  import { VolumeUp } from '@mui/icons-material'
  import styled from '@emotion/styled'
  import { YOUR_OPENCAGE_API_KEY } from '../ultils/constant'
  import {COLOR} from '../ultils/constant'
  const PrettoSlider = styled(Slider)({
    color: COLOR.PRIMARY_COLOR,
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: COLOR.PRIMARY_COLOR,
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  })
  
  export default function FilterPosition({setFilter}) {
    const [value1, setValue1] = React.useState([0, 500000])
    const minDistance = 500000
    const [locationData, setLocationData] = useState([])
  
    const [city, setCity] = useState([])
  
    const [district, setDistrict] = useState([])
  
    const [ward, setWards] = useState([])
    const urlGetLocationData =
      'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
  
    const getLocationData = async () => {
      const data = (await axios.get(urlGetLocationData)).data
      setLocationData(data)
    }
    const onChangeCityField = event => {
      setCity([event.target.value])
      //  setDistrict(data.Districts);
    }
    const onChangeDistrict = event => {
      setDistrict([event.target.value])
    }
    const onChangeWard = event => {
      setWards([event.target.value])
    }
    useEffect(() => {
      getLocationData()
    }, [])
  
  
    //get price
    const handleChange1 = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return
      }
  
      if (activeThumb === 0) {
        setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
      } else {
        setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
      }
    }
    const [radius, setRadius] = React.useState(10)
    const [lat,setLat] = useState(null); 
    const [lon,setLon] = useState(null); 
    
    const handleInputChange = event => {
      setRadius(event.target.value === '' ? 0 : Number(event.target.value))
    }
  
    const handleBlur = () => {
      if (radius < 0) {
        setRadius(0)
      } else if (radius > 50) {
        setRadius(50)
      }
    }
    const handleSliderChange = (event, newValue) => {
      setRadius(newValue)
    }
  
    const [accordion1, setAccordion1] = useState(false)
    const [accordion2, setAccordion2] = useState(false)
    
    const [locationDetails, setLocationDetails] = useState(null);
    useEffect(() => {
      // Kiểm tra xem trình duyệt có hỗ trợ Geolocation không
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude); setLon(longitude); 
  
            // Thay thế 'YOUR_OPENCAGE_API_KEY' bằng API key của bạn
            const apiKey = YOUR_OPENCAGE_API_KEY;
  
            // Gọi OpenCage API để lấy thông tin địa chỉ chi tiết
            axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=vi`)
              .then((response) => {
                const address = response.data.results[0].formatted;
                setLocationDetails(address);
              })
              .catch((error) => {
                console.error('Error fetching location details:', error);
              });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);
    const findHere = () =>{
       setFilter({
         lat :lat, 
         lon : lon , 
         radius : radius, 
         priceMax : value1[1], 
         priceMin : value1[0]
       })
    }
    return (
      <Box>
        <Box>
          <Accordion
            disabled={accordion1}
            onChange={() => setAccordion2(!accordion2)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              style={{ border: '2px solid #F4F4F4' }}
            >
              <Typography
                style={{
                  color: '#222',
                  fontSize: '14px',
                  fontWeight: '700',
                  lineHeight: '20px',
  
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'left',
                }}
              >
                <LocationOnOutlinedIcon /> Tìm kiếm quanh bạn
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ paddingLeft: '30px' }}>
              <Button
                style={{ padding: 0, color: COLOR.PRIMARY_COLOR1 }}
                endIcon={<RadarOutlinedIcon />}
                
              >
                Tìm xung quanh đây{' '}
              </Button>
              <Typography variant='body2'>
                 Vị trí của bạn : {locationDetails}
              </Typography>
              <Typography
                style={{
                  color: '#222',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '18px',
                }}
                mt={2}
              >
                {' '}
                Nhập bán kính tìm kiếm{' '}
              </Typography>
              <Grid
                container
                spacing={2}
                alignItems='center'
                style={{ marginTop: '10px' }}
              >
                <Grid item>
                  <ControlCameraOutlinedIcon />
                </Grid>
                <Grid item xs>
                  <PrettoSlider
                    valueLabelDisplay='auto'
                    aria-label='pretto slider'
                    defaultValue={5}
                    max={50}
                    onChange={handleSliderChange}
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={radius}
                    size='small'
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 10,
                      min: 0,
                      max: 50,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                  />
                  <Typography variant='caption'>km</Typography>
                </Grid>
              </Grid>
              <Button
                variant='contained'
                style={{
                  color: COLOR.TEXT_WHITE_COLOR,
                  backgroundColor: COLOR.PRIMARY_COLOR2,
                  width: '90%',
                  margin: '50px auto 10px auto',
                }}
                onClick={findHere}
              >
                Áp dụng
              </Button>
            </AccordionDetails>
          </Accordion>
  
  
  
  
          <Accordion
            disabled={accordion2}
            onChange={() => setAccordion1(!accordion1)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography
                style={{
                  color: '#222',
                  fontSize: '14px',
                  fontWeight: '700',
                  lineHeight: '20px',
  
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                }}
              >
                <MapsHomeWorkOutlinedIcon /> Tìm kiếm theo khu vực
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form
                style={{
                  padding: '0',
                  marginTop: '5px',
                  justifyContent: 'flex-start',
                  width: '95%',
                }}
              >
                <TextField
                  style={{ textAlign: 'left', padding:'5px'  }}
                  required
                  fullWidth
                  id='outlined-select-currency'
                  select
                  label='Chọn tỉnh / thành phố '
                  // helperText="Please select your currency"
                  onChange={onChangeCityField}
                >
                  {locationData.map(option => (
                    <MenuItem key={option.Id} value={option.Name}>
                      {option.Name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  style={{ textAlign: 'left', marginTop: '5px', padding:'5px' }}
                  onChange={onChangeDistrict}
                  required
                  fullWidth
                  id='outlined-select-currency'
                  select
                  label='Chọn quận huyện / thị xã  '
                  // helperText="Please select your currency"
                >
                  {locationData
                    .find(item => item.Name === city[0])
                    ?.Districts.map(option => (
                      <MenuItem key={option.Id} value={option.Name}>
                        {option.Name}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  style={{ textAlign: 'left', marginTop: '5px',padding:'5px'  }}
                  onChange={onChangeWard}
                  required
                  fullWidth
                  id='outlined-select-currency'
                  select
                  label='Chọn phường , xã , thị trấn '
                  // helperText="Please select your currency"
                >
                  {locationData
                    .find(item => item.Name === city[0])
                    ?.Districts.find(dist => dist.Name === district[0])
                    ?.Wards.map(option => (
                      <MenuItem key={option.Id} value={option.Name}>
                        {option.Name}
                      </MenuItem>
                    ))}
                </TextField>
                <Box
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignContent={'center'}
                  mt={4}
                  style={{ width: '100%' }}
                >
                  <Button
                    variant='outlined'
                    style={{ color: COLOR.TEXT_WHITE_COLOR , backgroundColor: COLOR.PRIMARY_COLOR}}
                  >
                    Xóa lọc{' '}
                  </Button>
                  <Button
                    variant='outlined'
                    style={{
                      color: COLOR.TEXT_WHITE_COLOR,
                      backgroundColor: COLOR.PRIMARY_COLOR2,
                    }}
                  >
                    Áp dụng
                  </Button>
                </Box>
              </form>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    )
  }
  