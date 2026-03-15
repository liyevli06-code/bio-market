import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// Neon-dan aldığın DATABASE_URL bura qoşulacaq
const sql = neon(process.env.DATABASE_URL!);

// Bazadan bütün məhsulları gətirmək üçün
export async function GET() {
  try {
    const products = await sql`SELECT * FROM products ORDER BY id DESC`;
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Bazadan məlumat alınmadı" }, { status: 500 });
  }
}

// Yeni məhsulu bazaya yazmaq üçün
export async function POST(req: Request) {
  try {
    const { name, category, price, image } = await req.json();
    await sql`
      INSERT INTO products (name, category, price, image) 
      VALUES (${name}, ${category}, ${price}, ${image})
    `;
    return NextResponse.json({ message: "Məhsul bazaya yazıldı!" });
  } catch (error) {
    return NextResponse.json({ error: "Məhsul əlavə edilmədi" }, { status: 500 });
  }
}
