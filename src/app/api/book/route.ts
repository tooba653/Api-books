import { NextResponse } from "next/server";

interface Book {
  id: number;
  title: string;
  author: string;
}

let books: Book[] = [
  { id: 1, title: "Bang-e-Dra", author: "Allama Iqbal" },
  { id: 2, title: "Asrar-e-Khudi", author: "Allama Iqbal" },
  { id: 3, title: "Rumuz-e-Bekhudi", author: "Allama Iqbal" },
  { id: 4, title: "Zarb-e-Kaleem", author: "Allama Iqbal" },
  { id: 5, title: "Bal-e-Jibril", author: "Allama Iqbal" },
  { id: 6, title: "Payam-e-Mashriq", author: "Allama Iqbal" },
  { id: 7, title: "Javid Nama", author: "Allama Iqbal" },
  { id: 8, title: "Armaghan-e-Hijaz", author: "Allama Iqbal" },
];

// GET: Fetch all books
export async function GET() {
  return NextResponse.json(books);
}

// POST: Add a new book
export async function POST(req: Request) {
  const { title, author } = await req.json();
  const newBook: Book = { id: Date.now(), title, author };
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}

// PUT: Update a book
export async function PUT(req: Request) {
  const { id, title, author } = await req.json();
  books = books.map((book) =>
    book.id === id ? { ...book, title, author } : book
  );
  return NextResponse.json({ id, title, author });
}

// DELETE: Delete a book
export async function DELETE(req: Request) {
  const { id } = await req.json();
  books = books.filter((book) => book.id !== id);
  return NextResponse.json({ message: "Book deleted successfully" });
}
