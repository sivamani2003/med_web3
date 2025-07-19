"use client";

import { useState } from 'react';
import { CreditCard, Shield, Bell, KeyRound } from 'lucide-react';

const WalletSecurityPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Wallet & Security</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold flex items-center mb-4">
          <CreditCard className="w-5 h-5 mr-2" />
          Connected Wallet
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-gray-800">0x1234...abcd</p>
            <p className="text-sm text-green-600">Connected</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
            Disconnect
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold flex items-center mb-4">
          <Shield className="w-5 h-5 mr-2" />
          Security Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="twoFactor" className="font-medium">Two-Factor Authentication (2FA)</label>
            <button 
              onClick={() => setTwoFactor(!twoFactor)}
              className={`px-4 py-2 text-sm rounded-lg ${twoFactor ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {twoFactor ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Password</p>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold flex items-center mb-4">
          <Bell className="w-5 h-5 mr-2" />
          Notification Settings
        </h2>
        <div className="flex items-center justify-between">
          <label htmlFor="notifications" className="font-medium">Email Notifications</label>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`px-4 py-2 text-sm rounded-lg ${notifications ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {notifications ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletSecurityPage;
