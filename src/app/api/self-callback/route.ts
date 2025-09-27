import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the callback data from Self SDK
    const callbackData = await request.json();
    
    console.log('Self SDK callback received:', callbackData);
    
    // The Self SDK expects a response with a 'status' field
    // This is what was missing in your original error
    const response = {
      status: 'success',
      message: 'Callback received successfully',
      timestamp: new Date().toISOString(),
      data: callbackData
    };

    // Return the response with proper CORS headers
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Error processing Self SDK callback:', error);
    
    // Return error response in expected format
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to process callback',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
