import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBook, deleteBook } from '../services/bookService';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(id);
        setBook(response.data);
      } catch (error) {
        console.error('Failed to fetch book', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      navigate('/books');
    } catch (error) {
      console.error('Failed to delete book', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>{book.published}</p>
      <p>{book.url}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/books/edit/${book.id}`}>Edit</Link>
    </div>
  );
};

export default BookDetail;

