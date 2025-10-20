<?php
/**
 * Test Connection File
 * Gunakan file ini untuk test koneksi database
 */

require_once 'config/database.php';

?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Database Connection</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 600px;
            width: 100%;
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
            font-size: 28px;
        }

        .status-box {
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .success {
            background: #d4edda;
            border: 2px solid #28a745;
            color: #155724;
        }

        .error {
            background: #f8d7da;
            border: 2px solid #dc3545;
            color: #721c24;
        }

        .icon {
            font-size: 40px;
        }

        .message {
            flex: 1;
        }

        .message h3 {
            margin-bottom: 5px;
            font-size: 18px;
        }

        .info-box {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #dee2e6;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: #666;
        }

        .info-value {
            color: #333;
            font-family: monospace;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            transition: transform 0.3s;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }

        .btn:hover {
            transform: translateY(-2px);
        }

        .btn-container {
            text-align: center;
            margin-top: 30px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }

        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #666;
        }

        .badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }

        .badge-success {
            background: #28a745;
            color: white;
        }

        .badge-info {
            background: #17a2b8;
            color: white;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🔌 Database Connection Test</h1>

        <?php
        $db = new Database();

        if ($db->conn) {
            echo '<div class="status-box success">';
            echo '<div class="icon">✅</div>';
            echo '<div class="message">';
            echo '<h3>Connection Successful!</h3>';
            echo '<p>Database terhubung dengan sukses</p>';
            echo '</div>';
            echo '</div>';

            // Database Info
            echo '<div class="info-box">';
            echo '<h3 style="margin-bottom: 15px; color: #333;">📊 Database Information</h3>';

            echo '<div class="info-row">';
            echo '<span class="info-label">Host:</span>';
            echo '<span class="info-value">' . DB_HOST . '</span>';
            echo '</div>';

            echo '<div class="info-row">';
            echo '<span class="info-label">Database:</span>';
            echo '<span class="info-value">' . DB_NAME . '</span>';
            echo '</div>';

            echo '<div class="info-row">';
            echo '<span class="info-label">User:</span>';
            echo '<span class="info-value">' . DB_USER . '</span>';
            echo '</div>';

            echo '<div class="info-row">';
            echo '<span class="info-label">MySQL Version:</span>';
            echo '<span class="info-value">' . $db->conn->server_info . '</span>';
            echo '</div>';

            echo '<div class="info-row">';
            echo '<span class="info-label">Character Set:</span>';
            echo '<span class="info-value">' . $db->conn->character_set_name() . '</span>';
            echo '</div>';

            echo '</div>';

            // Tables Info
            $tables = $db->fetchAll("SHOW TABLES");
            if ($tables) {
                echo '<div class="info-box">';
                echo '<h3 style="margin-bottom: 15px; color: #333;">📋 Database Tables (' . count($tables) . ')</h3>';
                echo '<table>';
                echo '<thead><tr><th>No</th><th>Table Name</th><th>Rows</th><th>Status</th></tr></thead>';
                echo '<tbody>';

                $no = 1;
                foreach ($tables as $table) {
                    $tableName = array_values($table)[0];
                    $count = $db->fetchOne("SELECT COUNT(*) as total FROM `$tableName`");

                    echo '<tr>';
                    echo '<td>' . $no++ . '</td>';
                    echo '<td><strong>' . $tableName . '</strong></td>';
                    echo '<td>' . $count['total'] . ' rows</td>';
                    echo '<td><span class="badge badge-success">✓ Active</span></td>';
                    echo '</tr>';
                }

                echo '</tbody>';
                echo '</table>';
                echo '</div>';
            }

            // Test Queries
            echo '<div class="info-box">';
            echo '<h3 style="margin-bottom: 15px; color: #333;">🧪 Test Queries</h3>';

            // Count users
            $userCount = $db->fetchOne("SELECT COUNT(*) as total FROM users");
            echo '<div class="info-row">';
            echo '<span class="info-label">Total Users:</span>';
            echo '<span class="info-value"><span class="badge badge-info">' . $userCount['total'] . '</span></span>';
            echo '</div>';

            // Count admin
            $adminCount = $db->fetchOne("SELECT COUNT(*) as total FROM users WHERE role = 'admin'");
            echo '<div class="info-row">';
            echo '<span class="info-label">Total Admin:</span>';
            echo '<span class="info-value"><span class="badge badge-info">' . $adminCount['total'] . '</span></span>';
            echo '</div>';

            // Count menu items
            $menuTypes = ['sekretariat', 'tatalaksana', 'danarta', 'pangripta', 'jagabaya', 'uluulu', 'kamituwa', 'ppid'];
            $totalMenuItems = 0;
            foreach ($menuTypes as $type) {
                $count = $db->fetchOne("SELECT COUNT(*) as total FROM menu_$type");
                $totalMenuItems += $count['total'];
            }

            echo '<div class="info-row">';
            echo '<span class="info-label">Total Menu Items:</span>';
            echo '<span class="info-value"><span class="badge badge-info">' . $totalMenuItems . '</span></span>';
            echo '</div>';

            echo '</div>';

        } else {
            echo '<div class="status-box error">';
            echo '<div class="icon">❌</div>';
            echo '<div class="message">';
            echo '<h3>Connection Failed!</h3>';
            echo '<p>Error: ' . $db->error . '</p>';
            echo '</div>';
            echo '</div>';

            echo '<div class="info-box">';
            echo '<h3 style="margin-bottom: 15px; color: #dc3545;">🔧 Troubleshooting</h3>';
            echo '<ol style="padding-left: 20px;">';
            echo '<li style="margin-bottom: 10px;">Pastikan MySQL service sudah running</li>';
            echo '<li style="margin-bottom: 10px;">Cek kredensial di <code>php/config/database.php</code></li>';
            echo '<li style="margin-bottom: 10px;">Pastikan database <code>wukirsari_db</code> sudah dibuat</li>';
            echo '<li style="margin-bottom: 10px;">Import file <code>database/wukirsari.sql</code> ke phpMyAdmin</li>';
            echo '</ol>';
            echo '</div>';
        }
        ?>

        <div class="btn-container">
            <a href="../../index.html" class="btn">🏠 Back to Home</a>
            <button onclick="location.reload()" class="btn" style="margin-left: 10px;">🔄 Refresh</button>
        </div>
    </div>
</body>

</html>