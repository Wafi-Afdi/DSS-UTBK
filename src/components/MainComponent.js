'use client'
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
import FileInput from './FileInput';
import Dropzone from 'react-dropzone'



function MainComponent() {
    const [tipeSiswa, SetTipeSiswa] = useState("")
    const [files, setFiles] = useState(null)


    useEffect(()=> {
        console.log(files)
    }, [files])
    return (
        <div className='max-w-[60%] w-full mt-2'>
            <div className='mt-2'>
                <h2 className='font-ubuntu font-bold'>
                    1. Pilih Tipe Siswa (MIPA/IPS):
                </h2>
                <Dropdown label={tipeSiswa.length == 0 ? "Pilih Tipe Siswa" : tipeSiswa} className='mt-2'>
                    <DropdownItem onClick={() => SetTipeSiswa("MIPA")}>MIPA</DropdownItem>
                    <DropdownItem onClick={() => SetTipeSiswa("IPS")}>IPS</DropdownItem>
                </Dropdown>
            </div>
            <div className='mt-4'>
                <h2 className='font-ubuntu font-bold'>
                    2. Input File .CSV:
                </h2>
                <FileInput setFiles={setFiles} files={files}/>
                
            </div>
        </div>
    )
}

export default MainComponent