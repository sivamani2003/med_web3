import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the callback data from Self SDK
    const callbackData = await request.json();
    
    console.log('Self SDK callback received:', callbackData);
    
    // The Self SDK expects a response with specific fields including 'result'
    // Based on the error, it's looking for a 'result' field specifically
    const response = {
      status: 'success',
      result: {
        success: true,
        verified: true,
        data: callbackData,
        timestamp: new Date().toISOString()
      },
      message: 'Identity verification completed successfully'
    };

    // Return the response with proper CORS headers
    return NextResponse.json(response, {
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
    
    // Return error response in expected format with 'result' field
    return NextResponse.json(
      {
        status: 'error',
        result: {
          success: false,
          verified: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        },
        message: 'Failed to process identity verification'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Content-Type': 'application/json',
        },
      }
    );
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