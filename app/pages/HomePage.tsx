import React from 'react'

const HomePage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className='translate-y-[-50px] flex flex-col align-middle text-center'>
            <h1 className="text-4xl">Rayong Database</h1>
            <p className='mb-5'>แหล่งรวบรวมข้อมูลจังหวัดระยอง</p>
            <input type="text" placeholder="Search" />
        </div>
    </main>
  )
}

export default HomePage