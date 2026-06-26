import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, house, year, position } = body;

  if (!name || !email || !house || !year || !position) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: process.env.NOTIFY_EMAIL,
      subject: `New Trials Signup: ${name}`,
      text: `New signup for Quidditch Trials:\n\nName: ${name}\nEmail: ${email}\nHouse: ${house}\nYear: ${year}\nPosition: ${position}`,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error('Resend error:', err);
    return NextResponse.json({ error: 'Failed to send notification.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
