<?php
/*
Plugin Name: Kisisel Gun
Description: İsim, soyisim ve doğum tarihi bilgilerini alarak kişisel gün hesaplaması yapar ve sonuç olarak bir fotoğraf gösterir. Admin panelinde indirme sayacını gösterir.
Version: 1.2
Author: Büşra
*/

class KisiselGunPlugin {
    private $download_count_option = 'indirme_sayaci_count';

    public function __construct() {
        add_shortcode('kisisel_gun_form', array($this, 'render_form'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_ajax_calculate_personal_day', array($this, 'calculate_personal_day'));
        add_action('wp_ajax_nopriv_calculate_personal_day', array($this, 'calculate_personal_day'));
        add_action('admin_menu', array($this, 'create_admin_menu'));
        add_action('admin_init', array($this, 'track_download'));
    }

    public function enqueue_scripts() {
        wp_enqueue_script('kisisel-gun-script', plugin_dir_url(__FILE__) . 'kisisel-gun.js', array('jquery'), '1.0', true);
        wp_localize_script('kisisel-gun-script', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')));
        wp_enqueue_style('kisisel-gun-style', plugin_dir_url(__FILE__) . 'kisisel-gun.css');
    }

    public function render_form() {
        ob_start();
        ?>
       <div class="kisisel-gun-container">
    <form id="kisisel-gun-form" class="kisisel-gun-form" method="post">
        <label for="first_name">İsim:</label>
        <input type="text" id="first_name" name="first_name" required>
        <br>
        <label for="last_name">Soyisim:</label>
        <input type="text" id="last_name" name="last_name" required>
        <br>
        <label for="birthdate">Doğum Tarihi:</label>
        <input type="date" id="birthdate" name="birthdate" required min="1900-01-01" max="2099-12-31">
        <br>
        <input type="submit" value="Hesapla">
    </form>
    <div id="kisisel-gun-result" class="kisisel-gun-result"></div>
</div>
        <?php
        return ob_get_clean();
    }

    public function calculate_personal_day() {
        if (isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['birthdate'])) {
            $birthdate = sanitize_text_field($_POST['birthdate']);
            $personal_day = $this->get_personal_day($birthdate);
    
            // Doğru resim URL'sini belirleyin
            $image_url = plugins_url('images/' . $personal_day . '.jpg', __FILE__);
    
            // Konsola log ekleyerek doğru değerlerin geldiğini kontrol edin
            error_log('Calculated Personal Day: ' . $personal_day);
            error_log('Image URL: ' . $image_url);
    
            // Yanıtı döndür
            wp_send_json_success(array('personal_day' => $personal_day, 'image_url' => $image_url));
        } else {
            wp_send_json_error(array('message' => 'Geçersiz veri.'));
        }
    }
    
    private function get_personal_day($birthdate) {
        $birthdate = new DateTime($birthdate);
        $current_date = new DateTime();
    
        // Doğum günü ve ayı alın
        $day = (int)$birthdate->format('d');
        $month = (int)$birthdate->format('m');
    
        // Mevcut tarih (gün, ay, yıl) alın
        $current_day = (int)$current_date->format('d');
        $current_month = (int)$current_date->format('m');
        $current_year = (int)$current_date->format('Y');
    
        // Kişisel gün hesaplaması (gün + ay + mevcut gün + mevcut ay + mevcut yıl)
        $personal_day = $day + $month + $current_day + $current_month + $current_year;
    
        // Tek haneli sayıya indirgeme
        while ($personal_day > 9) {
            $personal_day = array_sum(str_split($personal_day));
        }
    
        return $personal_day;
    }

    public function create_admin_menu() {
        add_menu_page(
            'Indirme Sayacı',
            'Indirme Sayacı',
            'manage_options',
            'indirme-sayaci',
            array($this, 'admin_page_content'),
            'dashicons-download',
            6
        );
    }

    public function admin_page_content() {
        $count = get_option($this->download_count_option, 0);
        echo '<div class="wrap">';
        echo '<h1>Indirme Sayacı</h1>';
        echo '<p>Toplam indirme sayısı: ' . $count . '</p>';
        echo '</div>';
    }

    public function track_download() {
        if (isset($_GET['track_download'])) {
            $count = get_option($this->download_count_option, 0);
            $count++;
            update_option($this->download_count_option, $count);
            wp_safe_redirect(remove_query_arg('track_download'));
            exit;
        }
    }
}

new KisiselGunPlugin();