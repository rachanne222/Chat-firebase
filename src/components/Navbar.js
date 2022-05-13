import { Link } from "react-router-dom";


function Navbar(props) {
  return (
    <div>
      <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
        <a class="navbar-brand" href="/">
          Chat to Self
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
             
              <Link className={"nav-link"} to="/">
                Home
              </Link>
            </li>
            <li>
            <Link className={"nav-link"} to="login" >
              Login
            </Link>
            
            </li>
            <li>
            <Link className={"nav-link"} to="login" onClick={props.setLoginState(3)}>
              Logout
            </Link>
            
            </li>
          </ul>
          <span className="navbar-text">
           
          </span>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;

// import { Link } from "react-router-dom";


// function Navbar(props) {
//   return (
//     <div>
//       <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
      
//         <a class="navbar-brand" href="#">
//           Chat to Self
          
//         </a>
        
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarText"
//           aria-controls="navbarText"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarText">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <Link className={"nav-link"} to="/">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item active">
//               <Link onClick={props.setLoginState(3)} className={"nav-link"}  to="/logout">
//                 Logout
//               </Link>
//             </li>
//           </ul>
//           <span className="navbar-text">
            
//           </span>
//         </div>
//       </nav>
      
//     </div>
//   );
// }
// export default Navbar;