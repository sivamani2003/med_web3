"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', accesses: 30 },
  { name: 'Feb', accesses: 20 },
  { name: 'Mar', accesses: 27 },
  { name: 'Apr', accesses: 18 },
  { name: 'May', accesses: 23 },
  { name: 'Jun', accesses: 34 },
];

const AccessLogItem = ({ accessor, date, details }: { accessor: string, date: string, details: string }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-800">{accessor}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="text-sm text-gray-600">{details}</p>
    </div>
  </div>
);

const PatientAccessLogsPage = () => {
  const [filter, setFilter] = useState('all');

  const logs = [
    { id: 1, accessor: 'Dr. John Doe', date: '2023-07-18 10:30 AM', details: 'Viewed General Health Report' },
    { id: 2, accessor: 'City Hospital Admin', date: '2023-07-17 02:15 PM', details: 'Accessed Emergency Contact Info' },
    { id: 3, accessor: 'Dr. Jane Smith', date: '2023-07-16 09:00 AM', details: 'Viewed X-Ray Scan' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Access Logs</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Access Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="accesses" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detailed Logs</h2>
          <div>
            {/* Filter functionality can be added here */}
          </div>
        </div>
        <div className="space-y-4">
          {logs.map(log => (
            <AccessLogItem key={log.id} {...log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAccessLogsPage;
