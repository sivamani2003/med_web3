import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the callback data from Self SDK
    const callbackData = await request.json();
    
    console.log('Self SDK callback received:', callbackData);
    
    // The Self SDK expects an OffchainVerificationResponse structure
    // Based on the Self SDK documentation and your ProofOfHuman contract
    const response = {
      success: true,
      verified: true,
      proof: {
        verificationId: callbackData.verificationId || `verification_${Date.now()}`,
        userIdentifier: callbackData.userIdentifier || callbackData.userId,
        timestamp: Date.now(),
        configId: callbackData.configId || "default_config",
        chainId: callbackData.chainId || "1",
        signature: callbackData.signature || null,
        proofData: callbackData.proofData || null
      },
      metadata: {
        verificationMethod: "self_sdk",
        endpoint: "https://med-web3.vercel.app/api/self-callback",
        timestamp: new Date().toISOString()
      }
    };
    
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error processing Self SDK callback:', error);
    
    // Return proper error response structure
    const errorResponse = {
      success: false,
      verified: false,
      error: {
        code: 'CALLBACK_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      proof: null,
      metadata: {
        verificationMethod: "self_sdk",
        endpoint: "https://med-web3.vercel.app/api/self-callback",
        timestamp: new Date().toISOString()
      }
    };
    
    return NextResponse.json(errorResponse, {
      status: 200, // Return 200 but with success: false
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'active',
    message: 'Self SDK callback endpoint is working',
    timestamp: new Date().toISOString(),
    endpoint: 'https://med-web3.vercel.app/api/self-callback',
    expectedFormat: 'OffchainVerificationResponse',
    contractIntegration: 'ProofOfHuman (SelfVerificationRoot)'
  });
}