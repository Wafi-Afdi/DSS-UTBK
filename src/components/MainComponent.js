'use client'
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
import Dropzone from 'react-dropzone'
import Papa from 'papaparse'


import FileInput from './FileInput';
import CSVReader from './CSVReader';

import { topsisFromFile, weightIPA, weightIPS } from '@/utils/topsis';
import { ExportToCSV } from '@/utils/export'

function MainComponent() {
    const [tipeSiswa, SetTipeSiswa] = useState("")
    const [files, setFiles] = useState(null)
    const [parsed_data, SetParseData] = useState([])
    const [output_dss, SetOutputDSS] = useState([])
    const [fileError, setFileError] = useState(null)

    async function DSSClick(e) {
        let result
        if (tipeSiswa == "MIPA") {
            console.log(weightIPA)
            result = await topsisFromFile(files, weightIPA, true);
        } else if (tipeSiswa == "IPS") {
            result = await topsisFromFile(files, weightIPS, true);
        } else {
            alert('Tipe siswa tidak valid')
        }
        SetOutputDSS(result);
    }

    async function ExportToCSVButton(e) {
        if(output_dss.length > 0) {
            await ExportToCSV(output_dss, 'result-topsis.csv');
        } else {
            alert('Generate output first')
        }
    }

    useEffect(() => {
        if (files) {
            Papa.parse(files, {
                header: true,
                delimitersToGuess: "",
                complete: function (result) {
                    SetParseData(result.data)
                    SetOutputDSS([])
                }
            })
        }
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
                <p>Ikuti prasyarat ini:</p>
                {
                    tipeSiswa == "MIPA" ?
                        <div>
                            <h3>Prasyarat Kolom Input CSV untuk Siswa MIPA:</h3>
                            <ul className='text-base list-disc ml-10'>
                                <li>ID_Siswa: Wajib diisi. Harus unik untuk setiap siswa (misal: NISN atau nomor absen).</li>
                                <li>Nama_Siswa: Wajib diisi. Nama lengkap siswa.</li>
                                <li>Kelas: Wajib diisi (misal: "XII MIPA 1").</li>
                                <li>Jurusan: Wajib diisi, harus "MIPA".</li>
                                <li>Absensi_Persen: Wajib diisi. Persentase kehadiran siswa (nilai antara 0.0 - 100.0, gunakan titik sebagai desimal).</li>
                                <li>Penilaian_Wali_Kelas_Motivasi: Wajib diisi. Penilaian motivasi dari wali kelas (skala 1-5, bilangan bulat).</li>
                                <li>Penilaian_Wali_Kelas_Disiplin: Wajib diisi. Penilaian kedisiplinan dari wali kelas (skala 1-5, bilangan bulat).</li>
                                <li>Penilaian_Wali_Kelas_Potensi_Akademik: Wajib diisi. Penilaian potensi akademik dari wali kelas (skala 1-5, bilangan bulat).</li>
                                <li>Nilai_MTK_Wajib: Wajib diisi. Nilai Matematika Wajib (0-100, bilangan bulat).</li>
                                <li>Nilai_BI_Wajib: Wajib diisi. Nilai Bahasa Indonesia Wajib (0-100, bilangan bulat).</li>
                                <li>Nilai_BIG_Wajib: Wajib diisi. Nilai Bahasa Inggris Wajib (0-100, bilangan bulat).</li>
                                <li>Nilai_Fisika: Wajib diisi. Nilai Fisika (0-100, bilangan bulat).</li>
                                <li>Nilai_Kimia: Wajib diisi. Nilai Kimia (0-100, bilangan bulat).</li>
                                <li>Nilai_Biologi: Wajib diisi. Nilai Biologi (0-100, bilangan bulat).</li>
                                <li>Nilai_MTK_Peminatan: Wajib diisi. Nilai Matematika Peminatan (0-100, bilangan bulat).</li>
                                <li>Nilai_TIK: Opsional. Nilai TIK/Informatika (0-100, bilangan bulat). Jika kosong, isi dengan `NULL` atau biarkan kosong.</li>
                                <li>Rata_Rata_Nilai_Semester_Akhir: Wajib diisi. Rata-rata keseluruhan nilai rapor di semester terakhir (0.0-100.0, gunakan titik sebagai desimal).</li>
                            </ul>
                        </div>
                        :
                        tipeSiswa == "IPS" &&
                        <div>
                            <h3>Prasyarat Kolom Input CSV untuk Siswa IPS:</h3>
                            <ul className='text-base list-disc ml-10'>
                                <li>ID_Siswa: Wajib diisi. Harus unik untuk setiap siswa (misal: NISN atau nomor absen).</li>
                                <li>Nama_Siswa: Wajib diisi. Nama lengkap siswa.</li>
                                <li>Kelas: Wajib diisi (misal: "XII IPS 1").</li>
                                <li>Jurusan: Wajib diisi, harus "IPS".</li>
                                <li>Absensi_Persen: Wajib diisi. Persentase kehadiran siswa (nilai antara 0.0 - 100.0, gunakan titik sebagai desimal).</li>
                                <li>Penilaian_Wali_Kelas_Motivasi: Wajib diisi. Penilaian motivasi dari wali kelas (skala 1-5, bilangan bulat).</li>
                                <li>Penilaian_Wali_Kelas_Disiplin: Wajib diisi. Penilaian kedisiplinan dari wali kelas (skala 1-5, bilangan bulat).</li>
                                <li>Penilaian_Wali_Kelas_Potensi_Akademik: Wajib diisi. Penilaian potensi akademik dari wali kelas (skala 1-5, bilangan bulat).</li>
                                <li>Nilai_MTK_Wajib: Wajib diisi. Nilai Matematika Wajib (0-100, bilangan bulat).</li>
                                <li>Nilai_BI_Wajib: Wajib diisi. Nilai Bahasa Indonesia Wajib (0-100, bilangan bulat).</li>
                                <li>Nilai_BIG_Wajib: Wajib diisi. Nilai Bahasa Inggris Wajib (0-100, bilangan bulat).</li>
                                <li>Nilai_Sejarah_Peminatan: Wajib diisi. Nilai Sejarah Peminatan (0-100, bilangan bulat).</li>
                                <li>Nilai_Ekonomi: Wajib diisi. Nilai Ekonomi (0-100, bilangan bulat).</li>
                                <li>Nilai_Sosiologi: Wajib diisi. Nilai Sosiologi (0-100, bilangan bulat).</li>
                                <li>Nilai_Geografi: Wajib diisi. Nilai Geografi (0-100, bilangan bulat).</li>
                                <li>Nilai_TIK: Opsional. Nilai TIK/Informatika (0-100, bilangan bulat). Jika kosong, isi dengan `NULL` atau biarkan kosong.</li>
                                <li>Rata_Rata_Nilai_Semester_Akhir: Wajib diisi. Rata-rata keseluruhan nilai rapor di semester terakhir (0.0-100.0, gunakan titik sebagai desimal).</li>
                            </ul>
                        </div>
                }
                <FileInput setFiles={setFiles} files={files} />
                {
                    fileError && <p className='font-poppins'>{fileError}</p>
                }
                {
                    files &&
                    <>
                        <div>
                            <h2 className='font-ubuntu font-bold'>
                                3. Tampilan Data:
                            </h2>
                            <CSVReader data={parsed_data} />
                        </div>

                        <button
                            className='py-2 px-4 border-4 border-green-200 bg-green-400 rounded-xl
                        font-ubuntu font-bold text-white
                        mt-2 mb-4
                    '
                            type='button'
                            onClick={DSSClick}
                        >
                            Jalankan DSS
                        </button>
                    </>
                }
                {
                    files && output_dss.length > 0 &&
                    <div>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <h2 className='font-ubuntu font-bold'>
                                4. Output Data:
                            </h2>
                            <button
                                className='py-2 px-4 border-4 border-green-200 bg-green-400 rounded-xl
                                    font-ubuntu font-bold text-white
                                    mt-2 mb-4
                                '
                                type='button'
                                onClick={ExportToCSVButton}
                            >
                                Export to CSV
                            </button>
                        </div>
                        <CSVReader data={output_dss} />
                    </div>
                }
            </div>
        </div>
    )
}

export default MainComponent