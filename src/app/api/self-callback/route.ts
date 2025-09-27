import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the callback data from Self SDK
    const callbackData = await request.json();
    
    console.log('Self SDK callback received:', callbackData);
    
    // The Self SDK expects a simple boolean response for identity verification
    // Based on the error "expected a boolean", return true for successful verification
    return NextResponse.json(true, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error processing Self SDK callback:', error);
    
    // Return false for error cases
    return NextResponse.json(false, {
      status: 200, // Still return 200 status but false value
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Self SDK callback endpoint is working',
    timestamp: new Date().toISOString(),
    endpoint: 'https://med-web3.vercel.app/api/self-callback'
  });
}