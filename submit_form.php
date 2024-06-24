<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera os dados do formulário
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Verifica se os campos foram preenchidos corretamente
    if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Email de destino
        $to = "nuno.correia.kor@gmail.com";

        // Assunto do email
        $subject = "Nova mensagem de contato de $name";

        // Corpo do email
        $email_content = "Nome: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Mensagem:\n$message\n";

        // Cabeçalhos adicionais
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";

        // Envia o email
        if (mail($to, $subject, $email_content, $headers)) {
            echo "<p>Obrigado por sua mensagem! Entraremos em contato em breve.</p>";
        } else {
            echo "<p>Ocorreu um problema no envio da mensagem. Por favor, tente novamente mais tarde.</p>";
        }
    } else {
        echo "<p>Preencha todos os campos corretamente antes de enviar.</p>";
    }
}
?>
