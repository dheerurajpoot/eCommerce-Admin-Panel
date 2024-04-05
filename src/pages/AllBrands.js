import React from 'react'
import { Table } from 'antd';

const Enquiries = () => {
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
    <div className='my-5'>
        <h2 className='text-xl my-4 font-bold'>Brands</h2>
        <Table columns={columns} dataSource={data} />
      </div>
  )
}

export default Enquiries
