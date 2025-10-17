'use client'
import { supabase } from '@/lib/supabase';
import { div } from 'framer-motion/client';

const aiBooks = [
  {
    title: "Deep Learning",
    author: "Ian Goodfellow",
    price: 1499,
    discount_percentage: 20,
    rating: 4.9,
    src_url: "https://m.media-amazon.com/images/I/61fim5QqaqL._AC_UF1000,1000_QL80_.jpg",
    category: "AI & ML",
    stock: 50,
    is_new_arrival: true,
    is_top_selling: true
  },
  {
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    price: 1299,
    discount_percentage: 15,
    rating: 4.8,
    src_url: "https://m.media-amazon.com/images/I/81ZBe5Q9sJL._AC_UF1000,1000_QL80_.jpg",
    category: "AI & ML",
    stock: 40,
    is_new_arrival: true,
    is_top_selling: true
  },
  {
    title: "Pattern Recognition and Machine Learning",
    author: "Christopher Bishop",
    price: 1599,
    discount_percentage: 25,
    rating: 4.7,
    src_url: "https://m.media-amazon.com/images/I/61FKyOeM7KL._AC_UF1000,1000_QL80_.jpg",
    category: "AI & ML",
    stock: 30,
    is_new_arrival: false,
    is_top_selling: true
  },
  {
    title: "The Hundred-Page Machine Learning Book",
    author: "Andriy Burkov",
    price: 499,
    discount_percentage: 20,
    rating: 4.6,
    src_url: "https://m.media-amazon.com/images/I/71ZKa0rWejL._AC_UF1000,1000_QL80_.jpg",
    category: "AI & ML",
    stock: 60,
    is_new_arrival: true,
    is_top_selling: false
  },
  {
    title: "Python Machine Learning",
    author: "Sebastian Raschka",
    price: 999,
    discount_percentage: 30,
    rating: 4.6,
    src_url: "https://m.media-amazon.com/images/I/71vc5lu7rSL._AC_UF1000,1000_QL80_.jpg",
    category: "Programming",
    stock: 45,
    is_new_arrival: false,
    is_top_selling: true
  }
];

export default function BulkAddPage() {
  async function addAllBooks() {
    try {
      const { error } = await supabase
        .from('products')
        .insert(aiBooks);
      
      if (error) throw error;
      alert(`Successfully added ${aiBooks.length} books!`);
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Bulk Add AI Books</h1>
      
      <div className="bg-yellow-100 p-4 rounded mb-6">
        <p>This will add {aiBooks.length} AI & ML books to your database</p>
      </div>

      <button
        onClick={addAllBooks}
        className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700"
      >
        Add All {aiBooks.length} Books
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Books to be added:</h2>
        <div className="grid gap-4">
          {aiBooks.map((book, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="font-bold">{book.title}</h3>
              <p>by {book.author} - ₹{book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}