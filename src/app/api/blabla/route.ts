import { NextResponse } from 'next/server';

export const GET = async () => {
  return NextResponse.json({ message: 'Internal Server Error 테스트' }, { status: 500 });
};
