import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useQuery } from '@apollo/client';
import BooksView from './components/all-books'
import SearchBar from './components/search'
import { GET_ITEMS } from './utils/queries';
import theme from './utils/theme';
import { ReadingListProvider } from './context/reading-list-context';
import Navbar from './components/common/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReadingListView from './components/reading-list';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const searchTerm = 'Some'
  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { searchTerm },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ReadingListProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<><SearchBar data={data.books} />
                <BooksView data={data.books} /></>}
            />
            <Route
              path="/reading-list"
              element={<ReadingListView />}
            />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </ReadingListProvider>
  );
}

export default App;
