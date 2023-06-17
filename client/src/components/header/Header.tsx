'use client'

import React, {useState} from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import CartListSection from '../section/CartListSection'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Header() {

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


  return (
    <>
    <div className='grid grid-cols-3 place-items-center'>
        <div></div>
        <h1 className='my-8'>
            <Link  href={"/"} className='text-center py-8'>Ecommerce</Link>
        </h1>
        <div className='flex justify-end  w-full mr-4'>
            <button onClick={toggleDrawer} className='bg-blue-500 relative hover:bg-blue-700 text-white font-bold py-2 px-8 rounded'>
                Basket 
            </button>
           

        </div>
    </div>

    <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                size={
                    // if mobile, 90% else 50%
                    window.innerWidth <= 768 ? '90%' : '30%'

                }
                
            >
                <div className='flex flex-col relative h-full pb-16'>
                    <h2 className='text-center py-8'>Cart List</h2>
                    <CartListSection />  
                    <div className='fixed bottom-0 w-full  '>
                        <button onClick={
                            // navigate to checkout page
                            () => {
                                toggleDrawer()
                                router.push('/checkout')
                            }
                        } className='bg-blue-500 w-full relative hover:bg-blue-700 text-white font-bold py-4 px-8 '>
                            Buy
                        </button>
                        </div> 
                </div>
            </Drawer>

    </>
  )
}

export default Header