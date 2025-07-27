import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './context/ContextProvider.jsx';
import { LoaderProvider } from './context/LoaderContext.jsx';

createRoot(document.getElementById('root')).render(
   
    <LoaderProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </LoaderProvider>,
)

window.addEventListener('load', () => {
  const init = document.getElementById('initial-loader');
  init?.remove();
});