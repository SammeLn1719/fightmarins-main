<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Подключаем PHPMailer
require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Проверяем наличие файла
    $file = isset($_FILES['photo']) ? $_FILES['photo'] : null;

    try {
        // Настраиваем PHPMailer
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Замените на ваш SMTP-сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'your_email@example.com'; // Ваш email
        $mail->Password = 'your_password'; // Ваш пароль
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Настройки отправителя и получателя
        $mail->setFrom('your_email@example.com', 'Ваше Имя');
        $mail->addAddress('recipient@example.com', 'Получатель'); // Email получателя

        // Тема письма
        $mail->Subject = 'Новое сообщение с формы обратной связи';

        // Текст письма
        $mail->Body = "Имя: $name\nТелефон: $phone\nСообщение:\n$message";

        // Если файл загружен, добавляем его в письмо
        if ($file && $file['error'] === UPLOAD_ERR_OK) {
            $mail->addAttachment($file['tmp_name'], $file['name']);
        }

        // Отправка письма
        $mail->send();
        echo 'Сообщение успешно отправлено!';
    } catch (Exception $e) {
        echo "Ошибка при отправке сообщения: {$mail->ErrorInfo}";
    }
} else {
    echo 'Неверный метод отправки.';
}