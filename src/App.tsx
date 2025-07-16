import { AppProvider } from '@/contexts/AppContext';
import { UserProvider } from '@/contexts/UserContext';
import Router from '@/router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <UserProvider>
          <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto p-6">
              <Router />
            </main>
          </div>
        </UserProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
