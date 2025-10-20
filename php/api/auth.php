<?php
/**
 * Authentication API
 * 
 * Endpoint untuk login, logout, dan session management
 */

require_once '../config/database.php';

// Set headers untuk CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Route berdasarkan action
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        checkSession();
        break;
    case 'getCurrentUser':
        getCurrentUser();
        break;
    case 'getActiveUsers':
        getActiveUsers();
        break;
    default:
        jsonResponse(false, null, 'Invalid action');
}

/**
 * Handle Login
 */
function handleLogin()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(false, null, 'Method not allowed');
    }

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($username) || empty($password)) {
        jsonResponse(false, null, 'Username dan password harus diisi');
    }

    $db = getDB();

    // Escape input
    $username = $db->escape($username);

    // Hash password dengan MD5 (sesuai dengan database)
    $passwordHash = md5($password);

    // Query user
    $sql = "SELECT id, username, role, nama, email, created_at 
            FROM users 
            WHERE username = '$username' AND password = '$passwordHash'";

    $user = $db->fetchOne($sql);

    if ($user) {
        // Generate session token
        $sessionToken = bin2hex(random_bytes(32));
        $ipAddress = getClientIP();
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

        // Save session ke database
        $sql = "INSERT INTO active_sessions (user_id, session_token, ip_address, user_agent) 
                VALUES (?, ?, ?, ?)";
        $stmt = $db->conn->prepare($sql);
        $stmt->bind_param("isss", $user['id'], $sessionToken, $ipAddress, $userAgent);
        $stmt->execute();

        // Save session ke PHP session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['nama'] = $user['nama'];
        $_SESSION['session_token'] = $sessionToken;
        $_SESSION['login_time'] = date('Y-m-d H:i:s');

        // Log activity
        logActivity($user['id'], 'LOGIN', null, null, 'User logged in');

        // Return user data
        jsonResponse(true, [
            'id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role'],
            'nama' => $user['nama'],
            'email' => $user['email'],
            'session_token' => $sessionToken,
            'login_time' => $_SESSION['login_time']
        ], 'Login berhasil');

    } else {
        jsonResponse(false, null, 'Username atau password salah');
    }
}

/**
 * Handle Logout
 */
function handleLogout()
{
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(false, null, 'Tidak ada session aktif');
    }

    $db = getDB();
    $userId = $_SESSION['user_id'];
    $sessionToken = $_SESSION['session_token'] ?? '';

    // Delete session dari database
    if ($sessionToken) {
        $sql = "DELETE FROM active_sessions WHERE session_token = ?";
        $stmt = $db->conn->prepare($sql);
        $stmt->bind_param("s", $sessionToken);
        $stmt->execute();
    }

    // Log activity
    logActivity($userId, 'LOGOUT', null, null, 'User logged out');

    // Destroy PHP session
    session_destroy();

    jsonResponse(true, null, 'Logout berhasil');
}

/**
 * Check Session
 */
function checkSession()
{
    if (isset($_SESSION['user_id'])) {
        $db = getDB();

        // Update last activity
        $sessionToken = $_SESSION['session_token'] ?? '';
        if ($sessionToken) {
            $sql = "UPDATE active_sessions SET last_activity = NOW() WHERE session_token = ?";
            $stmt = $db->conn->prepare($sql);
            $stmt->bind_param("s", $sessionToken);
            $stmt->execute();
        }

        jsonResponse(true, [
            'logged_in' => true,
            'user_id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'role' => $_SESSION['role'],
            'nama' => $_SESSION['nama']
        ], 'Session aktif');
    } else {
        jsonResponse(true, [
            'logged_in' => false
        ], 'Tidak ada session');
    }
}

/**
 * Get Current User
 */
function getCurrentUser()
{
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(false, null, 'Unauthorized');
    }

    $db = getDB();
    $userId = $_SESSION['user_id'];

    $sql = "SELECT id, username, role, nama, email, created_at FROM users WHERE id = $userId";
    $user = $db->fetchOne($sql);

    if ($user) {
        $user['login_time'] = $_SESSION['login_time'] ?? null;
        jsonResponse(true, $user, 'User data retrieved');
    } else {
        jsonResponse(false, null, 'User not found');
    }
}

/**
 * Get Active Users (Admin only)
 */
function getActiveUsers()
{
    if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
        jsonResponse(false, null, 'Unauthorized - Admin only');
    }

    $db = getDB();

    $sql = "SELECT * FROM v_active_users ORDER BY last_activity DESC";
    $users = $db->fetchAll($sql);

    jsonResponse(true, $users, 'Active users retrieved');
}
?>