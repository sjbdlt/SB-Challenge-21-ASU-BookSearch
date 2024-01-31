import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

        const[ deleteBook, {error } ] = useMutation( REMOVE_BOOK)
         const { username: userParam } = useParams();

        const { loading, data } = useQuery( QUERY_ME );
      
        const user = data?.me || data?.user || {};
        // navigate to personal profile page if username is yours
        // if (Auth.loggedIn()) {
        //   setUserData(user);
        //   return <Navigate to="/me"/>;
        // }

        if (loading) {
          return <div>Loading...</div>;
        }

        if (!user?.username) {
          return (
            <h4>
              You need to be logged!
            </h4>
          );
        }
        
   
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
console.log(bookId);
    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook({
        variables: {
          bookId
        },
      });

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // // if data isn't here yet, say so
  // if (loading) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {user.savedBooks?.length
            ? `Viewing ${user.savedBooks.length} saved ${user.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {user.savedBooks?.map((book) => {
            console.log(book)
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book._id)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
