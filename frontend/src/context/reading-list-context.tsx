import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
}

interface ReadingListContextType {
  readingList: Book[];
  addToReadingList: (item: Book) => void;
  removeFromReadingList: (item: Book) => void;
}

const ReadingListContext = createContext<ReadingListContextType | undefined>(undefined);

const ReadingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [readingList, setReadingList] = useState<Book[]>([]);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyWarning = (message: string) => toast.warn(message, {

  });

  const addToReadingList = (item: Book) => {
    const isDuplicate = readingList.some((existingItem) => existingItem.title === item.title);
    if (!isDuplicate) {
      setReadingList((prevList) => [...prevList, item]);
      notifySuccess('Successfully added book to reading list')
    } else {
      notifyWarning('Book with the title already exists in the reading list.');
    }
  };

  const removeFromReadingList = (book: Book) => {
    setReadingList((prevList) => prevList.filter((item) => item.title !== book.title));
    notifySuccess('removed from reading list')
  };


  return (
    <ReadingListContext.Provider value={{ readingList, addToReadingList, removeFromReadingList }}>
      {children}
    </ReadingListContext.Provider>
  );
};

const useReadingList = () => {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error('useReadingList must be used within a ReadingListProvider');
  }
  return context;
};

export { ReadingListProvider, useReadingList };
