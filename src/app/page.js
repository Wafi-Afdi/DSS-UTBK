import MainComponent from "@/components/MainComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-ubuntu w-full min-h-screen">
      <main className="flex flex-col items-center justify-center w-full">
        <h1 className="font-ubuntu font-bold text-center 
          text-2xl
          w-full mt-5"
        >
          Decision Support System - Bimbingan Belajar Intesif
        </h1>
        <div className="max-w-[60%]">
          <div className="w-full bg-black h-[1px] my-2">

          </div>
          <p
            className="font-poppins text-justify mt-2 text-base"
          >
            Aplikasi ini adalah Sistem Pendukung Keputusan (DSS) yang dirancang untuk membantu sekolah menyeleksi siswa secara objektif untuk program bimbingan UTBK. Dengan menganalisis data seperti nilai mata pelajaran, absensi, dan penilaian wali kelas, sistem ini menggunakan algoritma seperti TOPSIS untuk menentukan kelayakan siswa. Hal ini memungkinkan sekolah untuk memilih siswa yang paling berpotensi dan membutuhkan bimbingan, mengoptimalkan pemanfaatan sumber daya yang terbatas dengan keputusan yang adil dan transparan.
          </p>
        </div>
        <MainComponent />
      </main>
    </div>
  );
}
