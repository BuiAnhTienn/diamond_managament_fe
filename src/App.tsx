import AuthContextProvider from '@contexts/AuthContext';
import RouteContainer from '@routes/RouteContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouteContainer />
          <ToastContainer />
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
