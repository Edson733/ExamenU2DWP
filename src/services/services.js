
import axios from 'axios';

let url_book = 'http://localhost:8080/api/book';

const postBook = async (book) => {
    try {
       const response = await axios.post(url_book+"/add", book);
       return response.data;
    } catch (error) {
       console.log(error);
       throw error;
    }
 }
 const getBooks = async () => {
    try {
       const response = await axios.post(url_book+"/");
       return response.data;
    } catch (error) {
       throw error;
    }
 };

 const updateBook = async (book) => {
   try {
      console.log(book);
      const response = await axios.post(url+"/update", book);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
 }

 export default {
    getBooks,
    postBook,
    updateBook,
 };