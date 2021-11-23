import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Create Tree',
    path: '/create-tree',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'FAQs',
    path: '/faq',
    icon: <FaIcons.FaCartPlus data-testid="FAQs"/>,
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/about',
    icon: <IoIcons.IoMdPeople data-testid="About Us"/>,
    cName: 'nav-text'
  },
//   {
//     title: 'Messages',
//     path: '/messages',
//     icon: <FaIcons.FaEnvelopeOpenText />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Support',
//     path: '/support',
//     icon: <IoIcons.IoMdHelpCircle />,
//     cName: 'nav-text'
//   }
];