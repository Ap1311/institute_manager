const { homecontent, login_screen, admincontent, studentcontent , facultycontent , content404 } = require("./script/content");
const { profile } = require("./script/profile");
//-------------------------------------------Dependencies--------------------------------------------------------------//
const { exec } = require("child_process");
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

const app = express();
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/src", express.static(path.join(__dirname, "src"), {
  dotfiles: "deny",
  index: false,
  fallthrough: false
}));

//-------------------------------------------DB Config--------------------------------------------------------------//
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

async function getConnection() {
  return mysql.createConnection(dbConfig);
}

//-------------------------------------------Key Functions--------------------------------------------------------------//
function generateKey(length = 50) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
}

async function createUniqueKey() {
  const conn = await getConnection();
  let unique = false, newKey = "";

  while (!unique) {
    newKey = generateKey();
    const [rows] = await conn.execute("SELECT sk FROM userx WHERE sk = ? LIMIT 1", [newKey]);
    if (rows.length === 0) unique = true;
  }
  await conn.end();
  return newKey;
}

//-------------------------------------------Login and Security--------------------------------------------------------------//
async function login_check(req, res, next) {
  try {
    const sk = req.cookies.sk;
    if (!sk) {
      return res.redirect("/Login?msg=3");
    }

    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM userx WHERE sk = ?", [sk]);

    if (rows.length === 0) {
      await conn.end();
      return res.redirect("/Login?msg=1");
    }

    const user = rows[0];

    if (!user.id) {
      await conn.execute("DELETE FROM userx WHERE sk = ?", [sk]);
      await conn.end();
      return res.redirect("/Login?msg=2");
    }

    if (!user.rolex) {
      await conn.execute("UPDATE userx SET rolex='2' WHERE sk=? AND id=?", [sk, user.id]);
      user.rolex = "2";
    }

    req.user = user;
    await conn.end();
    return next();
  } catch (err) {
    console.error("Login check error:", err);
    if (!res.headersSent) {
      return res.status(500).send("Internal server error");
    }
  }
}

//-------------------------------------------Routes--------------------------------------------------------------//
app.get("/", async (req, res) => {
  return res.send(homecontent);
});

// Login Page
app.get("/Login", async (req, res) => {
  const sk = req.cookies.sk;
  if (sk) {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM userx WHERE sk = ?", [sk]);
    await conn.end();
    if (rows.length > 0) return res.redirect("/dashboard");
  }
  const msg = parseInt(req.query.msg) || 0;
  return login_screen(res, msg);
});

// Login POST
app.post("/loginx", async (req, res) => {
  const { id, pass } = req.body;
  const conn = await getConnection();

  const [rows] = await conn.execute("SELECT * FROM userx WHERE id = ? AND pass = ?", [id, pass]);

  if (rows.length === 0) {
    await conn.end();
    return res.redirect("/Login?msg=4");
  }

  const key = await createUniqueKey();
  await conn.execute("UPDATE userx SET sk=? WHERE id=?", [key, id]);
  await conn.end();

  res.cookie("sk", key, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "strict"
  });
  return res.redirect("/dashboard");
});

// Dashboard
app.get("/dashboard", login_check, (req, res) => {
  let content = "";

  switch (String(req.user.rolex)) {
    case "1": // Admin
      return admincontent(res, req.user);
    case "2": // Student
      return studentcontent(res, req.user);
      break;
    case "3": // Faculty
      return facultycontent(res, req.user);
      break;
    case "4": // Staff
      content = `<h3>Staff Dashboard</h3><a href="/attendance">Manage Attendance</a>`;
      break;
    case "5": // Club
      content = `<h3>Club Dashboard</h3><a href="/events">Manage Events</a>`;
      break;
    default:
      return res.redirect("/logout");
  }

  return res.send(`
    <html>
      <head><title>Dashboard</title></head>
      <body>
        <h2>Welcome, ${req.user.namex || "User"} (${req.user.id})</h2>
        <p>Email: ${req.user.email}</p>
        ${content}
        <p><a href="/logout">Logout</a></p>
      </body>
    </html>
  `);
});

// Logout
app.get("/logout", async (req, res) => {
  const sk = req.cookies.sk;
  const { m } = req.query; 
  if (sk) {
    const conn = await getConnection();
    await conn.execute("UPDATE userx SET sk=NULL WHERE sk=?", [sk]);
    await conn.end();
  }

  res.clearCookie("sk", { httpOnly: true, secure: false, sameSite: "strict" });
  if (m == 1) { // Use == because query parameters are strings
    return res.redirect("/Login?msg=6");
  }
  return res.redirect("/Login?msg=5");
});

/*
//-------------------------------------------Dashboard Functions--------------------------------------------------------------//
// Admin: View all users
app.get("/admin/users", login_check, async (req, res) => {
  if (String(req.user.rolex) !== "1") {
    return res.redirect("/dashboard");
  }

  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT id, namex, email, rolex, sk FROM userx");
    await conn.end();

    let html = `
      <html>
      <head><title>All Users</title></head>
      <body>
        <h2>All Registered Users</h2>
        <table border="1" cellpadding="5">
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Session Key</th></tr>
    `;

    rows.forEach(u => {
      html += `<tr>
        <td>${u.id}</td>
        <td>${u.namex}</td>
        <td>${u.email}</td>
        <td>${u.rolex}</td>
        <td>${u.sk || "-"}</td>
      </tr>`;
    });

    html += `</table><br><a href="/dashboard">Back to Dashboard</a></body></html>`;
    return res.send(html);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).send("Error fetching users");
  }
});

// Admin: Create new user (password defaults to ID)
app.post("/admin/create_user", login_check, async (req, res) => {
  if (String(req.user.rolex) !== "1") {
    return res.redirect("/dashboard");
  }

  const { id, namex, email, rolex } = req.body;
  if (!id || !namex || !email || !rolex) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const conn = await getConnection();
    await conn.execute(
      "INSERT INTO userx (id, namex, email, pass, rolex) VALUES (?, ?, ?, ?, ?)",
      [id, namex, email, id, rolex]
    );
    await conn.end();

    return res.send(`<p>User created successfully with default password = ID</p><a href="/admin/users">Back to Users</a>`);
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).send("Error creating user");
  }
});
*/

// --------------------------- Profile --------------------------- //

// View Profile
app.get("/profile", login_check, async (req, res) => {
  const m = req.query.m;
  return profile(res , req.user, m);
});

// Update Profile (name + email only)
app.post("/edit_profile", login_check, async (req, res) => {
  const sk = req.cookies.sk;
  const { namex , last_name , email } = req.body;

  try {
	if (namex=="" || last_name=="" || email=="")
	{
		return res.redirect("/profile?m=1");
	}
    const conn = await getConnection();
    await conn.execute("UPDATE userx SET namex=?, last_name=?, email=? WHERE sk=?", [namex, last_name, email, sk]);
    await conn.end();
	return res.redirect("/profile?m=2");
  } catch (err) {
    console.error("Profile update error:", err);
    return res.redirect("/404-NotFound");
  }
});

// Change Password
app.post("/change_password", login_check, async (req, res) => {
  const sk = req.cookies.sk;
  const { oldpass, newpass, confirmpass } = req.body;

  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT pass FROM userx WHERE sk=?", [sk]);

    if (rows.length === 0) {
      await conn.end();
      return res.redirect("/logout");
    }
	
    if (newpass !== confirmpass) {
      await conn.end();
      return res.redirect("/profile?m=4");
    }

    if (rows[0].pass !== oldpass) {
      await conn.end();
      return res.redirect("/profile?m=3");
    }

    await conn.execute("UPDATE userx SET pass=? WHERE sk=?", [newpass, sk]);
    await conn.end();

    return res.redirect("/logout?m=1");
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).send("Error changing password");
  }
});



//-------------------------------------------404 Handler--------------------------------------------------------------//
app.get("/404-NotFound", (req, res) => {
  return res.status(404).send(content404);
});

app.use((req, res) => {
  return res.redirect("/404-NotFound");
});

//-------------------------------------------Start Server--------------------------------------------------------------//
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started http://127.0.0.1:${PORT}`);
  exec(`start http://127.0.0.1:${PORT}`);
});
