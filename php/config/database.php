<?php
/**
 * Database Configuration File
 * 
 * File ini berisi konfigurasi koneksi database MySQL
 * Sesuaikan dengan konfigurasi phpMyAdmin Anda
 */

// Konfigurasi Database
define('DB_HOST', 'localhost');      // Host database (biasanya localhost)
define('DB_USER', 'root');           // Username database (default: root)
define('DB_PASS', '');               // Password database (kosongkan jika tidak ada password)
define('DB_NAME', 'wukirsari_db');   // Nama database

// Konfigurasi Timezone
date_default_timezone_set('Asia/Jakarta');

// Konfigurasi Session
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 0); // Set ke 1 jika menggunakan HTTPS
session_start();

/**
 * Class Database
 * Menangani koneksi dan operasi database
 */
class Database
{
    private $host = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $dbname = DB_NAME;

    public $conn;
    public $error;

    /**
     * Constructor - Membuat koneksi database
     */
    public function __construct()
    {
        $this->conn = null;

        try {
            // Membuat koneksi MySQLi
            $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->dbname);

            // Check koneksi
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }

            // Set charset ke UTF-8
            $this->conn->set_charset("utf8mb4");

        } catch (Exception $e) {
            $this->error = $e->getMessage();
            error_log("Database Connection Error: " . $e->getMessage());
        }
    }

    /**
     * Get Connection
     * @return mysqli|null
     */
    public function getConnection()
    {
        return $this->conn;
    }

    /**
     * Escape String untuk mencegah SQL Injection
     * @param string $string
     * @return string
     */
    public function escape($string)
    {
        if ($this->conn) {
            return $this->conn->real_escape_string($string);
        }
        return $string;
    }

    /**
     * Execute Query
     * @param string $sql
     * @return mysqli_result|bool
     */
    public function query($sql)
    {
        if ($this->conn) {
            return $this->conn->query($sql);
        }
        return false;
    }

    /**
     * Fetch single row
     * @param string $sql
     * @return array|null
     */
    public function fetchOne($sql)
    {
        $result = $this->query($sql);
        if ($result && $result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }

    /**
     * Fetch all rows
     * @param string $sql
     * @return array
     */
    public function fetchAll($sql)
    {
        $result = $this->query($sql);
        $data = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    /**
     * Get last insert ID
     * @return int
     */
    public function lastInsertId()
    {
        return $this->conn->insert_id;
    }

    /**
     * Get affected rows
     * @return int
     */
    public function affectedRows()
    {
        return $this->conn->affected_rows;
    }

    /**
     * Begin Transaction
     */
    public function beginTransaction()
    {
        $this->conn->begin_transaction();
    }

    /**
     * Commit Transaction
     */
    public function commit()
    {
        $this->conn->commit();
    }

    /**
     * Rollback Transaction
     */
    public function rollback()
    {
        $this->conn->rollback();
    }

    /**
     * Close Connection
     */
    public function close()
    {
        if ($this->conn) {
            $this->conn->close();
        }
    }

    /**
     * Destructor
     */
    public function __destruct()
    {
        $this->close();
    }
}

/**
 * Helper function untuk mendapatkan instance database
 * @return Database
 */
function getDB()
{
    return new Database();
}

/**
 * Helper function untuk response JSON
 * @param bool $success
 * @param mixed $data
 * @param string $message
 */
function jsonResponse($success, $data = null, $message = '')
{
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Helper function untuk log aktivitas
 * @param int $userId
 * @param string $action
 * @param string $tableName
 * @param int $recordId
 * @param string $details
 */
function logActivity($userId, $action, $tableName = null, $recordId = null, $details = null)
{
    $db = getDB();
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;

    $sql = "INSERT INTO activity_logs (user_id, action, table_name, record_id, details, ip_address) 
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $db->conn->prepare($sql);
    $stmt->bind_param("ississ", $userId, $action, $tableName, $recordId, $details, $ipAddress);
    $stmt->execute();
    $stmt->close();
}

/**
 * Helper function untuk get client IP
 * @return string
 */
function getClientIP()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if (isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

/**
 * Test koneksi database
 */
function testConnection()
{
    $db = new Database();
    if ($db->conn) {
        return true;
    }
    return false;
}
?>