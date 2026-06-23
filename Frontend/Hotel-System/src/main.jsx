import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Route } from 'react-router';
import Home from './Components/Home.jsx';
import Contact from './Components/Contact.jsx';
import Rooms from './Components/Rooms.jsx';
import Halls from './Components/Halls.jsx';
import Gallery from './Components/Gallery.jsx';
import Book from './Components/Book.jsx';
import AdminDashboard from './Components/AdminDashboard.jsx';
import ManageRooms from './Components/ManageRooms.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="rooms" element={<Rooms />} />
      <Route path="halls" element={<Halls />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="book" element={<Book />} />
      <Route path="/admin/managerooms" element={<ManageRooms />} />
      <Route path="admin" element={<AdminDashboard />} />
    </Route>
  )
);
  


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
