"use client"

import axios from 'axios';

export default  function LogoutButton(){
    const handleLogout = async () => {
        try {
          await axios.post('/api/logout');
          //if (res.data.success) {
            // Optionally redirect or reload page
          window.location.href = '/';
          //}
        } catch (err) {
          console.error('Logout failed:', err);
        }
    };

    return(
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    )
      
}
    

