import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), {
        status: 400,
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
