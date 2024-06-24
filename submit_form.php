<?php
// Verifica se os dados foram enviados via método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Aqui você pode processar os dados como desejar, por exemplo, enviar por e-mail, salvar em banco de dados, etc.
    
    // Exemplo de envio de e-mail de confirmação (requer configuração de servidor de e-mail)
    $to = "nuno.correia.kor@gmail.com"; // Troque pelo seu endereço de e-mail
    $subject = "Nova mensagem de contato de RONIN PT";
    $body = "Nome: $name\n";
    $body .= "Email: $email\n";
    $body .= "Mensagem:\n$message";
    
    // Para enviar e-mails com PHP, você precisa configurar um servidor de e-mail local ou usar um serviço de terceiros como SMTP
    // Exemplo básico de envio de e-mail usando a função mail() do PHP
    mail($to, $subject, $body);
    
    // Resposta para o usuário
    echo "Obrigado por entrar em contato. Responderemos em breve!";
} else {
    // Se alguém tentar acessar este arquivo diretamente sem dados POST, redireciona para a página inicial ou trata de outra forma
    header("Location: index.html");
    exit();
}
?>
