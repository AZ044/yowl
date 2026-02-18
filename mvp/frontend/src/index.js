import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from 'react-dom/client';
import App from './page/homepage/App'; 
import ThreadList from './page/thread_list/threadlist'
import ThreadView from "./page/thread_list/threadview";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}></Route>
    <Route path="/threadlist" element={<ThreadList />}></Route>
    <Route path="/threadview" element={<ThreadView />}></Route>
  </Routes>
  </BrowserRouter>
);
