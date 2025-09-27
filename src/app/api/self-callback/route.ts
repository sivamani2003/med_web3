import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await request.json(); // Still parse to avoid errors, but ignore content
    return new NextResponse('true', {
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
    return new NextResponse('false', {
      status: 500,
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
  // Handle preflight CORS requests
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Add GET method for testing the endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'success',
    result: {
      message: 'Self SDK callback endpoint is working',
      timestamp: new Date().toISOString(),
      endpoint: 'https://med-web3.vercel.app/api/self-callback'
    }
  });
}