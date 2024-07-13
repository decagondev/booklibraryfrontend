import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createBook, updateBook, getBook } from '../services/bookService';

const BookForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const response = await getBook(id);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setPublished(response.data.published);
          setUrl(response.data.url);
        } catch (error) {
          console.error('Failed to fetch book', error);
        }
      };

      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, description, published, url };

    try {
      if (id) {
        await updateBook(id, book);
      } else {
        await createBook(book);
      }
      navigate('/books');
    } catch (error) {
      console.error('Failed to save book', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Published:</label>
          <input type="date" value={published} onChange={(e) => setPublished(e.target.value)} required />
        </div>
        <div>
          <label>URL:</label>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BookForm;

