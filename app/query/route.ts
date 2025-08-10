import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listTest() {
	const data = await sql`
    SELECT * from test
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listTest());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
