//Profile
function profile(res, user ,m=0) {
  
  if (m==1){msg='Changes Faild: Empty Input!'}
  else if (m==2){msg='Changes Saved Successfully'}
  else if (m==3){msg='Password Changes faild: Password mismatch'}
  else if (m==4){msg='Password Change Failed: New passwords do not match!'}
  else {msg=''}
	const content=`
	<main class="main-content">
    <h1 class="mb-4 gradient-text">Profile</h1>

    <div class="text-center mb-4">
        <img src="src/user.png" alt="User Profile" class="profile-picture mb-2">
        <p>${user.id}</p>
		<p class="text-danger">${msg}</p>
    </div>

    <div class="card info-card mb-4">
        <div class="card-body">
            <h3 class="h5 mb-3 fw-bold">Edit Profile</h3>
            <form action="/edit_profile" method="POST">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="namex" name="namex" value="${user.namex}" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="last_name" name="last_name" value="${user.last_name}" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" value="${user.email}" required>
                </div>
                <button type="submit" class="btn btn-profile w-100">Save Changes</button>
            </form>
        </div>
    </div>
    
    <div class="card info-card">
        <div class="card-body">
            <h3 class="h5 mb-3 fw-bold">Change Password</h3>
            <form action="/change_password" method="POST">
                <div class="mb-3">
                    <label for="oldPassword" class="form-label">Old Password</label>
                    <input type="password" class="form-control" id="oldpass" name="oldpass" required>
                </div>
                <div class="mb-3">
                    <label for="newPassword" class="form-label">New Password</label>
                    <input type="password" class="form-control" id="newpass" name="newpass" required>
                </div>
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm New Password</label>
                    <input type="password" class="form-control" id="confirmpass" name="confirmpass" required>
                </div>
                <button type="submit" class="btn btn-profile w-100">Change Password</button>
            </form>
        </div>
    </div>
</main>
`
  switch (String(user.rolex)) {
    case "1": // Admin
      return res.send(`
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
		${content}
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
    case "2": // Student
      return res.send(`
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
		${content}
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
      break;
    case "3": // Faculty
      return res.send(`
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
		${content}
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
      break;
    case "4": // Staff
      return res.send(content)
      break;
    case "5": // Club
      return res.send(content)
      break;
    default:
      return res.redirect("/logout");
  }
}

module.exports = { profile };