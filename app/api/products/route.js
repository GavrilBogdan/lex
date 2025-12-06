import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// CREATE PRODUCT (POST)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return Response.json(product, { status: 201 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// GET ALL PRODUCTS
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return Response.json(products, { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// UPDATE PRODUCT (PUT)
export async function PUT(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    return Response.json(updated, { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

// DELETE PRODUCT
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Product.findByIdAndDelete(id);
    return Response.json({ success: true }, { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
