import React from 'react';
import { Table } from 'antd';


const Dashboard = () => {
  const columns = [
    {
      title: 'S No.',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <>
        <h2 className='text-xl font-bold'>Dashboard</h2>
        <section>
            <div className='flex justify-center items-center gap-10 my-8'>
                <div className='w-[30%] shadow-lg flex justify-center items-center'>
                    <div>
                        <p className='my-5 text-gray-400'>Total Sells</p>
                        <h3 className='text-2xl font-bold my-5'>$3878</h3>
                    </div>
                </div>
                <div className='w-[30%] shadow-lg flex justify-center items-center'>
                    <div>
                        <p className='my-5 text-gray-400'>Average Order Value</p>
                        <h3 className='text-2xl font-bold my-5'>$378</h3>
                    </div>
                </div>
                <div className='w-[30%] shadow-lg flex justify-center items-center'>
                    <div>
                        <p className='my-5 text-gray-400'>Total Orders</p>
                        <h3 className='text-2xl font-bold my-5'>878</h3>
                    </div>
                </div>
            </div>
            <div className='my-5'>
                <h2 className='text-xl font-bold'>Recent Orders</h2>
                <Table columns={columns} dataSource={data} />
            </div>
        </section>
    </>
  )
}

export default Dashboard
