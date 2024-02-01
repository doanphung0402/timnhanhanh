import React, { useEffect, useRef, useState } from 'react'

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import TabScrollButton from '@mui/material/TabScrollButton'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import './css/Footer.css'
export default function Footer () {
  return (
    <>
      <div  className='footer-container'>
        <div className='footer-menu'>
          <div className='row'>
            <div className='footer-logo'></div>

            <div className='footer-service'>
              <ul className='footer-menu-item'>
                <li className='scroll'>
                  <a href='#works'>Dịch vụ </a>
                </li>
                <li className='scroll'>
                  <a href='#reviews'>review</a>
                </li>
                <li className='scroll'>
                  <a href='#blog'>blog</a>
                </li>
                <li className='scroll'>
                  <a href='#contact'>contact</a>
                </li>
                <li className=' scroll'>
                  <a href='#contact'>my account</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='hm-footer-copyright'>
          <div className='copyright'>
            <p>
              &copy;copyright. designed and developed by{' '}
              <a href=''>Timnhanhanh.com</a>
            </p>
          </div>

          <div className='footer-social'>
            <span>
              <LocalPhoneIcon>0396061722</LocalPhoneIcon>
            </span>
            <a href='#'>
              <FacebookIcon />
            </a>
            <a href='#'>
              <TwitterIcon />
            </a>
            <a href='#'>
              <LinkedInIcon />
            </a>
            <a href='#'>
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
