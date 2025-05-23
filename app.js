import React, { useState } from 'react';
import QRCode from 'qrcode.react';

export default function App() {
  const [phone, setPhone] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [qrData, setQrData] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQr = async () => {
    setIsLoading(true);
    // Replace with actual backend call to get QR data
    const response = await fetch('https://liki-md.onrender.com/api/get-qr');
    const data = await response.json();
    setQrData(data.qr);
    setIsLoading(false);
  };

  const handleGetPairingCode = async () => {
    setIsLoading(true);
    // Replace with actual backend call to get pairing code
    const response = await fetch('https://liki-md.onrender.com/api/get-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const data = await response.json();
    setPairingCode(data.code);
    setIsLoading(false);
  };

  const handleConnect = async () => {
    setIsLoading(true);
    // Replace with actual backend call to initiate connection
    const response = await fetch('https://liki-md.onrender.com/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code: pairingCode })
    });
    const data = await response.json();
    setSessionId(data.sessionId);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">WhatsApp Bot Connector</h1>

      <div className="bg-white shadow-md rounded p-6 w-full max-w-md mb-4">
        <h2 className="text-lg font-semibold mb-2">QR Code Pairing</h2>
        <button onClick={handleGenerateQr} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Generate QR Code
        </button>
        {qrData && <QRCode value={qrData} size={256} />}
      </div>

      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Phone Number Pairing</h2>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={handleGetPairingCode} className="bg-green-500 text-white px-4 py-2 rounded mb-2">
          Get 8-digit Pairing Code
        </button>
        {pairingCode && <div className="mb-2">Pairing Code: <strong>{pairingCode}</strong></div>}
        <button onClick={handleConnect} className="bg-purple-500 text-white px-4 py-2 rounded">
          Connect WhatsApp
        </button>
      </div>

      {isLoading && <div className="mt-4 text-gray-600">Processing...</div>}
      {sessionId && (
        <div className="mt-4 p-4 bg-white rounded shadow-md text-center">
          <h3 className="text-md font-semibold">Session ID</h3>
          <p>{sessionId}</p>
        </div>
      )}
    </div
>
  );
}
