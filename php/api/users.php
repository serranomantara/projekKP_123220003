<?php
/**
 * Users API
 * 
 * Endpoint untuk manajemen users (Admin only)
 */

require_once '../config/database.php';

// Set headers untuk CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check admin authentication
function checkAdmin()
{
    if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
        jsonResponse(false, null, 'Unauthorized - Admin access required');
    }
}

// Get request method dan action
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Route berdasarkan action
switch ($action) {
    case 'getAll':
        getAllUsers();
        break;
    case 'getById':
        getUserById();
        break;
    case 'create':
        createUser();
        break;
    case 'update':
        updateUser();
        break;
    case 'delete':
        deleteUser();
        break;
    case 'changePassword':
        changePassword();
        break;
    case 'getActivityLogs':
        getActivityLogs();
        break;
    case 'getStats':
        getUserStats();
        break;
    default:
        jsonResponse(false, null, 'Invalid action');
}

/**
 * Get All Users
 */
function getAllUsers()
{
    checkAdmin();

    $db = getDB();

    $sql = "SELECT id, username, role, nama, email, created_at, updated_at 
            FROM users 
            ORDER BY id ASC";

    $users = $db->fetchAll($sql);

    jsonResponse(true, $users, 'Users retrieved successfully');
}

/**
 * Get User by ID
 */
function getUserById()
{
    checkAdmin();

    $id = $_GET['id'] ?? 0;

    if (!$id) {
        jsonResponse(false, null, 'ID is required');
    }

    $db = getDB();

    $sql = "SELECT id, username, role, nama, email, created_at, updated_at 
            FROM users 
            WHERE id = $id";

    $user = $db->fetchOne($sql);

    if ($user) {
        jsonResponse(true, $user, 'User retrieved successfully');
    } else {
        jsonResponse(false, null, 'User not found');
    }
}

/**
 * Create User
 */
function createUser()
{
    checkAdmin();

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    $role = $input['role'] ?? 'user';
    $nama = $input['nama'] ?? '';
    $email = $input['email'] ?? '';

    // Validasi
    if (empty($username) || empty($password) || empty($nama) || empty($email)) {
        jsonResponse(false, null, 'All fields are required');
    }

    // Validasi role
    if (!in_array($role, ['admin', 'user'])) {
        jsonResponse(false, null, 'Invalid role');
    }

    $db = getDB();

    // Check if username already exists
    $checkSql = "SELECT id FROM users WHERE username = '" . $db->escape($username) . "'";
    $exists = $db->fetchOne($checkSql);

    if ($exists) {
        jsonResponse(false, null, 'Username already exists');
    }

    // Hash password
    $passwordHash = md5($password);

    // Escape data
    $username = $db->escape($username);
    $nama = $db->escape($nama);
    $email = $db->escape($email);

    // Insert user
    $sql = "INSERT INTO users (username, password, role, nama, email) 
            VALUES ('$username', '$passwordHash', '$role', '$nama', '$email')";

    if ($db->query($sql)) {
        $newId = $db->lastInsertId();

        // Log activity
        logActivity($_SESSION['user_id'], 'CREATE_USER', 'users', $newId, "Created user: $username");

        // Get inserted data
        $sql = "SELECT id, username, role, nama, email, created_at FROM users WHERE id = $newId";
        $newUser = $db->fetchOne($sql);

        jsonResponse(true, $newUser, 'User created successfully');
    } else {
        jsonResponse(false, null, 'Failed to create user');
    }
}

/**
 * Update User
 */
function updateUser()
{
    checkAdmin();

    $id = $_GET['id'] ?? 0;

    if (!$id) {
        jsonResponse(false, null, 'ID is required');
    }

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $username = $input['username'] ?? '';
    $role = $input['role'] ?? '';
    $nama = $input['nama'] ?? '';
    $email = $input['email'] ?? '';

    // Validasi
    if (empty($username) || empty($nama) || empty($email)) {
        jsonResponse(false, null, 'Username, nama, and email are required');
    }

    // Validasi role
    if ($role && !in_array($role, ['admin', 'user'])) {
        jsonResponse(false, null, 'Invalid role');
    }

    $db = getDB();

    // Check if user exists
    $checkSql = "SELECT id FROM users WHERE id = $id";
    $exists = $db->fetchOne($checkSql);

    if (!$exists) {
        jsonResponse(false, null, 'User not found');
    }

    // Check if username is taken by another user
    $checkSql = "SELECT id FROM users WHERE username = '" . $db->escape($username) . "' AND id != $id";
    $usernameTaken = $db->fetchOne($checkSql);

    if ($usernameTaken) {
        jsonResponse(false, null, 'Username already taken');
    }

    // Escape data
    $username = $db->escape($username);
    $nama = $db->escape($nama);
    $email = $db->escape($email);

    // Update user
    $sql = "UPDATE users 
            SET username = '$username', 
                role = '$role', 
                nama = '$nama', 
                email = '$email',
                updated_at = NOW()
            WHERE id = $id";

    if ($db->query($sql)) {
        // Log activity
        logActivity($_SESSION['user_id'], 'UPDATE_USER', 'users', $id, "Updated user: $username");

        // Get updated data
        $sql = "SELECT id, username, role, nama, email, created_at, updated_at FROM users WHERE id = $id";
        $updatedUser = $db->fetchOne($sql);

        jsonResponse(true, $updatedUser, 'User updated successfully');
    } else {
        jsonResponse(false, null, 'Failed to update user');
    }
}

/**
 * Delete User
 */
function deleteUser()
{
    checkAdmin();

    $id = $_GET['id'] ?? 0;

    if (!$id) {
        jsonResponse(false, null, 'ID is required');
    }

    // Prevent deleting self
    if ($id == $_SESSION['user_id']) {
        jsonResponse(false, null, 'Cannot delete your own account');
    }

    $db = getDB();

    // Get user data before delete (for logging)
    $sql = "SELECT username FROM users WHERE id = $id";
    $user = $db->fetchOne($sql);

    if (!$user) {
        jsonResponse(false, null, 'User not found');
    }

    // Delete user
    $sql = "DELETE FROM users WHERE id = $id";

    if ($db->query($sql)) {
        // Log activity
        logActivity($_SESSION['user_id'], 'DELETE_USER', 'users', $id, "Deleted user: " . $user['username']);

        jsonResponse(true, null, 'User deleted successfully');
    } else {
        jsonResponse(false, null, 'Failed to delete user');
    }
}

/**
 * Change Password
 */
function changePassword()
{
    // User can change their own password, or admin can change any password
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(false, null, 'Unauthorized');
    }

    $id = $_GET['id'] ?? $_SESSION['user_id'];

    // Check if user is admin or changing their own password
    if ($id != $_SESSION['user_id'] && $_SESSION['role'] !== 'admin') {
        jsonResponse(false, null, 'Unauthorized - Can only change your own password');
    }

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $oldPassword = $input['old_password'] ?? '';
    $newPassword = $input['new_password'] ?? '';

    // Validasi
    if (empty($newPassword)) {
        jsonResponse(false, null, 'New password is required');
    }

    // If not admin, verify old password
    if ($_SESSION['role'] !== 'admin' && empty($oldPassword)) {
        jsonResponse(false, null, 'Old password is required');
    }

    $db = getDB();

    // Verify old password if not admin
    if ($_SESSION['role'] !== 'admin') {
        $oldPasswordHash = md5($oldPassword);
        $sql = "SELECT id FROM users WHERE id = $id AND password = '$oldPasswordHash'";
        $verify = $db->fetchOne($sql);

        if (!$verify) {
            jsonResponse(false, null, 'Old password is incorrect');
        }
    }

    // Hash new password
    $newPasswordHash = md5($newPassword);

    // Update password
    $sql = "UPDATE users SET password = '$newPasswordHash', updated_at = NOW() WHERE id = $id";

    if ($db->query($sql)) {
        // Log activity
        logActivity($_SESSION['user_id'], 'CHANGE_PASSWORD', 'users', $id, "Password changed");

        jsonResponse(true, null, 'Password changed successfully');
    } else {
        jsonResponse(false, null, 'Failed to change password');
    }
}

/**
 * Get Activity Logs
 */
function getActivityLogs()
{
    checkAdmin();

    $userId = $_GET['user_id'] ?? null;
    $limit = $_GET['limit'] ?? 100;

    $db = getDB();

    $sql = "SELECT al.*, u.username, u.nama 
            FROM activity_logs al 
            LEFT JOIN users u ON al.user_id = u.id ";

    if ($userId) {
        $sql .= "WHERE al.user_id = $userId ";
    }

    $sql .= "ORDER BY al.created_at DESC LIMIT $limit";

    $logs = $db->fetchAll($sql);

    jsonResponse(true, $logs, 'Activity logs retrieved successfully');
}

/**
 * Get User Statistics
 */
function getUserStats()
{
    checkAdmin();

    $db = getDB();

    // Total users
    $totalUsers = $db->fetchOne("SELECT COUNT(*) as total FROM users")['total'];

    // Total admin
    $totalAdmin = $db->fetchOne("SELECT COUNT(*) as total FROM users WHERE role = 'admin'")['total'];

    // Total regular users
    $totalRegularUsers = $db->fetchOne("SELECT COUNT(*) as total FROM users WHERE role = 'user'")['total'];

    // Active sessions (last 30 minutes)
    $activeSessions = $db->fetchOne("SELECT COUNT(*) as total FROM active_sessions WHERE TIMESTAMPDIFF(MINUTE, last_activity, NOW()) < 30")['total'];

    // Get user activity stats
    $userActivity = $db->fetchAll("SELECT * FROM v_user_activity_stats");

    $stats = [
        'total_users' => $totalUsers,
        'total_admin' => $totalAdmin,
        'total_regular_users' => $totalRegularUsers,
        'active_sessions' => $activeSessions,
        'user_activity' => $userActivity
    ];

    jsonResponse(true, $stats, 'User statistics retrieved successfully');
}
?>