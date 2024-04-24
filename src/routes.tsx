import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Pets } from "./pages/Pets/Pets";
import { PetDetails } from "./pages/PetDetails/PetDetails";
import { Shelter } from "./pages/Admin/Shelter/Shelter";
import { PetList } from "./pages/Admin/PetList";
import { PetForm } from "./pages/Admin/PetForm";
import { AuthHOC } from "./components/common/AuthHOC";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />
    },
    {

      path: '/admin',
      children: [
        {
          index: true,
          element: <Shelter />
        },
        {
          path: '/admin/pets',
          element: <AuthHOC />,
          children: [
            {
              index: true,
              element: <PetList />
            },
            {
              path: '/admin/pets/:id',
              element: <PetForm />
            },
          ]
        },
      ]
    },
    {
      path: '/pets',
      children: [
        {
          index: true,
          element: <Pets />
        },
        {
          path: '/pets/:id',
          element: <PetDetails />
        },
      ]
    },    
  ]
)

export default router;