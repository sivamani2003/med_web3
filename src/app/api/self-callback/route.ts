import { NextResponse } from "next/server";
import {
  InMemoryConfigStore,
  VerificationConfig,
} from "@selfxyz/core";

/**
 * InMemory ConfigStore setup
 * Handles multiple verification configs dynamically
 */
const inMemoryHandler = async (userIdentifier: string, userDefinedData: string) => {
  try {
    const parsed = JSON.parse(Buffer.from(userDefinedData, "hex").toString());
    return parsed.action === "high_value_transaction" ? "strict" : "standard";
  } catch {
    return "standard";
  }
};

const inMemory = new InMemoryConfigStore(inMemoryHandler);

// Example verification configs
const strictConfig: VerificationConfig = {
  minimumAge: 18,
  excludedCountries: ["USA", "CAN"],
  ofac: true,
};

const standardConfig: VerificationConfig = {
  minimumAge: 18,
  excludedCountries: ["USA", "CAN"],
  ofac: false,
};

// Set configs in memory
await inMemory.setConfig("strict", strictConfig);
await inMemory.setConfig("standard", standardConfig);

/**
 * POST handler
 * Determines response format based on request body
 * - If `type === "identity"` → returns boolean
 * - Otherwise → returns structured proof JSON
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // === Identity verification flow (boolean expected) ===
    if (body.type === "identity") {
      // Example logic: verified if body.verified === true
      const passed = body?.verified === true;
      return NextResponse.json(passed, { status: 200, headers: corsHeaders() });
    }

    // === Proof verification flow (structured JSON expected) ===
    const isValid = !!body?.proof;

    return NextResponse.json(
      {
        status: isValid ? "success" : "proof_generation_failed",
        result: {
          proof: body?.proof || null,
          reason: isValid ? null : "Invalid proof",
          error_code: isValid ? null : "INVALID_PROOF",
        },
      },
      { status: 200, headers: corsHeaders() }
    );
  } catch (err) {
    console.error("Self callback error:", err);

    return NextResponse.json(
      {
        status: "proof_generation_failed",
        result: {
          proof: null,
          reason: "Server error",
          error_code: "SERVER_ERROR",
        },
      },
      { status: 500, headers: corsHeaders() }
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
 * GET handler (for testing endpoint)
 */
export async function GET() {
  return NextResponse.json({
    status: "success",
    result: {
      message: "Self callback endpoint is working",
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
