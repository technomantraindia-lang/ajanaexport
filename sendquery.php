<?php
/**
 * Ajana Impex - Inquiry Form Handler
 * Uses PHPMailer to send emails via SMTP
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require PHPMailer files
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data safely
    $name         = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
    $company      = isset($_POST["company"]) ? strip_tags(trim($_POST["company"])) : 'N/A';
    $phone        = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
    $email        = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $subject_type = isset($_POST["subject"]) ? strip_tags(trim($_POST["subject"])) : (isset($_POST["product_type"]) ? strip_tags(trim($_POST["product_type"])) : 'N/A');
    $message      = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : '';

    // Check required fields (phone is optional in HTML UI)
    if (empty($name) || empty($email)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Check valid email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Please enter a valid email address.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // --- SMTP SETTINGS ---
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;

        // SMTP login email
        $mail->Username   = 'support@ajanaimpex.com';

        // SMTP password / app password
        // Replace this with the actual password or app password for support@ajanaimpex.com
        $mail->Password   = 'YOUR_EMAIL_APP_PASSWORD';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // --- EMAIL CONTENT ---
        $mail->setFrom('support@ajanaimpex.com', 'Ajana Impex Website');

        // Recipient email where inquiries will be received
        $mail->addAddress('support@ajanaimpex.com');

        // User email for reply
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = "New Inquiry from " . $name . " - " . ucfirst($subject_type);
        
        $email_body = "
            <div style='font-family: sans-serif; line-height: 1.6; color: #333;'>
                <h2 style='color: #c10000;'>New Website Inquiry</h2>
                <hr>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Company:</strong> {$company}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Phone:</strong> {$phone}</p>
                <p><strong>Inquiry Subject:</strong> {$subject_type}</p>
                <p><strong>Message:</strong><br>{$message}</p>
                <hr>
                <p style='font-size: 0.8rem; color: #888;'>
                    This email was sent from the Ajana Impex website contact form.
                </p>
            </div>
        ";

        $mail->Body = $email_body;

        $mail->send();
        
        // Redirect on success
        header("Location: contact.html?status=success");
        exit;

    } catch (Exception $e) {
        // Fallback to PHP native mail() function in case SMTP fails
        $to = 'support@ajanaimpex.com';
        $subject = "New Inquiry from " . $name . " - " . ucfirst($subject_type);
        
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: Ajana Impex Website <noreply@ajanaimpex.com>\r\n";
        $headers .= "Reply-To: {$name} <{$email}>\r\n";
        
        $email_body = "
            <div style='font-family: sans-serif; line-height: 1.6; color: #333;'>
                <h2 style='color: #c10000;'>New Website Inquiry</h2>
                <hr>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Company:</strong> {$company}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Phone:</strong> {$phone}</p>
                <p><strong>Inquiry Subject:</strong> {$subject_type}</p>
                <p><strong>Message:</strong><br>{$message}</p>
                <hr>
                <p style='font-size: 0.8rem; color: #888;'>
                    This email was sent from the Ajana Impex website contact form using PHP mail fallback.
                </p>
            </div>
        ";
        
        if (mail($to, $subject, $email_body, $headers)) {
            header("Location: contact.html?status=success");
            exit;
        } else {
            header("Location: contact.html?status=error");
            exit;
        }
    }

} else {
    // Not a POST request
    header("Location: contact.html");
    exit;
}
?>
