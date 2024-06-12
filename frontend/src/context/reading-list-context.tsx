import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { IBook } from '../components/types/types';



interface ReadingListContextType {
  readingList: IBook[];
  addToReadingList: (item: IBook) => void;
  removeFromReadingList: (item: IBook) => void;
}

const ReadingListContext = createContext<ReadingListContextType | undefined>(undefined);

const ReadingListProvider = ({ children }:any) => {
  const [readingList, setReadingList] = useState<IBook[]>([]);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyWarning = (message: string) => toast.warn(message, {

  });

  const addToReadingList = (item: IBook) => {
    const isDuplicate = readingList.some((existingItem) => existingItem.title === item.title);
    if (!isDuplicate) {
      setReadingList((prevList) => [...prevList, item]);
      notifySuccess('Successfully added book to reading list')
    } else {
      notifyWarning('Book with the title already exists in the reading list.');
    }
  };

  const removeFromReadingList = (book: IBook) => {
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
