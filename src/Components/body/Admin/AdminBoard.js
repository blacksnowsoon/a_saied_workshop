import { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";


const AdminBoard = ({ user, products, categories })=> {

  const [auth, setAuth] = useState(user);

  function checkUser(user) {
      user === 'blacksnow' ? setAuth(true) : setAuth(false);
    }

  return auth ? <Dashboard user={user} products={products} categories={categories}/> : <Login checkUser={checkUser} />
    
}



export default AdminBoard;