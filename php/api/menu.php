<?php
/**
 * CRUD API for Menu Items
 * 
 * Endpoint untuk operasi CRUD pada menu items
 * Mendukung semua tipe menu: sekretariat, tatalaksana, danarta, pangripta, jagabaya, uluulu, kamituwa, ppid
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

// Get request method dan action
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$menuType = $_GET['menu_type'] ?? '';

// Validasi menu type
$validMenuTypes = ['sekretariat', 'tatalaksana', 'danarta', 'pangripta', 'jagabaya', 'uluulu', 'kamituwa', 'ppid'];

if ($menuType && !in_array($menuType, $validMenuTypes)) {
    jsonResponse(false, null, 'Invalid menu type');
}

// Route berdasarkan action
switch ($action) {
    case 'getAll':
        getAllMenuItems($menuType);
        break;
    case 'getById':
        getMenuItemById($menuType);
        break;
    case 'create':
        createMenuItem($menuType);
        break;
    case 'update':
        updateMenuItem($menuType);
        break;
    case 'delete':
        deleteMenuItem($menuType);
        break;
    default:
        jsonResponse(false, null, 'Invalid action');
}

/**
 * Get All Menu Items
 */
function getAllMenuItems($menuType)
{
    if (empty($menuType)) {
        jsonResponse(false, null, 'Menu type is required');
    }

    $db = getDB();

    $sql = "SELECT m.*, u.nama as creator_name, u.username as creator_username 
            FROM menu_$menuType m 
            LEFT JOIN users u ON m.created_by = u.id 
            ORDER BY m.id ASC";

    $items = $db->fetchAll($sql);

    jsonResponse(true, $items, 'Menu items retrieved successfully');
}

/**
 * Get Menu Item by ID
 */
function getMenuItemById($menuType)
{
    if (empty($menuType)) {
        jsonResponse(false, null, 'Menu type is required');
    }

    $id = $_GET['id'] ?? 0;

    if (!$id) {
        jsonResponse(false, null, 'ID is required');
    }

    $db = getDB();

    $sql = "SELECT m.*, u.nama as creator_name, u.username as creator_username 
            FROM menu_$menuType m 
            LEFT JOIN users u ON m.created_by = u.id 
            WHERE m.id = $id";

    $item = $db->fetchOne($sql);

    if ($item) {
        jsonResponse(true, $item, 'Menu item retrieved successfully');
    } else {
        jsonResponse(false, null, 'Menu item not found');
    }
}

/**
 * Create Menu Item
 */
function createMenuItem($menuType)
{
    if (empty($menuType)) {
        jsonResponse(false, null, 'Menu type is required');
    }

    // Check authentication
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(false, null, 'Unauthorized - Please login');
    }

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $url = $input['url'] ?? '';
    $icon = $input['icon'] ?? '📄';
    $createdBy = $_SESSION['user_id'];

    // Validasi
    if (empty($title)) {
        jsonResponse(false, null, 'Title is required');
    }

    $db = getDB();

    // Escape data
    $title = $db->escape($title);
    $description = $db->escape($description);
    $url = $db->escape($url);
    $icon = $db->escape($icon);

    // Insert data
    $sql = "INSERT INTO menu_$menuType (title, description, url, icon, created_by) 
            VALUES ('$title', '$description', '$url', '$icon', $createdBy)";

    if ($db->query($sql)) {
        $newId = $db->lastInsertId();

        // Log activity
        logActivity($createdBy, 'CREATE', "menu_$menuType", $newId, "Created: $title");

        // Get inserted data
        $sql = "SELECT * FROM menu_$menuType WHERE id = $newId";
        $newItem = $db->fetchOne($sql);

        jsonResponse(true, $newItem, 'Menu item created successfully');
    } else {
        jsonResponse(false, null, 'Failed to create menu item');
    }
}

/**
 * Update Menu Item
 */
function updateMenuItem($menuType)
{
    if (empty($menuType)) {
        jsonResponse(false, null, 'Menu type is required');
    }

    // Check authentication
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(false, null, 'Unauthorized - Please login');
    }

    $id = $_GET['id'] ?? 0;

    if (!$id) {
        jsonResponse(false, null, 'ID is required');
    }

    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);

    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $url = $input['url'] ?? '';
    $icon = $input['icon'] ?? '📄';

    // Validasi
    if (empty($title)) {
        jsonResponse(false, null, 'Title is required');
    }

    $db = getDB();

    // Check if item exists
    $checkSql = "SELECT id FROM menu_$menuType WHERE id = $id";
    $exists = $db->fetchOne($checkSql);

    if (!$exists) {
        jsonResponse(false, null, 'Menu item not found');
    }

    // Escape data
    $title = $db->escape($title);
    $description = $db->escape($description);
    $url = $db->escape($url);
    $icon = $db->escape($icon);

    // Update data
    $sql = "UPDATE menu_$menuType 
            SET title = '$title', 
                description = '$description', 
                url = '$url', 
                icon = '$icon',
                updated_at = NOW()
            WHERE id = $id";

    if ($db->query($sql)) {
        // Log activity
        logActivity($_SESSION['user_id'], 'UPDATE', "menu_$menuType", $id, "Updated: $title");

        // Get updated data
        $sql = "SELECT * FROM menu_$menuType WHERE id = $id";
        $updatedItem = $db->fetchOne($sql);

        jsonResponse(true, $updatedItem, 'Menu item updated successfully');
    } else {
        jsonResponse(false, null, 'Failed to update menu item');
    }
}

/**
 * Delete Menu Item
 */
function deleteMenuItem($menuType)
{
    if (empty($menuType)) {
        jsonResponse(false, null, 'Menu type is required');
    }

    // Check authentication
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(false, null, 'Unauthorized - Please login');
    }

    $id = $_GET['id'] ?? 0;

    if (!$id) {
        jsonResponse(false, null, 'ID is required');
    }

    $db = getDB();

    // Get item data before delete (for logging)
    $sql = "SELECT title FROM menu_$menuType WHERE id = $id";
    $item = $db->fetchOne($sql);

    if (!$item) {
        jsonResponse(false, null, 'Menu item not found');
    }

    // Delete item
    $sql = "DELETE FROM menu_$menuType WHERE id = $id";

    if ($db->query($sql)) {
        // Log activity
        logActivity($_SESSION['user_id'], 'DELETE', "menu_$menuType", $id, "Deleted: " . $item['title']);

        jsonResponse(true, null, 'Menu item deleted successfully');
    } else {
        jsonResponse(false, null, 'Failed to delete menu item');
    }
}
?>