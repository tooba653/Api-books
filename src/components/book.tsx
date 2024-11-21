"use client";

import { useState, useEffect } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const fetchBooks = async () => {
    const res = await fetch("/api/book");
    const data = await res.json();
    setBooks(data);
  };

  
  const addBook = async () => {
    if (!title || !author) return alert("Please fill out all fields.");
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });
    const newBook = await res.json();
    setBooks((prev) => [...prev, newBook]);
    setTitle("");
    setAuthor("");
  };

  const updateBook = async (id: number) => {
    const updatedTitle = prompt("Enter the updated title:");
    const updatedAuthor = prompt("Enter the updated author:");
    if (!updatedTitle || !updatedAuthor) return alert("Fields cannot be empty.");
    const res = await fetch("/api/book", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: updatedTitle, author: updatedAuthor }),
    });
    const updatedBook = await res.json();
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? updatedBook : book))
    );
  };

  
  const deleteBook = async (id: number) => {
    await fetch("/api/book", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Books Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add Book
        </button>
      </div>
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="flex justify-between items-center mb-2 p-2 border"
          >
            <span>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <div>
              <button
                onClick={() => updateBook(book.id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
