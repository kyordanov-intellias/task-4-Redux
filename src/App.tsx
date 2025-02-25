import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/templates/Layout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(
  () => import("./pages/MovieDetails/MovieDetailsPage")
);
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const CreateMoviePage = lazy(
  () => import("./pages/CreateMoviePage/CreateMovie")
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-movie" element={<CreateMoviePage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
