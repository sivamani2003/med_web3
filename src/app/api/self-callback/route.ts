import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // parse input (if needed) so request body is consumed
    const body = await request.json();

    // You may want to inspect `body` for the proof or whatever the SDK sends.

    // If everything is OK, return success:
    const successResp = {
      status: "success",
      proof: null,      // or actual proof string if you generate it
      reason: null,
      error_code: null
    };

    return NextResponse.json(successResp, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (err) {
    console.error("Error in verification callback:", err);

    const errorResp = {
      status: "proof_generation_failed",
      proof: null,
      reason: (err as Error).message,
      error_code: "UNKNOWN_ERROR"
    };

    return NextResponse.json(errorResp, {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
