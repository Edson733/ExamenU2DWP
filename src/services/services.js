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

const deleteBook = async (id) => {
   try {
      console.log(id);
      const response = await axios.post(url_book+"/delete", id);
      console.log(response.data);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBooksByAutor = async (autor) => {
   try {
      const response = await axios.get(API_URL+"/autor", autor);
      return response.data;
   } catch (error) {
      throw error;
   }
}

const getBooksByFecha = async () => {
   try {
      const response = await axios.get(API_URL+"/dateDesc");
      return response.data;
   } catch (error) {
      throw error;
   }
}

export default {
   getBooks,
   postBook,
   updateBook,
   deleteBook,
   getBooksByAutor,
   getBooksByFecha
};