import React from 'react';
import HomeFeed from './homeFeed'
const Sidebar = ()=>{

return(<>
    <div class="container-fluid" id = 'container'>
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-warning">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center  mb-md-0 me-md-auto text-white ">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li >
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                         <i class="bi bi-person-square"></i> <span class="ms-1 d-none d-sm-inline">My Profile</span> </a>
                     
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="bi bi-people-fill"></i> <span class="ms-1 d-none d-sm-inline">Friends</span> </a>
                     
                    </li>
                       <li>
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="bi bi-envelope-paper-fill"></i> <span class="ms-1 d-none d-sm-inline">Messages</span> </a>
                     
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="bi bi-globe-americas"></i> <span class="ms-1 d-none d-sm-inline">Climate Map</span></a>
                    </li>
                    <li>
                        <a  class="nav-link px-0 align-middle ">
                            <i class="bi bi-cloud-sun-fill"></i><span class="ms-1 d-none d-sm-inline">10-Day Report</span></a>
                       
                    </li>
                    <li>
                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Games</span> </a>
                        
                           
                    
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Group</span> </a>
                    </li>
                </ul>
              
              
            </div>
        </div>
        <div class="col py-3">
        
        </div>
    </div>
</div>

	</>)
}
export default Sidebar;