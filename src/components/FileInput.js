import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone';

function FileInput({
    setFiles,
    files
}) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/csv': ['.csv'],
        },
        onDropAccepted: (file) => setFiles(file[0]),
        onDropRejected: () => setFiles(null)
    });
    return (
        <div className={`w-full border-2 my-5 border-dashed border-gray-400 bg-gray-100 p-4 rounded-lg hover:cursor-pointer`}>
            <div {...getRootProps()} >
                <input {...getInputProps()} />
                <p className='text-center text-gray-700 text-sm font-ubuntu'>Drag file ke dalam sini</p>
                <p className='text-center text-gray-700 text-sm font-ubuntu'>Wajib .CSV</p>
            </div>
        </div>
    )
}

export default FileInput