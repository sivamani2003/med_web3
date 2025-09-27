import { NextRequest, NextResponse } from 'next/server';

/**
 * POST handler
 * The Self SDK sometimes expects just a boolean (identity verification),
 * and in other cases expects a structured response (offchain proof verification).
 *
 * You can switch based on what the request body contains,
 * or if you know exactly which flow this endpoint serves, keep only that format.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // ⚡ Case 1: Identity Verification expects boolean
    if (body && body.type === "identity") {
      return NextResponse.json(true, {
        status: 200,
        headers: corsHeaders(),
      });
    }

    // ⚡ Case 2: Offchain Proof Verification expects structured JSON
    return NextResponse.json(
      {
        status: "success",
        result: {
          proof: null,       // replace with actual proof if generated
          reason: null,
          error_code: null,
        },
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (err) {
    console.error("Error in Self SDK callback:", err);

    // Default error response for proof flow
    return NextResponse.json(
      {
        status: "proof_generation_failed",
        result: {
          proof: null,
          reason: (err as Error).message,
          error_code: "UNKNOWN_ERROR",
        },
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

/**
 * OPTIONS handler (CORS preflight)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

/**
 * GET handler (for debugging)
 */
export async function GET() {
  return NextResponse.json({
    status: "success",
    result: {
      message: "Self SDK callback endpoint is working",
      timestamp: new Date().toISOString(),
      endpoint: "https://med-web3.vercel.app/api/self-callback",
    },
  });
}

/**
 * Common CORS headers
 */
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
