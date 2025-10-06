//home content
const homecontent=
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Institute Manager</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="src/home.css" rel="stylesheet">
</head>
<body>

  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/">Institute Management System</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="/About">About</a></li>
          <li class="nav-item"><a class="nav-link" href="/Contact">Contact</a></li>
          <li class="nav-item"><a class="nav-link" href="/Login">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="hero text-center py-5 flex-grow-1">
    <div class="container">
      <h1 class="fw-bold mb-3">Welcome to the Secure Student Portal</h1>
      <p class="lead text-muted mb-4">
        Access your academic resources, track progress, explore new learning opportunities, 
        and stay connected with your institution – all in one secure place.
      </p>
      <a href="/Login" class="btn btn-gradient px-4 py-2">Get Started</a>
    </div>
  </section>

  <footer class="text-center py-3">
    Powered by Aarav Programmers | © 2025 Institute Manager
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;

//login content
function login_screen(res, code = 0) {
  const messages = {
    1: "Session expired, please login again",
    2: "Improper user removed, please login again",
    3: "Please login first",
    4: "Invalid username or password",
    5: "Logged out successfully",
	6: "Password Changed Successfully"
  };

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Secure Institute Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="src/login.css">
  </head>
  <body>
    <div class="login-card text-center">
	  <a href="/" class="back-btn"><img src="src/back.svg" alt="Back" class="back-icon"></a>
      <h2>Secure Institute Login</h2>
      <p class="ai-badge">Powered by Aarav Programmers</p>
      ${messages[code] ? `<p class="text-danger">${messages[code]}</p>` : ""}
      <form action="/loginx" method="POST">
        <div class="mb-3">
          <input type="number" class="form-control" placeholder="User ID" name="id" required>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" placeholder="Password" name="pass" required>
        </div>
        <div class="mb-3 text-end">
          <a href="/forget_password" class="forgot-link">Forgot Password?</a>
        </div>
        <button type="submit" class="btn btn-login w-100">Login</button>
      </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `);
}

//admin content
function admincontent(res,user){
return res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="src/dashboard.css" rel="stylesheet">
</head>
<body>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Admin Panel</h5>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <ul class="nav flex-column">
			    <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/view_students">📘 View Students</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/view_faculty">👨‍🏫 View Faculty</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/new_user">➕ Create New User</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/custom_msg">💬 Create Custom Message</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/create_class">🏫 Create Class/Batch</a></li>
                <li class="nav-item"><a class="nav-link" href="/admin/assign_faculty">📌 Assign Faculty</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                <a href="/logout" class="btn btn-logout w-100">Logout</a>
            </div>
        </div>
    </div>

    <div class="page-wrapper">
        <nav class="top-navbar d-flex align-items-center">
            <div class="d-flex align-items-center navbar-toggle-content">
                <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    ☰
                </button>
                <span class="navbar-brand">Admin Panel</span>
            </div>
        </nav>

        <main class="main-content">
            <h1 class="mb-4 gradient-text">Welcome to Admin Panel</h1>
            
            <div class="card info-card mb-4">
                <div class="card-body">
                    <h2>Welcome, ${user.namex} (${user.id})</h2>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            
            <div class="card info-card">
                 <div class="card-body">
                    <h3 class="h5 mb-2 fw-600">Dashboard Overview</h3>
                    <p>Select an option from the sidebar to manage the system. On smaller screens, use the menu button in the top left to open the navigation.</p>
                </div>
            </div>
        </main>
    </div>

    <a href="/logout" class="btn fixed-logout-btn">Logout</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const sidebar = document.getElementById('offcanvasSidebar');
        const wrapper = document.querySelector('.page-wrapper');

        sidebar.addEventListener('show.bs.offcanvas', () => {
            wrapper.classList.add('toggled');
        });

        sidebar.addEventListener('hide.bs.offcanvas', () => {
            wrapper.classList.remove('toggled');
        });
    </script>
</body>
</html>
`);
}
//Student Content
function studentcontent(res,user){
return res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="src/dashboard.css" rel="stylesheet">
</head>
<body>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Student Dashboard</h5>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <ul class="nav flex-column">
				<li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="/student/reasult">📊 My Results</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/rechecking">🔍 Recheck Access</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/assignments">📝 Assignments</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/class">🎓 Class</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/certificates">📜 Certificates</a></li>
				<li class="nav-item"><a class="nav-link" href="/student/evant-registration">🗓️ Event Registration</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                <a href="/logout" class="btn btn-logout w-100">Logout</a>
            </div>
        </div>
    </div>

    <div class="page-wrapper">
        <nav class="top-navbar d-flex align-items-center">
            <div class="d-flex align-items-center navbar-toggle-content">
                <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    ☰
                </button>
                <span class="navbar-brand">Student Dashboard</span>
            </div>
        </nav>

        <main class="main-content">
            <h1 class="mb-4 gradient-text">Welcome to Student Dashboard</h1>
            
            <div class="card info-card mb-4">
                <div class="card-body">
                    <h2>Welcome, ${user.namex} (${user.id})</h2>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            
            <div class="card info-card">
                 <div class="card-body">
                    <h3 class="h5 mb-2 fw-600">Dashboard Overview</h3>
                    <p>Select an option from the sidebar to manage the system. On smaller screens, use the menu button in the top left to open the navigation.</p>
                </div>
            </div>
        </main>
    </div>

    <a href="/logout" class="btn fixed-logout-btn">Logout</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const sidebar = document.getElementById('offcanvasSidebar');
        const wrapper = document.querySelector('.page-wrapper');

        sidebar.addEventListener('show.bs.offcanvas', () => {
            wrapper.classList.add('toggled');
        });

        sidebar.addEventListener('hide.bs.offcanvas', () => {
            wrapper.classList.remove('toggled');
        });
    </script>
</body>
</html>
`);
}

//Faculty Content
function facultycontent(res,user){
return res.send(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Faculty Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link href="src/dashboard.css" rel="stylesheet">
</head>
<body>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <h5 class="offcanvas-title gradient-text" id="offcanvasSidebarLabel">Faculty Dashboard</h5>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <ul class="nav flex-column">
			   <li class="nav-item"><a class="nav-link" href="/dashboard">📅 Dashboard</a></li>
               <li class="nav-item"><a class="nav-link" href="/faculty/reasult">👩‍🏫 My Class</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/rechecking">📂 My Assignments</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/assignments">📝 Assignments</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/class">✍️ Marks Entry</a></li>
			   <li class="nav-item"><a class="nav-link" href="/faculty/certificates">📅 Time Table</a></li>
            </ul>
            <div class="sidebar-footer">
                <a href="/profile" class="btn btn-profile w-100 mb-2">Profile</a>
                <a href="/logout" class="btn btn-logout w-100">Logout</a>
            </div>
        </div>
    </div>

    <div class="page-wrapper">
        <nav class="top-navbar d-flex align-items-center">
            <div class="d-flex align-items-center navbar-toggle-content">
                <button class="menu-btn me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                    ☰
                </button>
                <span class="navbar-brand">Faculty Dashboard</span>
            </div>
        </nav>

        <main class="main-content">
            <h1 class="mb-4 gradient-text">Welcome to Faculty Dashboard</h1>
            
            <div class="card info-card mb-4">
                <div class="card-body">
                    <h2>Welcome, ${user.namex} (${user.id})</h2>
                    <p>Email: ${user.email}</p>
                </div>
            </div>
            
            <div class="card info-card">
                 <div class="card-body">
                    <h3 class="h5 mb-2 fw-600">Dashboard Overview</h3>
                    <p>Select an option from the sidebar to manage the system. On smaller screens, use the menu button in the top left to open the navigation.</p>
                </div>
            </div>
        </main>
    </div>

    <a href="/logout" class="btn fixed-logout-btn">Logout</a>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const sidebar = document.getElementById('offcanvasSidebar');
        const wrapper = document.querySelector('.page-wrapper');

        sidebar.addEventListener('show.bs.offcanvas', () => {
            wrapper.classList.add('toggled');
        });

        sidebar.addEventListener('hide.bs.offcanvas', () => {
            wrapper.classList.remove('toggled');
        });
    </script>
</body>
</html>
`);
}


//404 content
const content404 =
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 - Page Not Found</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="src/home.css" rel="stylesheet">
</head>
<body>

  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/">Institute Management System</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="/About">About</a></li>
          <li class="nav-item"><a class="nav-link" href="/Contact">Contact</a></li>
		  <li class="nav-item"><a class="nav-link" href="/Login">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <section class="hero text-center py-5 flex-grow-1 d-flex align-items-center">
    <div class="container">
      <h1 class="fw-bold mb-3 display-1">404</h1>
      <h2 class="mb-3">Page Not Found</h2>
      <p class="lead text-muted mb-4">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <a href="/" class="btn btn-gradient px-4 py-2">Go Back Home</a>
    </div>
  </section>

  <footer class="text-center py-3">
    Powered by Aarav Programmers | © 2025 Institute Manager
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;
module.exports = { homecontent , login_screen , admincontent , studentcontent , facultycontent , content404 };