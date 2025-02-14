import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();

    // Query the database to check if the API key exists
    const { error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    return new Response(JSON.stringify({ valid: !error }), {
      status: error ? 400 : 200,
    });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
} 